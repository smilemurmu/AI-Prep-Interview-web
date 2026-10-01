export default function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
}) {
  return (
    <article className="card p-5">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
        <Icon size={21} />
      </div>

      <p className="text-sm text-slate-500">{title}</p>

      <h3 className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400">
          {subtitle}
        </p>
      )}
    </article>
  );
}
