import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../services/api";

/* ------------------------------------------------------------------ */
/*  Editable fields per role. Email, username, password, and role are */
/*  intentionally NOT listed here — they're shown read-only below,    */
/*  and the backend ignores them even if sent.                        */
/* ------------------------------------------------------------------ */

const ROLE_FIELDS = {
  PATIENT: [
    { name: "date_of_birth", label: "Date of birth", type: "date" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["", "MALE", "FEMALE", "OTHER"],
    },
    { name: "address", label: "Address", type: "textarea" },
    {
      name: "medical_history",
      label: "Medical history",
      type: "textarea",
    },
  ],
  DOCTOR: [
    { name: "specialization", label: "Specialization", type: "text" },
    { name: "qualification", label: "Qualification", type: "text" },
    {
      name: "experience_years",
      label: "Years of experience",
      type: "number",
      min: 0,
    },
    {
      name: "consultation_fee",
      label: "Consultation fee",
      type: "number",
      min: 0,
    },
  ],
  PHARMACY: [
    { name: "pharmacy_name", label: "Pharmacy name", type: "text" },
    { name: "address", label: "Address", type: "textarea" },
  ],
};

export default function EditProfile() {
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/api/account/me/");
      setMe(data);
      setForm({
        phone_number: data.phone_number || "",
        ...(data.profile || {}),
      });
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load your profile."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      // form only ever contains editable fields — email/username/role
      // are never part of this object, so there's nothing to strip.
      const { data } = await api.patch("/api/account/me/", form);
      setMe(data);
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to update your profile."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error || "Could not load your profile."}
        </div>
      </div>
    );
  }

  const fields = ROLE_FIELDS[me.role] || [];

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Edit profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Update your details below. Your email, username, and role
          can&apos;t be changed here.
        </p>
      </div>

      {/* Locked identity fields — shown, not editable */}
      <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold text-slate-500">Username</p>
          <p className="mt-1 text-sm text-slate-700">{me.username}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500">Email</p>
          <p className="mt-1 text-sm text-slate-700">{me.email}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500">Role</p>
          <p className="mt-1 text-sm capitalize text-slate-700">
            {me.role.toLowerCase()}
          </p>
        </div>
        {me.profile?.license_number && (
          <div>
            <p className="text-xs font-semibold text-slate-500">
              License number
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {me.profile.license_number}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900">
            Phone number
          </label>
          <input
            type="tel"
            value={form.phone_number || ""}
            onChange={(e) => handleChange("phone_number", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-slate-900">
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                rows={3}
                value={form[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            ) : field.type === "select" ? (
              <select
                value={form[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt || "Select..."}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                min={field.min}
                value={form[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            )}
          </div>
        ))}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            Profile updated successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}