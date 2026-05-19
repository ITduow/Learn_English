import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import DailyVocabulary from "./pages/DailyVocabulary.jsx";
import Practice from "./pages/Practice.jsx";
import Quiz from "./pages/Quiz.jsx";
import Progress from "./pages/Progress.jsx";
import Review from "./pages/Review.jsx";
import Roadmap from "./pages/Roadmap.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-mist text-ink">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<DailyVocabulary />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/review" element={<Review />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
