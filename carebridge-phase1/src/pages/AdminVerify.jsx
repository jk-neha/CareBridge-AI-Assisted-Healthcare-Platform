import { useEffect, useState } from "react";
import api, { getErrorMessage, tokenStorage } from "../services/api";

/* ------------------------------------------------------------------ */
/*  EDIT THESE to match the admin account you created with            */
/*  `python manage.py createsuperuser`.                               */
/*                                                                     */
/*  This page is for YOUR use only while setting up demo data.         */
/*  Don't link to it from the public site, and remove or password-     */
/*  gate it before sharing the live link widely.                       */
/* ------------------------------------------------------------------ */
const ADMIN_USERNAME = "demoadmin";
const ADMIN_PASSWORD = "demoadmin";

export default function AdminVerify() {
  const [status, setStatus] = useState("logging-in"); // logging-in | ready | error
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [busyId, setBusyId] = useState(null);

  const loadPending = async () => {
    const [doctorsResult, pharmaciesResult] = await Promise.allSettled([
      api.get("/api/account/admin/doctors/pending/"),
      api.get("/api/account/admin/pharmacies/pending/"),
    ]);

    if (doctorsResult.status === "fulfilled") {
      setDoctors(doctorsResult.value.data);
    }
    if (pharmaciesResult.status === "fulfilled") {
      setPharmacies(pharmaciesResult.value.data);
    }
  };

  const login = async () => {
    setStatus("logging-in");
    setError("");

    try {
      const { data } = await api.post("/api/account/login/", {
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      });

      tokenStorage.setTokens(data.access, data.refresh);
      await loadPending();
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setError(
        getErrorMessage(
          err,
          "Admin login failed. Check ADMIN_USERNAME / ADMIN_PASSWORD in this file, or your token endpoint may expect 'email' instead of 'username'."
        )
      );
    }
  };

  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyDoctor = async (id) => {
    setBusyId(`doctor-${id}`);
    try {
      await api.patch(`/api/account/admin/doctors/${id}/verify/`);
      await loadPending();
    } catch (err) {
      setError(getErrorMessage(err, "Could not verify doctor."));
    } finally {
      setBusyId(null);
    }
  };

  const verifyPharmacy = async (id) => {
    setBusyId(`pharmacy-${id}`);
    try {
      await api.patch(`/api/account/admin/pharmacies/${id}/verify/`);
      await loadPending();
    } catch (err) {
      setError(getErrorMessage(err, "Could not verify pharmacy."));
    } finally {
      setBusyId(null);
    }
  };

  if (status === "logging-in") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Logging in as admin...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-lg px-6 py-16">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">{error}</p>
        </div>
        <button
          type="button"
          onClick={login}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Retry login
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Verify demo accounts
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Logged in as {ADMIN_USERNAME}. Approve pending doctors and
          pharmacies so they can log in.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section>
        <h2 className="text-lg font-bold text-slate-900">
          Pending doctors ({doctors.length})
        </h2>

        {doctors.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">None pending.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {doctor.name || doctor.user?.name || doctor.email}
                  </p>
                  <p className="text-sm text-slate-500">
                    {doctor.specialization}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => verifyDoctor(doctor.id)}
                  disabled={busyId === `doctor-${doctor.id}`}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                >
                  {busyId === `doctor-${doctor.id}` ? "Verifying..." : "Verify"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900">
          Pending pharmacies ({pharmacies.length})
        </h2>

        {pharmacies.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">None pending.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {pharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {pharmacy.pharmacy_name || pharmacy.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {pharmacy.address}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => verifyPharmacy(pharmacy.id)}
                  disabled={busyId === `pharmacy-${pharmacy.id}`}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                >
                  {busyId === `pharmacy-${pharmacy.id}`
                    ? "Verifying..."
                    : "Verify"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}