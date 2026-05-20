import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu.jsx";

const links = [
  { to: "/", label: "Trang chủ" },
  { to: "/daily", label: "Học mỗi ngày" },
  { to: "/practice", label: "Đặt câu" },
  { to: "/quiz", label: "Quiz" },
  { to: "/progress", label: "Tiến độ" },
  { to: "/review", label: "Ôn tập" },
  { to: "/roadmap", label: "Lộ trình" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-leaf text-lg font-black text-white">
            ID
          </span>
          <span>
            <span className="block text-base font-black text-ink">IELTS Daily Vocabulary</span>
            <span className="block text-xs font-medium text-slate-500">10 từ mỗi ngày</span>
          </span>
        </NavLink>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive ? "bg-skysoft text-leaf" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
