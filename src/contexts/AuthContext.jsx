import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig.js";
import { getAllProgressData } from "../utils/localStorage.js";
import { getUserProgress, normalizeProgress, saveUserProgress, syncLocalProgressToFirestore } from "../services/progressService.js";
import { upsertUserProfile } from "../services/userService.js";

const AuthContext = createContext(null);

function hasLocalProgress() {
  const progress = getAllProgressData();
  return Boolean(
    progress.learnedWords.length
    || progress.completedDays.length
    || progress.quizResults.length
    || Object.keys(progress.practiceSentences || {}).length
  );
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [progressData, setProgressData] = useState(normalizeProgress(getAllProgressData()));
  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSyncPrompt, setShowSyncPrompt] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setError("");
      setCurrentUser(user);

      if (!user) {
        setProgressData(normalizeProgress(getAllProgressData()));
        setShowSyncPrompt(false);
        setLoading(false);
        return;
      }

      try {
        await upsertUserProfile(user);
        const cloudProgress = await getUserProgress(user.uid);
        setProgressData(cloudProgress);
        setShowSyncPrompt(hasLocalProgress());
      } catch (authError) {
        setError(authError.message || "Không thể tải dữ liệu Firebase.");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function loginWithGoogle() {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (loginError) {
      setError(loginError.message || "Đăng nhập Google không thành công.");
      throw loginError;
    }
  }

  async function logout() {
    setError("");
    await signOut(auth);
  }

  async function saveCloudProgress(nextProgress) {
    if (!currentUser) return normalizeProgress(nextProgress);

    setProgressLoading(true);
    try {
      const normalized = normalizeProgress(nextProgress);
      setProgressData(normalized);
      await saveUserProgress(currentUser.uid, normalized);
      return normalized;
    } catch (saveError) {
      setError(saveError.message || "Không thể lưu tiến độ lên Firestore.");
      throw saveError;
    } finally {
      setProgressLoading(false);
    }
  }

  async function syncLocalProgress() {
    if (!currentUser) return;
    setProgressLoading(true);
    try {
      const merged = await syncLocalProgressToFirestore(currentUser.uid);
      setProgressData(merged);
      setShowSyncPrompt(false);
    } catch (syncError) {
      setError(syncError.message || "Không thể đồng bộ tiến độ.");
    } finally {
      setProgressLoading(false);
    }
  }

  const value = useMemo(() => ({
    currentUser,
    loading,
    progressLoading,
    error,
    progressData,
    isAuthenticated: Boolean(currentUser),
    showSyncPrompt,
    loginWithGoogle,
    logout,
    saveCloudProgress,
    setProgressData,
    syncLocalProgress,
    dismissSyncPrompt: () => setShowSyncPrompt(false),
  }), [currentUser, loading, progressLoading, error, progressData, showSyncPrompt]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
