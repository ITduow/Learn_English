export default function PracticeInput({ item, value, onChange }) {
  return (
    <article className="panel p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-black text-ink">{item.word}</h3>
          <p className="text-sm text-slate-500">{item.meaning_vi}</p>
        </div>
        <span className="rounded-full bg-skysoft px-3 py-1 text-xs font-bold text-leaf">{item.level}</span>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(item.id, event.target.value)}
        rows={3}
        placeholder={`Ví dụ: I use "${item.word}" in my daily life.`}
        className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-emerald-100"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="btn-secondary" disabled>
          Sửa câu bằng AI - Coming soon
        </button>
      </div>
    </article>
  );
}
