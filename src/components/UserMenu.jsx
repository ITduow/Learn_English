import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function UserMenu() {
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-500">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-leaf" />
        Đang tải
      </div>
    );
  }

  if (!currentUser) {
    return <Link className="btn-primary whitespace-nowrap" to="/login">Đăng nhập</Link>;
  }

  return (
    <div className="flex items-center gap-2">
      <Link className="btn-secondary whitespace-nowrap" to="/progress">Progress</Link>
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1.5">
        {currentUser.photoURL ? (
          <img className="h-8 w-8 rounded-full" src={currentUser.photoURL} alt={currentUser.displayName || "User"} />
        ) : (
          <span className="grid h-8 w-8 place-items-center rounded-full bg-leaf text-xs font-black text-white">
            {(currentUser.displayName || "U").slice(0, 1)}
          </span>
        )}
        <span className="hidden max-w-32 truncate text-sm font-bold text-slate-700 sm:block">
          {currentUser.displayName || currentUser.email}
        </span>
      </div>
      <button className="btn-secondary whitespace-nowrap" onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}
