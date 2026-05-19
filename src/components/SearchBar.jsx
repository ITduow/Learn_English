export default function SearchBar({ value, onChange, placeholder = "Tìm từ vựng..." }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">Tìm kiếm</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}
