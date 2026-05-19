import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DaySelector from "../components/DaySelector.jsx";
import QuizCard from "../components/QuizCard.jsx";
import { saveQuizResult } from "../utils/localStorage.js";
import { getWordsByDay, TOTAL_DAYS } from "../utils/vocabularyHelpers.js";

export default function Quiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentDay, setCurrentDay] = useState(Number(searchParams.get("day")) || 1);
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);
  const quizItems = useMemo(() => getWordsByDay(currentDay).slice(0, 10), [currentDay]);
  const score = quizItems.filter((item) => answers[item.id] === item.quiz.correct_answer).length;
  const completed = Object.keys(answers).length === quizItems.length;

  function changeDay(day) {
    setCurrentDay(day);
    setAnswers({});
    setSaved(false);
    setSearchParams({ day: String(day) });
  }

  function handleFinish() {
    saveQuizResult(currentDay, score, quizItems.length);
    setSaved(true);
  }

  return (
    <div className="page-shell">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold text-leaf">Quiz</p>
          <h1 className="text-3xl font-black">Kiểm tra nhanh Day {currentDay}</h1>
          <p className="mt-2 text-slate-600">Chọn nghĩa đúng. Kết quả hiện ngay sau mỗi câu.</p>
        </div>
        <div className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-soft">
          Điểm: {score}/{quizItems.length}
        </div>
      </div>
      <div className="panel mb-6 p-4">
        <DaySelector currentDay={currentDay} totalDays={TOTAL_DAYS} onChange={changeDay} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {quizItems.map((item) => (
          <QuizCard
            key={item.id}
            item={item}
            selectedAnswer={answers[item.id]}
            onAnswer={(answer) => setAnswers((current) => ({ ...current, [item.id]: answer }))}
          />
        ))}
      </div>
      <div className="mt-6 panel p-5">
        <h2 className="text-xl font-black">Kết quả</h2>
        <p className="mt-2 text-slate-600">Hoàn thành đủ câu để lưu điểm quiz vào tiến độ.</p>
        <button className="btn-primary mt-4" disabled={!completed} onClick={handleFinish}>
          {saved ? "Đã lưu kết quả" : "Lưu kết quả quiz"}
        </button>
      </div>
    </div>
  );
}
