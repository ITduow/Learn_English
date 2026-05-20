import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";
import { getAllProgressData } from "../utils/localStorage.js";
import { applyStudyDate } from "../utils/progressCalculations.js";

const progressPath = (uid) => doc(db, "users", uid, "progress", "main");

export const defaultProgress = {
  completedDays: [],
  learnedWords: [],
  quizResults: [],
  practiceSentences: {},
  lastStudyDate: "",
  streak: 0,
  totalWordsLearned: 0,
};

function uniqueNumbers(values = []) {
  return [...new Set(values.map(Number).filter(Number.isFinite))].sort((a, b) => a - b);
}

function flattenPracticeSentences(nested = {}) {
  const flat = {};
  Object.values(nested || {}).forEach((daySentences) => {
    Object.entries(daySentences || {}).forEach(([wordKey, sentence]) => {
      const wordId = wordKey.replace("wordId_", "");
      flat[wordId] = typeof sentence === "string" ? sentence : sentence?.text || "";
    });
  });
  return flat;
}

function nestPracticeSentences(flat = {}) {
  return Object.entries(flat || {}).reduce((days, [wordId, sentence]) => {
    if (!sentence) return days;
    const dayKey = `day_${Math.ceil(Number(wordId) / 10)}`;
    const wordKey = `wordId_${wordId}`;
    return {
      ...days,
      [dayKey]: {
        ...(days[dayKey] || {}),
        [wordKey]: sentence,
      },
    };
  }, {});
}

export function normalizeProgress(progress = defaultProgress) {
  const practiceSentences = progress.practiceSentences || {};
  const looksNested = Object.keys(practiceSentences).some((key) => key.startsWith("day_"));
  const flatPractice = looksNested ? flattenPracticeSentences(practiceSentences) : practiceSentences;

  return {
    ...defaultProgress,
    ...progress,
    completedDays: uniqueNumbers(progress.completedDays),
    learnedWords: uniqueNumbers(progress.learnedWords),
    quizResults: progress.quizResults || [],
    practiceSentences: flatPractice,
    totalWordsLearned: uniqueNumbers(progress.learnedWords).length,
  };
}

function toFirestoreProgress(progress) {
  const normalized = normalizeProgress(progress);
  return {
    completedDays: normalized.completedDays,
    learnedWords: normalized.learnedWords,
    quizResults: normalized.quizResults,
    practiceSentences: nestPracticeSentences(normalized.practiceSentences),
    lastStudyDate: normalized.lastStudyDate,
    streak: normalized.streak,
    totalWordsLearned: normalized.learnedWords.length,
    updatedAt: serverTimestamp(),
  };
}

export async function getUserProgress(uid) {
  const ref = progressPath(uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    await setDoc(ref, { ...toFirestoreProgress(defaultProgress), createdAt: serverTimestamp() });
    return normalizeProgress(defaultProgress);
  }

  return normalizeProgress(snapshot.data());
}

export async function saveUserProgress(uid, progressData) {
  const payload = toFirestoreProgress(progressData);
  await setDoc(progressPath(uid), payload, { merge: true });
  return normalizeProgress(progressData);
}

export async function markDayCompleted(uid, dayNumber, wordIds) {
  const progress = await getUserProgress(uid);
  const completedDays = uniqueNumbers([...progress.completedDays, dayNumber]);
  const learnedWords = uniqueNumbers([...progress.learnedWords, ...wordIds]);
  return saveUserProgress(uid, applyStudyDate({ ...progress, completedDays, learnedWords, totalWordsLearned: learnedWords.length }));
}

export async function saveQuizResult(uid, result) {
  const progress = await getUserProgress(uid);
  const completedAt = result.completedAt || new Date().toISOString();
  const nextResult = { ...result, completedAt, percent: result.total ? Math.round((result.score / result.total) * 100) : 0 };
  const quizResults = [
    ...progress.quizResults.filter((item) => item.dayNumber !== result.dayNumber),
    nextResult,
  ];
  return saveUserProgress(uid, applyStudyDate({ ...progress, quizResults }));
}

export async function savePracticeSentence(uid, dayNumber, wordId, sentence) {
  const progress = await getUserProgress(uid);
  const practiceSentences = {
    ...progress.practiceSentences,
    [wordId]: sentence,
  };
  return saveUserProgress(uid, applyStudyDate({ ...progress, practiceSentences }));
}

function mergeQuizResults(localResults = [], remoteResults = []) {
  const byDay = new Map();
  [...remoteResults, ...localResults].forEach((result) => {
    const existing = byDay.get(result.dayNumber);
    if (!existing || (result.percent || 0) >= (existing.percent || 0)) {
      byDay.set(result.dayNumber, result);
    }
  });
  return [...byDay.values()].sort((a, b) => a.dayNumber - b.dayNumber);
}

export function mergeProgress(localProgress, remoteProgress) {
  const local = normalizeProgress(localProgress);
  const remote = normalizeProgress(remoteProgress);

  return normalizeProgress({
    completedDays: uniqueNumbers([...remote.completedDays, ...local.completedDays]),
    learnedWords: uniqueNumbers([...remote.learnedWords, ...local.learnedWords]),
    quizResults: mergeQuizResults(local.quizResults, remote.quizResults),
    practiceSentences: { ...local.practiceSentences, ...remote.practiceSentences },
    lastStudyDate: remote.lastStudyDate || local.lastStudyDate,
    streak: Math.max(remote.streak || 0, local.streak || 0),
  });
}

export async function syncLocalProgressToFirestore(uid) {
  const localProgress = getAllProgressData();
  const remoteProgress = await getUserProgress(uid);
  const merged = mergeProgress(localProgress, remoteProgress);
  await saveUserProgress(uid, merged);
  return merged;
}
