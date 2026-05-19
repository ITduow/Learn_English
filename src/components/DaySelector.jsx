export default function DaySelector({ currentDay, totalDays, onChange }) {
  const days = Array.from({ length: totalDays }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="flex-1">
        <span className="mb-2 block text-sm font-semibold text-slate-600">Chọn ngày học</span>
        <select
          value={currentDay}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-leaf focus:ring-2 focus:ring-emerald-100"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              Day {day}
            </option>
          ))}
        </select>
      </label>
      <div className="flex gap-2">
        <button className="btn-secondary" onClick={() => onChange(Math.max(1, currentDay - 1))}>
          Previous Day
        </button>
        <button className="btn-secondary" onClick={() => onChange(Math.min(totalDays, currentDay + 1))}>
          Next Day
        </button>
      </div>
    </div>
  );
}
