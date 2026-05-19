import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar.jsx";
import { TOTAL_DAYS, TOTAL_WORDS, TOPICS } from "../data/vocabulary/meta.js";
import { getAllProgressData } from "../utils/localStorage.js";

export default function Home() {
  const progressData = getAllProgressData();
  const learnedWordsCount = progressData.learnedWords.length;
  const today = Math.min(TOTAL_DAYS, progressData.completedDays.length ? Math.max(...progressData.completedDays) + 1 : 1);
  const progressPercent = Math.round((learnedWordsCount / TOTAL_WORDS) * 100);
  const stats = [
    { label: "Ngày học", value: TOTAL_DAYS },
    { label: "Từ vựng", value: TOTAL_WORDS },
    { label: "Topic", value: TOPICS.length },
  ];

  return (
    <div className="page-shell">
      <section className="grid gap-6 py-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-skysoft px-3 py-1 text-sm font-bold text-leaf">
            Beginner đến khoảng IELTS 6.5
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl">
            IELTS Daily Vocabulary
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-semibold text-slate-700">
            Học 10 từ IELTS mỗi ngày từ beginner đến 6.5
          </p>
          <p className="mt-4 max-w-2xl text-slate-600">
            Mỗi từ có nghĩa tiếng Việt, cách đọc dễ hiểu, collocation, ví dụ song ngữ, luyện đặt câu và quiz nhanh để bạn học đều mà không bị quá tải.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn-primary" to={`/daily?day=${today}`}>Bắt đầu học hôm nay</Link>
            <Link className="btn-secondary" to="/roadmap">Xem lộ trình</Link>
            <Link className="btn-secondary" to={`/quiz?day=${today}`}>Làm quiz</Link>
          </div>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-black">Dashboard nhanh</h2>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-slate-50 p-4 text-center">
                <p className="text-2xl font-black text-leaf">{stat.value}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ProgressBar value={progressPercent} label="Tiến độ học từ" />
          </div>
          <div className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
            Ngày gợi ý: <strong>Day {today}</strong>. Học xong 10 từ, hãy đặt câu và làm quiz ngay khi còn nhớ.
          </div>
        </div>
      </section>
    </div>
  );
}
