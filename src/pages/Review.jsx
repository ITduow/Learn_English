import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import LevelBadge from "../components/LevelBadge.jsx";
import TopicBadge from "../components/TopicBadge.jsx";
import { getLevels, getTopics, searchAndFilterWords, TOTAL_DAYS } from "../utils/vocabularyHelpers.js";

export default function Review() {
  const [query, setQuery] = useState("");
  const [day, setDay] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const words = useMemo(() => searchAndFilterWords({ query, day, topic, level }), [query, day, topic, level]);

  return (
    <div className="page-shell">
      <div className="mb-6">
        <p className="text-sm font-bold text-leaf">Review</p>
        <h1 className="text-3xl font-black">Ôn lại từ vựng</h1>
        <p className="mt-2 text-slate-600">Tìm kiếm theo từ, nghĩa, collocation, hoặc lọc theo ngày, topic, level.</p>
      </div>
      <div className="panel mb-6 grid gap-4 p-4 lg:grid-cols-4">
        <SearchBar value={query} onChange={setQuery} />
        <Filter label="Day" value={day} onChange={setDay} options={Array.from({ length: TOTAL_DAYS }, (_, index) => ({ label: `Day ${index + 1}`, value: String(index + 1) }))} />
        <Filter label="Topic" value={topic} onChange={setTopic} options={getTopics().map((item) => ({ label: item, value: item }))} />
        <Filter label="Level" value={level} onChange={setLevel} options={getLevels().map((item) => ({ label: item, value: item }))} />
      </div>
      <div className="mb-3 text-sm font-bold text-slate-500">{words.length} từ phù hợp</div>
      <div className="grid gap-3">
        {words.map((item) => (
          <article key={item.id} className="panel p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-black">{item.word}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.meaning_vi} - {item.collocation}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">Day {item.day_number}</span>
                <LevelBadge level={item.level} />
                <TopicBadge topic={item.topic} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Filter({ label, value, onChange, options }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-emerald-100"
      >
        <option value="">Tất cả</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
