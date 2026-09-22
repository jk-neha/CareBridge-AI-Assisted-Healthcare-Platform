import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api, { getErrorMessage } from "../../services/api";

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get(
          "/api/account/patient/dashboard/"
        );

        setDashboard(response.data);
      } catch (err) {
        setError(
          getErrorMessage(
            err,
            "Unable to load your dashboard."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-slate-500">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const { patient, summary, appointments, medicine_orders, medical_records } =
    dashboard;

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Hi Welcome, {patient.username} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's your healthcare overview.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          title="Appointments"
          value={summary.total_appointments}
          description={`${summary.pending_appointments} pending`}
        />

        <SummaryCard
          title="Confirmed"
          value={summary.confirmed_appointments}
          description="Appointments"
        />

        <SummaryCard
          title="Medicine Orders"
          value={summary.total_medicine_orders}
          description={`${summary.confirmed_medicine_orders} confirmed`}
        />

        <SummaryCard
          title="Medical Records"
          value={summary.total_medical_records}
          description="Records available"
        />

      </div>

      {/* Quick actions */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <QuickAction
            title="Find a Doctor"
            description="Browse verified doctors"
            onClick={() => navigate("/patient/doctors")}
          />

          <QuickAction
            title="AI Symptom Checker"
            description="Get a preliminary recommendation"
            onClick={() => navigate("/patient/symptom-checker")}
          />

          <QuickAction
            title="My Appointments"
            description="View your appointments"
            onClick={() => navigate("/patient/appointments")}
          />

          <QuickAction
            title="Medical Records"
            description="View your medical history"
            onClick={() => navigate("/patient/medical-records")}
          />

        </div>
      </section>

      {/* Appointments */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Appointments
          </h2>

          <button
            onClick={() => navigate("/patient/appointments")}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all →
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

          {appointments.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No appointments yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {appointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>
                    <p className="font-semibold text-slate-900">
                      Dr. {appointment.doctor_name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.appointment_date} ·{" "}
                      {appointment.appointment_time}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.reason}
                    </p>
                  </div>

                  <StatusBadge status={appointment.status} />

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Medicine orders */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Medicine Orders
          </h2>

          <button
            onClick={() => navigate("/patient/orders")}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all →
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

          {medicine_orders.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No medicine orders yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {medicine_orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>
                    <p className="font-semibold text-slate-900">
                      {order.medicine_name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {order.pharmacy_name} · Quantity:{" "}
                      {order.quantity}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      ₹{order.total_price}
                    </p>
                  </div>

                  <StatusBadge status={order.status} />

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Medical records */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Medical Records
          </h2>

          <button
            onClick={() => navigate("/patient/medical-records")}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all →
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

          {medical_records.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No medical records available.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {medical_records.map((record) => (
                <div
                  key={record.id}
                  className="p-5"
                >
                  <p className="font-semibold text-slate-900">
                    {record.diagnosis}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    Prescription: {record.prescription}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {record.notes}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}


/* ---------------- Summary Card ---------------- */

function SummaryCard({ title, value, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}


/* ---------------- Quick Action ---------------- */

function QuickAction({ title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <p className="font-semibold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>

      <p className="mt-4 text-sm font-semibold text-blue-600">
        Open →
      </p>
    </button>
  );
}


/* ---------------- Status Badge ---------------- */

function StatusBadge({ status }) {
  const styles = {
    CONFIRMED: "bg-green-100 text-green-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    REJECTED: "bg-red-100 text-red-700",
    CANCELLED: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}