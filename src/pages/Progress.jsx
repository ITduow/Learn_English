import ProgressBar from "../components/ProgressBar.jsx";
import { getAllProgressData } from "../utils/localStorage.js";
import { getProgressSummary } from "../utils/vocabularyHelpers.js";

export default function Progress() {
  const summary = getProgressSummary();
  const data = getAllProgressData();

  const cards = [
    { label: "Số ngày đã học", value: summary.completedDaysCount },
    { label: "Tổng số từ đã học", value: summary.learnedWordsCount },
    { label: "Điểm quiz trung bình", value: `${summary.averageQuiz}%` },
    { label: "Streak học liên tiếp", value: `${summary.streak} ngày` },
  ];

  return (
    <div className="page-shell">
      <div className="mb-6">
        <p className="text-sm font-bold text-leaf">Progress</p>
        <h1 className="text-3xl font-black">Tiến độ học của bạn</h1>
        <p className="mt-2 text-slate-600">Dữ liệu được lưu trong localStorage trên trình duyệt này.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="panel p-5">
            <p className="text-sm font-bold text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-black text-leaf">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="panel mt-6 p-6">
        <ProgressBar value={summary.progressPercent} label={`Hoàn thành ${summary.learnedWordsCount}/${summary.totalWords} từ`} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="text-xl font-black">Ngày đã hoàn thành</h2>
          <p className="mt-3 text-slate-600">{data.completedDays.length ? data.completedDays.map((day) => `Day ${day}`).join(", ") : "Chưa có ngày nào hoàn thành đủ 10 từ."}</p>
        </section>
        <section className="panel p-5">
          <h2 className="text-xl font-black">Kết quả quiz gần đây</h2>
          <div className="mt-3 grid gap-2">
            {data.quizResults.length ? data.quizResults.map((result) => (
              <p key={result.dayNumber} className="rounded-lg bg-slate-50 p-3 text-sm font-semibold">
                Day {result.dayNumber}: {result.score}/{result.total} - {result.percent}%
              </p>
            )) : <p className="text-slate-600">Chưa có kết quả quiz.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
