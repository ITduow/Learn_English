import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function GoogleLoginButton({ className = "" }) {
  const { loginWithGoogle, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    setSubmitting(true);
    try {
      await loginWithGoogle();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-leaf hover:text-leaf disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      onClick={handleLogin}
      disabled={loading || submitting}
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-sm font-black text-blue-600 ring-1 ring-slate-200">
        G
      </span>
      {submitting ? "Đang đăng nhập..." : "Đăng nhập bằng Google"}
    </button>
  );
}
