import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading…", full = false, className = "" }) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-3 text-ink-muted ${
        full ? "min-h-[50vh]" : "py-12"
      } ${className}`}
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary-500" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
