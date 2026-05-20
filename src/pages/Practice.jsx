import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DaySelector from "../components/DaySelector.jsx";
import PracticeInput from "../components/PracticeInput.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getStoredValue, savePracticeSentence } from "../utils/localStorage.js";
import { applyStudyDate } from "../utils/progressCalculations.js";
import { getWordsByDay, TOTAL_DAYS } from "../utils/vocabularyHelpers.js";

export default function Practice() {
  const { isAuthenticated, progressData, saveCloudProgress, progressLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentDay, setCurrentDay] = useState(Number(searchParams.get("day")) || 1);
  const [localSentences, setLocalSentences] = useState(getStoredValue("practiceSentences") || {});
  const words = useMemo(() => getWordsByDay(currentDay), [currentDay]);
  const sourceSentences = isAuthenticated ? progressData.practiceSentences : localSentences;
  const [sentences, setSentences] = useState(sourceSentences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSentences(sourceSentences);
  }, [sourceSentences]);

  function changeDay(day) {
    setCurrentDay(day);
    setSaved(false);
    setSearchParams({ day: String(day) });
  }

  function handleChange(wordId, sentence) {
    setSaved(false);
    setSentences((current) => ({ ...current, [wordId]: sentence }));
  }

  async function handleSave() {
    if (isAuthenticated) {
      await saveCloudProgress(applyStudyDate({ ...progressData, practiceSentences: sentences }));
      setSaved(true);
      return;
    }

    Object.entries(sentences).forEach(([wordId, sentence]) => {
      if (sentence.trim()) savePracticeSentence(wordId, sentence);
    });
    setLocalSentences(sentences);
    setSaved(true);
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
      {!isAuthenticated && (
        <div className="mb-6 rounded-lg bg-skysoft p-4 text-sm font-semibold text-slate-700">
          Câu của bạn đang lưu tạm trên trình duyệt này. <Link className="text-leaf underline" to="/login">Đăng nhập để đồng bộ</Link>
        </div>
      )}
      <div className="panel mb-6 p-4">
        <DaySelector currentDay={currentDay} totalDays={TOTAL_DAYS} onChange={changeDay} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {words.map((item) => (
          <PracticeInput key={item.id} item={item} value={sentences[item.id] || ""} onChange={handleChange} />
        ))}
      </div>
      <div className="sticky bottom-4 mt-6 flex items-center justify-end gap-3">
        {saved && <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">Đã lưu câu</span>}
        <button className="btn-primary shadow-soft" onClick={handleSave} disabled={progressLoading}>
          {progressLoading ? "Đang lưu..." : "Lưu câu"}
        </button>
      </div>
    </div>
  );
}
