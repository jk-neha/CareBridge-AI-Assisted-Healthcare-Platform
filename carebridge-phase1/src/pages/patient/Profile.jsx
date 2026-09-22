import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/account/me/");

      setUser(response.data);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to load your profile."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          My Profile 👤
        </h1>

        <p className="mt-2 text-slate-500">
          View your CareBridge account information.
        </p>
      </div>

      {/* Profile Header */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              {user.username}
            </h2>

            <p className="mt-1 text-sm font-medium text-blue-600">
              Patient
            </p>

          </div>

        </div>

      </div>

      {/* Account Information */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-900">
          Account Information
        </h2>

        <div className="mt-6 space-y-5">

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Username
            </p>

            <p className="mt-1 text-base text-slate-900">
              {user.username || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Email
            </p>

            <p className="mt-1 text-base text-slate-900">
              {user.email || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Phone Number
            </p>

            <p className="mt-1 text-base text-slate-900">
              {user.phone_number || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Role
            </p>

            <p className="mt-1 text-base text-slate-900">
              {user.role || "PATIENT"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}