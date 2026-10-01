export default function QuestionCard({
  question,
  number,
  answer,
  onChange,
}) {
  return (
    <article className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
          Question {number}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {question.difficulty}
        </span>
      </div>

      <h2 className="text-xl font-bold leading-relaxed text-slate-900">
        {question.text}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        {question.category} • {question.role}
      </p>

      <textarea
        value={answer}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write your answer here..."
        className="mt-6 min-h-52 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100"
      />
    </article>
  );
}
