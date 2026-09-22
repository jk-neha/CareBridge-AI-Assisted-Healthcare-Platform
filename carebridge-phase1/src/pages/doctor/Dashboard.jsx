import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/account/doctor/dashboard/"
      );

      setDashboard(response.data);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to load doctor dashboard."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Doctor Dashboard
        </h1>

        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  const doctor = dashboard.doctor;
  const summary = dashboard.summary;

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "CANCELLED":
        return "bg-slate-100 text-slate-600";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Doctor Dashboard 🩺
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back, Dr. {doctor.username}
        </p>
      </div>

      {/* DOCTOR PROFILE CARD */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">

          {/* AVATAR */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
            {doctor.username
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900">
                Dr. {doctor.username}
              </h2>

              {doctor.is_verified && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  ✓ Verified
                </span>
              )}
            </div>

            <p className="mt-1 text-slate-500">
              {doctor.specialization}
            </p>
          </div>
        </div>

        {/* DOCTOR INFORMATION */}
        <div className="mt-6">

          <h3 className="text-lg font-semibold text-slate-900">
            Doctor Information
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Username
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {doctor.username}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Email
              </p>

              <p className="mt-1 break-all font-semibold text-slate-900">
                {doctor.email}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Phone
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {doctor.phone_number}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Specialization
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {doctor.specialization}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Qualification
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {doctor.qualification}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                License Number
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {doctor.license_number}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Experience
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {doctor.experience_years} years
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Consultation Fee
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                ₹{doctor.consultation_fee}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Verification
              </p>

              <p
                className={`mt-1 font-semibold ${
                  doctor.is_verified
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {doctor.is_verified
                  ? "Verified"
                  : "Not Verified"}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Appointment Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of your appointments and medical records.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {/* TOTAL */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Appointments
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {summary.total_appointments}
            </p>
          </div>

          {/* PENDING */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {summary.pending_appointments}
            </p>
          </div>

          {/* CONFIRMED */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Confirmed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {summary.confirmed_appointments}
            </p>
          </div>

          {/* REJECTED */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Rejected
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {summary.rejected_appointments}
            </p>
          </div>

          {/* RECORDS */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Medical Records
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {summary.total_medical_records}
            </p>
          </div>

        </div>
      </section>

      {/* RECENT APPOINTMENTS */}
      <section>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Appointments 📅
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest patient appointments.
          </p>
        </div>

        {dashboard.appointments.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-4xl">📅</div>

            <h3 className="mt-3 font-semibold text-slate-900">
              No appointments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your patient appointments will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {dashboard.appointments.map(
              (appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex flex-col justify-between gap-5 md:flex-row">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">
                          Appointment #{appointment.id}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                          {appointment.patient_name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {appointment.patient_name}
                          </p>

                          <p className="text-sm text-slate-500">
                            {appointment.patient_email}
                          </p>
                        </div>

                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">

                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">
                            Date
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            📅 {appointment.appointment_date}
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">
                            Time
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            🕐 {appointment.appointment_time}
                          </p>
                        </div>

                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-medium text-slate-500">
                          Reason
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-900">
                          📝 {appointment.reason || "N/A"}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}
      </section>

      {/* MEDICAL RECORDS */}
      <section>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Medical Records 🩺
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recently created patient medical records.
          </p>
        </div>

        {dashboard.medical_records.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-4xl">📋</div>

            <h3 className="mt-3 font-semibold text-slate-900">
              No medical records found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Medical records will appear here after you create them.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {dashboard.medical_records.map(
              (record) => (
                <div
                  key={record.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Record #{record.id}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Patient: {record.patient_name}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      Medical Record
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">

                    <div className="rounded-lg bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Diagnosis
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {record.diagnosis || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Prescription
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {record.prescription || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Notes
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {record.notes || "N/A"}
                      </p>
                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}
      </section>

    </div>
  );
}