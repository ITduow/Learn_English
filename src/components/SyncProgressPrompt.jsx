import { useAuth } from "../contexts/AuthContext.jsx";

export default function SyncProgressPrompt() {
  const { showSyncPrompt, syncLocalProgress, dismissSyncPrompt, progressLoading } = useAuth();

  if (!showSyncPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-soft">
        <h2 className="text-xl font-black text-ink">Đồng bộ tiến độ học?</h2>
        <p className="mt-3 text-slate-600">
          Bạn có tiến độ học trên thiết bị này. Bạn có muốn đồng bộ lên tài khoản Google không?
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button className="btn-secondary" onClick={dismissSyncPrompt} disabled={progressLoading}>
            Bỏ qua
          </button>
          <button className="btn-primary" onClick={syncLocalProgress} disabled={progressLoading}>
            {progressLoading ? "Đang đồng bộ..." : "Đồng bộ ngay"}
          </button>
        </div>
      </div>
    </div>
  );
}
