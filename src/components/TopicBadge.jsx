export default function TopicBadge({ topic }) {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
      {topic}
    </span>
  );
}
