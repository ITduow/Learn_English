import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DaySelector from "../components/DaySelector.jsx";
import VocabularyCard from "../components/VocabularyCard.jsx";
import { getStoredValue, markWordLearned } from "../utils/localStorage.js";
import { getWordsByDay, TOTAL_DAYS } from "../utils/vocabularyHelpers.js";

export default function DailyVocabulary() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDay = Number(searchParams.get("day")) || 1;
  const [currentDay, setCurrentDay] = useState(initialDay);
  const [learnedWords, setLearnedWords] = useState(getStoredValue("learnedWords") || []);
  const words = useMemo(() => getWordsByDay(currentDay), [currentDay]);

  function changeDay(day) {
    setCurrentDay(day);
    setSearchParams({ day: String(day) });
  }

  function handleMarkLearned(item) {
    const next = markWordLearned(item);
    setLearnedWords(next.learnedWords);
  }

  return (
    <div className="page-shell">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold text-leaf">Daily Vocabulary</p>
          <h1 className="text-3xl font-black">Day {currentDay}: 10 từ hôm nay</h1>
          <p className="mt-2 text-slate-600">Đọc từ, nghe phát âm, viết lại và đánh dấu khi bạn đã học.</p>
        </div>
      </div>
      <div className="panel mb-6 p-4">
        <DaySelector currentDay={currentDay} totalDays={TOTAL_DAYS} onChange={changeDay} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {words.map((item) => (
          <VocabularyCard
            key={item.id}
            item={item}
            learned={learnedWords.includes(item.id)}
            onMarkLearned={handleMarkLearned}
          />
        ))}
      </div>
    </div>
  );
}
