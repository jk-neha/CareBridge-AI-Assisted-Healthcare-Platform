import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Award,
  BadgeCheck,
  Briefcase,
  Clock,
  GraduationCap,
  Hash,
  IndianRupee,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Stethoscope,
  User,
} from "lucide-react";
import api, { getErrorMessage } from "../../services/api";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-0.5 break-words text-base text-slate-900">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

const formatFee = (fee) => {
  if (fee === null || fee === undefined || fee === "") return "";

  const amount = Number(fee);
  if (Number.isNaN(amount)) return String(fee);

  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatExperience = (years) => {
  if (years === null || years === undefined || years === "") return "";

  const value = Number(years);
  return `${value} ${value === 1 ? "year" : "years"}`;
};

export default function Profile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // The doctor dashboard endpoint already returns the signed-in doctor's
  // full profile in its `doctor` object, so no new API is needed.
  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/account/doctor/dashboard/");

      setDoctor(response.data?.doctor || null);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load your profile."));
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

  if (error || !doctor) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{error || "Your profile is not available right now."}</p>
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

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

        <p className="mt-2 text-slate-500">
          Your professional details as shown on CareBridge.
        </p>
      </div>

      {/* Identity card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
              {doctor.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {doctor.username}
              </h2>

              <p className="mt-1 text-sm font-medium text-blue-600">
                {doctor.specialization || "Doctor"}
              </p>

              {doctor.qualification && (
                <p className="mt-1 text-sm text-slate-500">
                  {doctor.qualification}
                </p>
              )}
            </div>
          </div>

          {doctor.is_verified ? (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Verified
            </span>
          ) : (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Pending verification
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Professional information */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Professional Information
          </h2>

          <div className="mt-6 space-y-5">
            <InfoRow
              icon={Stethoscope}
              label="Specialization"
              value={doctor.specialization}
            />
            <InfoRow
              icon={GraduationCap}
              label="Qualification"
              value={doctor.qualification}
            />
            <InfoRow
              icon={Briefcase}
              label="Experience"
              value={formatExperience(doctor.experience_years)}
            />
            <InfoRow
              icon={IndianRupee}
              label="Consultation Fee"
              value={formatFee(doctor.consultation_fee)}
            />
            <InfoRow
              icon={Award}
              label="License Number"
              value={doctor.license_number}
            />
          </div>
        </div>

        {/* Account / contact */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Contact &amp; Account
          </h2>

          <div className="mt-6 space-y-5">
            <InfoRow icon={User} label="Username" value={doctor.username} />
            <InfoRow icon={Mail} label="Email" value={doctor.email} />
            <InfoRow icon={Phone} label="Phone Number" value={doctor.phone_number} />
            <InfoRow icon={Hash} label="Role" value={doctor.role} />
          </div>
        </div>
      </div>
    </div>
  );
}
