export function applyStudyDate(progress) {
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);

  if (progress.lastStudyDate === todayKey) return progress;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);
  const streak = progress.lastStudyDate === yesterdayKey ? (progress.streak || 0) + 1 : 1;

  return { ...progress, lastStudyDate: todayKey, streak };
}

export function getProgressSummaryFromData(progress, totalWords) {
  const quizResults = progress.quizResults || [];
  const totalScore = quizResults.reduce((sum, result) => sum + (result.percent || 0), 0);
  const averageQuiz = quizResults.length ? Math.round(totalScore / quizResults.length) : 0;
  const learnedWordsCount = (progress.learnedWords || []).length;

  return {
    learnedWordsCount,
    completedDaysCount: (progress.completedDays || []).length,
    averageQuiz,
    streak: progress.streak || 0,
    progressPercent: totalWords ? Math.round((learnedWordsCount / totalWords) * 100) : 0,
  };
}
