const levelStyles = {
  A1: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  A2: "bg-sky-50 text-sky-700 ring-sky-200",
  B1: "bg-amber-50 text-amber-700 ring-amber-200",
  B2: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function LevelBadge({ level }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${levelStyles[level] || levelStyles.A1}`}>
      {level}
    </span>
  );
}
