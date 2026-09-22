export default function EmptyState({
  icon: Icon,
  title = "Nothing here yet",
  message,
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-line-strong px-6 py-12 text-center ${className}`}
    >
      {Icon && (
        <div className="rounded-full bg-canvas-subtle p-3">
          <Icon className="h-5 w-5 text-ink-muted" aria-hidden="true" />
        </div>
      )}
      <div>
        <p className="font-medium text-ink">{title}</p>
        {message && <p className="mt-1 max-w-sm text-sm text-ink-muted">{message}</p>}
      </div>
      {action}
    </div>
  );
}
