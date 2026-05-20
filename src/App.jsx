import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SyncProgressPrompt from "./components/SyncProgressPrompt.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const DailyVocabulary = lazy(() => import("./pages/DailyVocabulary.jsx"));
const Practice = lazy(() => import("./pages/Practice.jsx"));
const Quiz = lazy(() => import("./pages/Quiz.jsx"));
const Progress = lazy(() => import("./pages/Progress.jsx"));
const Review = lazy(() => import("./pages/Review.jsx"));
const Roadmap = lazy(() => import("./pages/Roadmap.jsx"));

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-mist text-ink">
      <Navbar />
      <SyncProgressPrompt />
      <main className="flex-1">
        <Suspense fallback={<div className="page-shell text-sm font-semibold text-slate-600">Đang tải trang học...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/daily" element={<DailyVocabulary />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/review" element={<Review />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
