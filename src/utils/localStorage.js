const DEFAULTS = {
  learnedWords: [],
  completedDays: [],
  quizResults: [],
  practiceSentences: {},
  lastStudyDate: "",
  streak: 0,
};

export function getStoredValue(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : DEFAULTS[key];
  } catch {
    return DEFAULTS[key];
  }
}

export function setStoredValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getAllProgressData() {
  return {
    learnedWords: getStoredValue("learnedWords") || [],
    completedDays: getStoredValue("completedDays") || [],
    quizResults: getStoredValue("quizResults") || [],
    practiceSentences: getStoredValue("practiceSentences") || {},
    lastStudyDate: getStoredValue("lastStudyDate") || "",
    streak: getStoredValue("streak") || 0,
  };
}

export function markWordLearned(item) {
  const learnedWords = getStoredValue("learnedWords") || [];
  const completedDays = getStoredValue("completedDays") || [];
  const nextWords = learnedWords.includes(item.id) ? learnedWords : [...learnedWords, item.id];
  const wordsInDay = nextWords.filter((id) => Math.ceil(id / 10) === item.day_number).length;
  const nextDays = wordsInDay >= 10 && !completedDays.includes(item.day_number)
    ? [...completedDays, item.day_number].sort((a, b) => a - b)
    : completedDays;

  setStoredValue("learnedWords", nextWords);
  setStoredValue("completedDays", nextDays);
  updateStudyStreak();
  return { learnedWords: nextWords, completedDays: nextDays };
}

export function savePracticeSentence(wordId, sentence) {
  const practiceSentences = getStoredValue("practiceSentences") || {};
  const nextSentences = { ...practiceSentences, [wordId]: sentence };
  setStoredValue("practiceSentences", nextSentences);
  updateStudyStreak();
  return nextSentences;
}

export function saveQuizResult(dayNumber, score, total) {
  const quizResults = getStoredValue("quizResults") || [];
  const result = {
    dayNumber,
    score,
    total,
    percent: total ? Math.round((score / total) * 100) : 0,
    date: new Date().toISOString(),
  };
  const nextResults = [...quizResults.filter((item) => item.dayNumber !== dayNumber), result];
  setStoredValue("quizResults", nextResults);
  updateStudyStreak();
  return nextResults;
}

export function updateStudyStreak() {
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const lastStudyDate = getStoredValue("lastStudyDate") || "";
  const currentStreak = getStoredValue("streak") || 0;

  if (lastStudyDate === todayKey) return currentStreak;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);
  const nextStreak = lastStudyDate === yesterdayKey ? currentStreak + 1 : 1;

  setStoredValue("lastStudyDate", todayKey);
  setStoredValue("streak", nextStreak);
  return nextStreak;
}
