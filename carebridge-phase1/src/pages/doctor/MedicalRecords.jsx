import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function MedicalRecords() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadAppointments = async () => {
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
    loadAppointments();
  }, []);

  const selectAppointment = (appointment) => {
    setSelectedAppointment(appointment);

    setDiagnosis("");
    setSymptoms("");
    setPrescription("");
    setNotes("");

    setError("");
    setSuccess("");
  };

  const handleCreateRecord = async (event) => {
    event.preventDefault();

    if (!selectedAppointment) {
      setError("Please select an appointment.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        "/api/account/medical-records/create/",
        {
          appointment: selectedAppointment.id,
          diagnosis: diagnosis.trim(),
          symptoms: symptoms.trim(),
          prescription: prescription.trim(),
          notes: notes.trim(),
        }
      );

      setSuccess(
        response.data.message ||
          "Medical record created successfully."
      );

      setSelectedAppointment(null);

      setDiagnosis("");
      setSymptoms("");
      setPrescription("");
      setNotes("");

      await loadAppointments();
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to create medical record."
        )
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading medical records...
        </p>
      </div>
    );
  }

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "COMPLETED"
    );

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Medical Records 🩺
        </h1>

        <p className="mt-2 text-slate-500">
          Create medical records for your completed
          patient appointments.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* SUCCESS */}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* ================================================= */}
      {/* APPOINTMENT LIST */}
      {/* ================================================= */}

      {!selectedAppointment && (
        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Completed Appointments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select an appointment to create
                its medical record.
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              {completedAppointments.length}
            </span>

          </div>

          {/* NO COMPLETED APPOINTMENTS */}

          {completedAppointments.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

              <div className="text-4xl">
                📋
              </div>

              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                No completed appointments
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Medical records can only be created
                for completed appointments.
              </p>

            </div>
          )}

          {/* APPOINTMENTS */}

          <div className="space-y-4">

            {completedAppointments.map(
              (appointment) => (

                <div
                  key={appointment.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >

                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

                    {/* LEFT */}

                    <div className="flex-1">

                      <div className="flex items-center gap-3">

                        <h2 className="text-xl font-bold text-slate-900">
                          Appointment #{appointment.id}
                        </h2>

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          COMPLETED
                        </span>

                      </div>

                      {/* PATIENT */}

                      <div className="mt-5 flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
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

                      {/* DETAILS */}

                      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">

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
                          📝 {appointment.reason}
                        </p>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="flex items-end md:items-start">

                      <button
                        type="button"
                        onClick={() =>
                          selectAppointment(
                            appointment
                          )
                        }
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 md:w-auto"
                      >
                        Create Medical Record →
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* CREATE MEDICAL RECORD FORM */}
      {/* ================================================= */}

      {selectedAppointment && (

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          {/* BACK */}

          <button
            type="button"
            onClick={() => {
              setSelectedAppointment(null);
              setError("");
              setSuccess("");
            }}
            className="mb-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to completed appointments
          </button>

          {/* FORM HEADER */}

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-start">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Create Medical Record
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add clinical information for this
                completed appointment.
              </p>

            </div>

            <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              ✓ Completed
            </span>

          </div>

          {/* PATIENT SUMMARY */}

          <div className="mt-6 rounded-xl bg-slate-50 p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                  {selectedAppointment.patient_name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    {selectedAppointment.patient_name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {selectedAppointment.patient_email}
                  </p>

                </div>

              </div>

              <div className="text-left sm:text-right">

                <p className="text-xs text-slate-500">
                  Appointment
                </p>

                <p className="font-semibold text-slate-900">
                  #{selectedAppointment.id}
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleCreateRecord}
            className="mt-6 space-y-5"
          >

            {/* DIAGNOSIS */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Diagnosis
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <input
                type="text"
                value={diagnosis}
                onChange={(event) =>
                  setDiagnosis(event.target.value)
                }
                placeholder="Enter diagnosis"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* SYMPTOMS */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Symptoms
              </label>

              <textarea
                value={symptoms}
                onChange={(event) =>
                  setSymptoms(event.target.value)
                }
                placeholder="Describe the patient's symptoms..."
                rows={5}
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* PRESCRIPTION */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Prescription
              </label>

              <textarea
                value={prescription}
                onChange={(event) =>
                  setPrescription(
                    event.target.value
                  )
                }
                placeholder="Enter prescription details..."
                rows={5}
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* NOTES */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Doctor's Notes
              </label>

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Add additional notes or observations..."
                rows={5}
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* ACTIONS */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setSelectedAppointment(null)
                }
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : "Save Medical Record"}
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  );
}