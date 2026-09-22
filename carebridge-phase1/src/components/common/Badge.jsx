const TONES = {
  neutral: "bg-canvas-subtle text-ink-soft border-line-strong",
  primary: "bg-primary-50 text-primary-700 border-primary-100",
  info: "bg-accent-50 text-accent-700 border-accent-100",
  warning: "bg-warning-50 text-warning-600 border-warning-100",
  danger: "bg-danger-50 text-danger-600 border-danger-100",
};

// Maps common CareBridge status strings to a sensible visual tone.
const STATUS_TONE = {
  PENDING: "warning",
  ACCEPTED: "primary",
  CONFIRMED: "primary",
  REJECTED: "danger",
  CANCELLED: "danger",
  COMPLETED: "info",
  LOW: "primary",
  MEDIUM: "warning",
  HIGH: "danger",
};

export default function Badge({ children, tone, status, className = "" }) {
  const resolvedTone = tone || STATUS_TONE[status] || "neutral";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${TONES[resolvedTone]} ${className}`}
    >
      {children ?? status}
    </span>
  );
}
