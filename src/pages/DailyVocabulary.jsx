import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DaySelector from "../components/DaySelector.jsx";
import VocabularyCard from "../components/VocabularyCard.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getStoredValue, markWordLearned } from "../utils/localStorage.js";
import { applyStudyDate } from "../utils/progressCalculations.js";
import { getWordsByDay, TOTAL_DAYS } from "../utils/vocabularyHelpers.js";

export default function DailyVocabulary() {
  const { isAuthenticated, progressData, saveCloudProgress, progressLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDay = Number(searchParams.get("day")) || 1;
  const [currentDay, setCurrentDay] = useState(initialDay);
  const [localLearnedWords, setLocalLearnedWords] = useState(getStoredValue("learnedWords") || []);
  const words = useMemo(() => getWordsByDay(currentDay), [currentDay]);
  const learnedWords = isAuthenticated ? progressData.learnedWords : localLearnedWords;
  const dayCompleted = words.length > 0 && words.every((item) => learnedWords.includes(item.id));

  function changeDay(day) {
    setCurrentDay(day);
    setSearchParams({ day: String(day) });
  }

  async function handleMarkLearned(item) {
    if (!isAuthenticated) {
      const next = markWordLearned(item);
      setLocalLearnedWords(next.learnedWords);
      return;
    }

    const nextLearnedWords = [...new Set([...progressData.learnedWords, item.id])].sort((a, b) => a - b);
    const completedDay = words.every((word) => nextLearnedWords.includes(word.id));
    const nextCompletedDays = completedDay
      ? [...new Set([...progressData.completedDays, currentDay])].sort((a, b) => a - b)
      : progressData.completedDays;

    await saveCloudProgress(applyStudyDate({
      ...progressData,
      learnedWords: nextLearnedWords,
      completedDays: nextCompletedDays,
      totalWordsLearned: nextLearnedWords.length,
    }));
  }

  return (
    <div className="page-shell">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold text-leaf">Daily Vocabulary</p>
          <h1 className="text-3xl font-black">Day {currentDay}: 10 từ hôm nay</h1>
          <p className="mt-2 text-slate-600">Đọc từ, nghe phát âm, viết lại và đánh dấu khi bạn đã học.</p>
        </div>
        <div className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-soft">
          {dayCompleted ? "Ngày này đã hoàn thành" : `${words.filter((word) => learnedWords.includes(word.id)).length}/10 từ đã học`}
        </div>
      </div>
      {!isAuthenticated && (
        <div className="mb-6 rounded-lg bg-skysoft p-4 text-sm font-semibold text-slate-700">
          Đăng nhập để lưu tiến độ trên nhiều thiết bị. <Link className="text-leaf underline" to="/login">Đăng nhập ngay</Link>
        </div>
      )}
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
      {progressLoading && <p className="mt-4 text-sm font-semibold text-slate-500">Đang lưu tiến độ lên Firestore...</p>}
    </div>
  );
}
