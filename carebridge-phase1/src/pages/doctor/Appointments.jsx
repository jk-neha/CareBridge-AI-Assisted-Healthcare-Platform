import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/account/doctor/appointments/"
      );

      setAppointments(response.data);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to load appointments."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (appointmentId, newStatus) => {
    try {
      setActionLoading(appointmentId);
      setError("");

      await api.patch(
        `/api/account/appointments/${appointmentId}/status/`,
        {
          status: newStatus,
        }
      );

      await fetchAppointments();
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to update appointment."
        )
      );
    } finally {
      setActionLoading(null);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      setActionLoading(appointmentId);
      setError("");

      await api.patch(
        `/api/account/appointments/${appointmentId}/complete/`
      );

      await fetchAppointments();
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to complete appointment."
        )
      );
    } finally {
      setActionLoading(null);
    }
  };

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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Appointments 📅
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your patient appointments and update their status.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {appointments.length === 0 && !error && (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">📅</div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No appointments found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Patient appointments will appear here.
          </p>
        </div>
      )}

      {/* APPOINTMENTS */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col justify-between gap-6 md:flex-row">

              {/* LEFT SIDE */}
              <div className="flex-1">

                {/* APPOINTMENT HEADER */}
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-900">
                    Appointment #{appointment.id}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                {/* PATIENT */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
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

                {/* DATE + TIME */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">

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

                {/* REASON */}
                <div className="mt-4">
                  <p className="text-xs font-medium text-slate-500">
                    Reason for visit
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    📝 {appointment.reason || "N/A"}
                  </p>
                </div>

              </div>

              {/* RIGHT SIDE - ACTIONS */}
              <div className="flex flex-col justify-start gap-3 md:w-48">

                {/* PENDING */}
                {appointment.status === "PENDING" && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "CONFIRMED"
                        )
                      }
                      disabled={
                        actionLoading === appointment.id
                      }
                      className="rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {actionLoading === appointment.id
                        ? "Updating..."
                        : "✓ Accept"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "REJECTED"
                        )
                      }
                      disabled={
                        actionLoading === appointment.id
                      }
                      className="rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {actionLoading === appointment.id
                        ? "Updating..."
                        : "✕ Reject"}
                    </button>
                  </>
                )}

                {/* CONFIRMED */}
                {appointment.status === "CONFIRMED" && (
                  <button
                    type="button"
                    onClick={() =>
                      completeAppointment(
                        appointment.id
                      )
                    }
                    disabled={
                      actionLoading === appointment.id
                    }
                    className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {actionLoading === appointment.id
                      ? "Completing..."
                      : "✓ Mark as Complete"}
                  </button>
                )}

                {/* COMPLETED */}
                {appointment.status === "COMPLETED" && (
                  <div className="rounded-lg bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-700">
                    ✓ Appointment Completed
                  </div>
                )}

                {/* REJECTED */}
                {appointment.status === "REJECTED" && (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
                    Appointment Rejected
                  </div>
                )}

                {/* CANCELLED */}
                {appointment.status === "CANCELLED" && (
                  <div className="rounded-lg bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-600">
                    Appointment Cancelled
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}