import vocabulary from "../data/vocabulary.js";
import { getAllProgressData } from "./localStorage.js";

export const TOTAL_DAYS = 30;
export const WORDS_PER_DAY = 10;

export function getWordsByDay(dayNumber) {
  return vocabulary.filter((item) => item.day_number === Number(dayNumber));
}

export function getWordsByTopic(topic) {
  return topic ? vocabulary.filter((item) => item.topic === topic) : vocabulary;
}

export function getWordsByLevel(level) {
  return level ? vocabulary.filter((item) => item.level === level) : vocabulary;
}

export function getTopics() {
  return [...new Set(vocabulary.map((item) => item.topic))];
}

export function getLevels() {
  return ["A1", "A2", "B1", "B2"];
}

export function getCurrentRecommendedDay() {
  const { completedDays } = getAllProgressData();
  const nextDay = completedDays.length ? Math.max(...completedDays) + 1 : 1;
  return Math.min(TOTAL_DAYS, nextDay);
}

export function getProgressSummary() {
  const { learnedWords, completedDays, quizResults, streak } = getAllProgressData();
  const totalScore = quizResults.reduce((sum, result) => sum + result.percent, 0);
  const averageQuiz = quizResults.length ? Math.round(totalScore / quizResults.length) : 0;

  return {
    learnedWordsCount: learnedWords.length,
    completedDaysCount: completedDays.length,
    averageQuiz,
    streak,
    totalWords: vocabulary.length,
    totalDays: TOTAL_DAYS,
    progressPercent: Math.round((learnedWords.length / vocabulary.length) * 100),
  };
}

export function searchAndFilterWords({ query = "", day = "", topic = "", level = "" }) {
  const normalizedQuery = query.trim().toLowerCase();
  return vocabulary.filter((item) => {
    const matchesQuery = !normalizedQuery
      || item.word.toLowerCase().includes(normalizedQuery)
      || item.meaning_vi.toLowerCase().includes(normalizedQuery)
      || item.collocation.toLowerCase().includes(normalizedQuery);
    const matchesDay = !day || item.day_number === Number(day);
    const matchesTopic = !topic || item.topic === topic;
    const matchesLevel = !level || item.level === level;
    return matchesQuery && matchesDay && matchesTopic && matchesLevel;
  });
}
