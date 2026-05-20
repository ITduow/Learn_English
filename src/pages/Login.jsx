import { Navigate, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const { currentUser, error, loading } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/progress" replace />;
  }

  return (
    <div className="page-shell">
      <section className="mx-auto max-w-2xl py-10">
        <div className="panel p-6 sm:p-8">
          <p className="text-sm font-bold text-leaf">Google Login</p>
          <h1 className="mt-2 text-3xl font-black text-ink">Đăng nhập để lưu tiến độ học</h1>
          <p className="mt-4 text-slate-600">
            Khi đăng nhập, tiến độ học, điểm quiz và câu tự đặt của bạn sẽ được lưu lại an toàn.
          </p>
          <div className="mt-6">
            <GoogleLoginButton />
          </div>
          {loading && (
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-leaf" />
              Đang kiểm tra trạng thái đăng nhập...
            </p>
          )}
          {error && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p>}
          <div className="mt-6 rounded-lg bg-skysoft p-4 text-sm text-slate-700">
            Bạn vẫn có thể học bằng localStorage nếu chưa đăng nhập. Đăng nhập giúp lưu tiến độ trên nhiều thiết bị.
          </div>
          <button className="btn-secondary mt-5" onClick={() => navigate("/")}>Quay về trang chủ</button>
        </div>
      </section>
    </div>
  );
}
