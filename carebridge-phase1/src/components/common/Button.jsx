import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 focus-visible:outline-primary-500 disabled:bg-primary-300",
  secondary:
    "bg-white text-ink border border-line-strong hover:bg-canvas-subtle disabled:text-ink-faint",
  ghost:
    "bg-transparent text-ink-soft hover:bg-canvas-subtle disabled:text-ink-faint",
  danger:
    "bg-danger-500 text-white hover:bg-danger-600 disabled:bg-danger-100 disabled:text-danger-500/60",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-5 py-3 gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  disabled = false,
  type = "button",
  fullWidth = false,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
