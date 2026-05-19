export default function ProgressBar({ value, label }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
        <span>{label}</span>
        <span>{Math.round(safeValue)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-leaf transition-all" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
