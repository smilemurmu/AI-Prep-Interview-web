export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="card flex min-h-72 flex-col items-center justify-center px-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
        <Icon size={25} />
      </div>

      <h2 className="mt-5 text-xl font-bold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
