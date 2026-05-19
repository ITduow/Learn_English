import LevelBadge from "./LevelBadge.jsx";
import TopicBadge from "./TopicBadge.jsx";

function speak(word) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.88;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function VocabularyCard({ item, learned, onMarkLearned }) {
  return (
    <article className="panel p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-black text-ink">{item.word}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">{item.pronunciation_vi}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <LevelBadge level={item.level} />
          <TopicBadge topic={item.topic} />
        </div>
      </div>
      <dl className="grid gap-3 text-sm">
        <div>
          <dt className="font-bold text-slate-500">Nghĩa tiếng Việt</dt>
          <dd className="mt-1 text-base font-semibold text-slate-800">{item.meaning_vi}</dd>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-bold text-slate-500">Loại từ</dt>
            <dd className="mt-1">{item.part_of_speech}</dd>
          </div>
          <div>
            <dt className="font-bold text-slate-500">Collocation</dt>
            <dd className="mt-1">{item.collocation}</dd>
          </div>
        </div>
        <div>
          <dt className="font-bold text-slate-500">Ví dụ</dt>
          <dd className="mt-1 rounded-lg bg-slate-50 p-3">
            <p className="font-semibold text-slate-800">{item.example_en}</p>
            <p className="mt-1 text-slate-600">{item.example_vi}</p>
          </dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={() => speak(item.word)}>
          Nghe phát âm
        </button>
        <button className={learned ? "btn-secondary" : "btn-primary"} onClick={() => onMarkLearned(item)}>
          {learned ? "Đã học" : "Đánh dấu đã học"}
        </button>
      </div>
    </article>
  );
}
