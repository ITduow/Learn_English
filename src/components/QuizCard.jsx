export default function QuizCard({ item, selectedAnswer, onAnswer }) {
  const isAnswered = Boolean(selectedAnswer);

  return (
    <article className="panel p-5">
      <p className="text-sm font-bold text-leaf">Day {item.day_number} - {item.word}</p>
      <h3 className="mt-2 text-lg font-black text-ink">{item.quiz.question}</h3>
      <div className="mt-4 grid gap-2">
        {item.quiz.options.map((option) => {
          const isCorrect = option === item.quiz.correct_answer;
          const isSelected = option === selectedAnswer;
          const style = !isAnswered
            ? "border-slate-200 hover:border-leaf"
            : isCorrect
              ? "border-emerald-500 bg-emerald-50 text-emerald-800"
              : isSelected
                ? "border-rose-400 bg-rose-50 text-rose-700"
                : "border-slate-200 bg-slate-50 text-slate-500";

          return (
            <button
              key={option}
              disabled={isAnswered}
              onClick={() => onAnswer(option)}
              className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <p className={`mt-3 text-sm font-bold ${selectedAnswer === item.quiz.correct_answer ? "text-emerald-700" : "text-rose-700"}`}>
          {selectedAnswer === item.quiz.correct_answer ? "Chính xác!" : `Chưa đúng. Đáp án: ${item.quiz.correct_answer}`}
        </p>
      )}
    </article>
  );
}
