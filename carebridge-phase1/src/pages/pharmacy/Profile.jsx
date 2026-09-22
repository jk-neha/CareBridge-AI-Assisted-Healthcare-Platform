import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Award,
  BadgeCheck,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Store,
  User,
} from "lucide-react";
import api, { getErrorMessage } from "../../services/api";
import { Link } from "react-router-dom";


function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-0.5 whitespace-pre-line break-words text-base text-slate-900">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default function Profile() {
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // The pharmacy dashboard endpoint already returns the signed-in pharmacy's
  // details in its `pharmacy` object, so no new API is needed.
  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/account/pharmacy/dashboard/");

      setPharmacy(response.data?.pharmacy || null);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load your pharmacy profile."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" aria-hidden="true" />
        <p className="text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  if (error || !pharmacy) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Pharmacy Profile</h1>

        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{error || "Your pharmacy profile is not available right now."}</p>
        </div>

        <button
          type="button"
          onClick={loadProfile}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    );
  }

  // These three fields exist on the PharmacyProfile model, but the current
  // pharmacy dashboard response does not include them yet. They are shown
  // only when the API actually sends them (nothing is invented).
  const hasLicense = Boolean(pharmacy.license_number);
  const hasAddress = Boolean(pharmacy.address);
  const hasVerification = typeof pharmacy.is_verified === "boolean";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Pharmacy Profile</h1>
        <Link
  to="edit"
  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
>
  Edit profile
</Link>
        <p className="mt-2 text-slate-500">
          Your pharmacy details as registered on CareBridge.
        </p>
      </div>

      {/* Identity card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Store className="h-9 w-9" aria-hidden="true" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {pharmacy.pharmacy_name || pharmacy.username}
              </h2>

              <p className="mt-1 text-sm font-medium text-blue-600">Pharmacy</p>
            </div>
          </div>

          {hasVerification &&
            (pharmacy.is_verified ? (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Verified
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Pending verification
              </span>
            ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pharmacy details */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Pharmacy Details
          </h2>

          <div className="mt-6 space-y-5">
            <InfoRow
              icon={Store}
              label="Pharmacy Name"
              value={pharmacy.pharmacy_name}
            />

            {hasLicense && (
              <InfoRow
                icon={Award}
                label="License Number"
                value={pharmacy.license_number}
              />
            )}

            {hasAddress && (
              <InfoRow icon={MapPin} label="Address" value={pharmacy.address} />
            )}
          </div>
        </div>

        {/* Contact / account */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Contact &amp; Account
          </h2>

          <div className="mt-6 space-y-5">
            <InfoRow icon={Mail} label="Email" value={pharmacy.email} />
            <InfoRow icon={Phone} label="Phone Number" value={pharmacy.phone_number} />
            <InfoRow icon={User} label="Username" value={pharmacy.username} />
          </div>
        </div>
      </div>
    </div>
  );
}
