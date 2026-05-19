import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DaySelector from "../components/DaySelector.jsx";
import PracticeInput from "../components/PracticeInput.jsx";
import { getStoredValue, savePracticeSentence } from "../utils/localStorage.js";
import { getWordsByDay, TOTAL_DAYS } from "../utils/vocabularyHelpers.js";

export default function Practice() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentDay, setCurrentDay] = useState(Number(searchParams.get("day")) || 1);
  const [sentences, setSentences] = useState(getStoredValue("practiceSentences") || {});
  const words = useMemo(() => getWordsByDay(currentDay), [currentDay]);

  function changeDay(day) {
    setCurrentDay(day);
    setSearchParams({ day: String(day) });
  }

  function handleChange(wordId, sentence) {
    setSentences((current) => ({ ...current, [wordId]: sentence }));
  }

  function handleSave() {
    Object.entries(sentences).forEach(([wordId, sentence]) => {
      if (sentence.trim()) savePracticeSentence(wordId, sentence);
    });
  }

  return (
    <div className="page-shell">
      <div className="mb-6">
        <p className="text-sm font-bold text-leaf">Practice</p>
        <h1 className="text-3xl font-black">Tự đặt câu với từ mới</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Hãy tự đặt 1 câu đơn giản với từ này. Không cần hoàn hảo, quan trọng là dùng được từ.
        </p>
      </div>
      <div className="panel mb-6 p-4">
        <DaySelector currentDay={currentDay} totalDays={TOTAL_DAYS} onChange={changeDay} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {words.map((item) => (
          <PracticeInput key={item.id} item={item} value={sentences[item.id] || ""} onChange={handleChange} />
        ))}
      </div>
      <div className="sticky bottom-4 mt-6 flex justify-end">
        <button className="btn-primary shadow-soft" onClick={handleSave}>Lưu câu</button>
      </div>
    </div>
  );
}
