import { Clock, CheckCircle2, XCircle, PackageCheck } from "lucide-react";
import Badge from "./Badge";

// Reuses the existing Badge component (its STATUS_TONE already maps
// PENDING → warning, CONFIRMED → primary, REJECTED → danger, COMPLETED → info)
// and only adds an icon + readable label for medicine order statuses.
const STATUS_META = {
  PENDING: { label: "Pending", icon: Clock },
  CONFIRMED: { label: "Confirmed", icon: CheckCircle2 },
  REJECTED: { label: "Rejected", icon: XCircle },
  COMPLETED: { label: "Completed", icon: PackageCheck },
};

export default function OrderStatusBadge({ status, className = "" }) {
  const meta = STATUS_META[status];
  const Icon = meta?.icon;

  return (
    <Badge status={status} className={className}>
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {meta?.label ?? status ?? "Unknown"}
    </Badge>
  );
}
