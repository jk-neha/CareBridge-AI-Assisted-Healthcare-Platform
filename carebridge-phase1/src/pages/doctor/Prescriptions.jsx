import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function DoctorPrescriptions() {
  const [records, setRecords] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [recordsResponse, medicinesResponse] = await Promise.all([
        api.get("/api/account/doctor/medical-records/"),
        api.get("/api/account/medicines/"),
      ]);

      setRecords(recordsResponse.data);
      setMedicines(medicinesResponse.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);

    setSelectedMedicine("");
    setDosage("");
    setFrequency("");
    setDuration("");

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRecord) {
      setError("Please select a medical record.");
      return;
    }

    if (
      !selectedMedicine ||
      !dosage.trim() ||
      !frequency.trim() ||
      !duration.trim()
    ) {
      setError("Please fill in all prescription fields.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        `/api/account/medical-records/${selectedRecord.id}/prescriptions/`,
        {
          medicine: selectedMedicine,
          dosage: dosage.trim(),
          frequency: frequency.trim(),
          duration: duration.trim(),
        }
      );

      setSuccess(
        `${response.data.medicine_name} added to the prescription successfully.`
      );

      // Fetch updated records so the newly added medicine
      // appears immediately in the Prescription Items section.
      const recordsResponse = await api.get(
        "/api/account/doctor/medical-records/"
      );

      const updatedRecords = recordsResponse.data;

      setRecords(updatedRecords);

      const updatedRecord = updatedRecords.find(
        (record) => record.id === selectedRecord.id
      );

      if (updatedRecord) {
        setSelectedRecord(updatedRecord);
      }

      // Clear form
      setSelectedMedicine("");
      setDosage("");
      setFrequency("");
      setDuration("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

            <p className="text-sm font-medium text-slate-600">
              Loading prescriptions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Doctor Portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Prescriptions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create and manage prescriptions for your patients.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-red-600">⚠️</div>

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Something went wrong
                </p>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-600">✓</div>

              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Prescription updated
                </p>

                <p className="mt-1 text-sm text-emerald-700">
                  {success}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-4">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Header */}
              <div className="border-b border-slate-200 px-5 py-4">
                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Medical Records
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Select a patient record
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {records.length}
                  </span>

                </div>
              </div>

              {/* Records */}
              <div className="max-h-[650px] overflow-y-auto">

                {records.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <div className="mb-3 text-3xl">📋</div>

                    <p className="text-sm font-medium text-slate-700">
                      No medical records
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Create a medical record first.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">

                    {records.map((record) => (
                      <button
                        key={record.id}
                        type="button"
                        onClick={() => handleSelectRecord(record)}
                        className={`w-full p-5 text-left transition ${
                          selectedRecord?.id === record.id
                            ? "bg-blue-50"
                            : "bg-white hover:bg-slate-50"
                        }`}
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div className="min-w-0">

                            <p className="truncate font-semibold text-slate-900">
                              {record.patient_name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Record #{record.id}
                            </p>

                          </div>

                          {selectedRecord?.id === record.id && (
                            <span className="shrink-0 rounded-full bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white">
                              Selected
                            </span>
                          )}

                        </div>

                        <div className="mt-3">

                          <p className="text-sm font-medium text-slate-700">
                            {record.diagnosis}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {record.appointment_date} ·{" "}
                            {record.appointment_time}
                          </p>

                        </div>

                        <div className="mt-3 flex items-center gap-2">

                          <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                            {record.prescription_items?.length || 0} medicines
                          </span>

                        </div>

                      </button>
                    ))}

                  </div>
                )}

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-8">

            {!selectedRecord ? (
              <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">

                <div className="max-w-sm px-6 text-center">

                  <div className="mb-4 text-5xl">
                    💊
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    Select a medical record
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Choose a patient record from the left to view the
                    prescription and add medicines.
                  </p>

                </div>

              </div>
            ) : (
              <div className="space-y-6">

                {/* Patient Information */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        Patient
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        {selectedRecord.patient_name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Medical Record #{selectedRecord.id}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 px-4 py-3">

                      <p className="text-xs text-slate-500">
                        Appointment
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {selectedRecord.appointment_date}
                      </p>

                      <p className="text-xs text-slate-500">
                        {selectedRecord.appointment_time}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Diagnosis */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="mb-4 flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                      🩺
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Medical Information
                      </h2>

                      <p className="text-xs text-slate-500">
                        Current diagnosis and prescription notes
                      </p>
                    </div>

                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div className="rounded-xl bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Diagnosis
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {selectedRecord.diagnosis || "Not provided"}
                      </p>

                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        General Prescription
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {selectedRecord.prescription || "Not provided"}
                      </p>

                    </div>

                  </div>

                  {selectedRecord.symptoms && (
                    <div className="mt-4 rounded-xl bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Symptoms
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {selectedRecord.symptoms}
                      </p>

                    </div>
                  )}

                  {selectedRecord.notes && (
                    <div className="mt-4 rounded-xl bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Doctor Notes
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {selectedRecord.notes}
                      </p>

                    </div>
                  )}

                </div>

                {/* Prescription Items */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="mb-5 flex items-center justify-between">

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Prescription Items
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Medicines currently prescribed to this patient
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {selectedRecord.prescription_items?.length || 0} items
                    </span>

                  </div>

                  {!selectedRecord.prescription_items ||
                  selectedRecord.prescription_items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">

                      <div className="mb-2 text-3xl">
                        💊
                      </div>

                      <p className="text-sm font-medium text-slate-700">
                        No medicines added yet
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Use the form below to add the first medicine.
                      </p>

                    </div>
                  ) : (
                    <div className="space-y-3">

                      {selectedRecord.prescription_items.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-xl border border-slate-200 p-4"
                        >

                          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                            <div>

                              <div className="flex items-center gap-2">

                                <h3 className="font-semibold text-slate-900">
                                  {item.medicine_name}
                                </h3>

                                <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                                  Prescription
                                </span>

                              </div>

                              <p className="mt-1 text-xs text-slate-500">
                                Pharmacy: {item.pharmacy_name}
                              </p>

                            </div>

                          </div>

                          <div className="mt-4 grid gap-3 sm:grid-cols-3">

                            <div className="rounded-lg bg-slate-50 p-3">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Dosage
                              </p>

                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {item.dosage}
                              </p>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-3">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Frequency
                              </p>

                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {item.frequency}
                              </p>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-3">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Duration
                              </p>

                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {item.duration}
                              </p>
                            </div>

                          </div>

                        </div>
                      ))}

                    </div>
                  )}

                </div>

                {/* Add Medicine */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="mb-6">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        +
                      </div>

                      <div>
                        <h2 className="font-semibold text-slate-900">
                          Add Medicine
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          Add a medicine to this patient's prescription.
                        </p>
                      </div>

                    </div>

                  </div>

                  <form onSubmit={handleSubmit}>

                    <div className="space-y-5">

                      {/* Medicine */}
                      <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Medicine
                        </label>

                        <select
                          value={selectedMedicine}
                          onChange={(e) =>
                            setSelectedMedicine(e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="">
                            Select medicine
                          </option>

                          {medicines.map((medicine) => (
                            <option
                              key={medicine.id}
                              value={medicine.id}
                            >
                              {medicine.name}
                              {medicine.pharmacy_name
                                ? ` — ${medicine.pharmacy_name}`
                                : ""}
                            </option>
                          ))}

                        </select>

                      </div>

                      {/* Dosage / Frequency / Duration */}
                      <div className="grid gap-5 md:grid-cols-3">

                        <div>

                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Dosage
                          </label>

                          <input
                            type="text"
                            value={dosage}
                            onChange={(e) =>
                              setDosage(e.target.value)
                            }
                            placeholder="e.g. 1 tablet"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                        </div>

                        <div>

                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Frequency
                          </label>

                          <input
                            type="text"
                            value={frequency}
                            onChange={(e) =>
                              setFrequency(e.target.value)
                            }
                            placeholder="e.g. Twice a day"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                        </div>

                        <div>

                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Duration
                          </label>

                          <input
                            type="text"
                            value={duration}
                            onChange={(e) =>
                              setDuration(e.target.value)
                            }
                            placeholder="e.g. 5 days"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                        </div>

                      </div>

                      {/* Submit */}
                      <div className="flex justify-end border-t border-slate-100 pt-5">

                        <button
                          type="submit"
                          disabled={submitting}
                          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {submitting
                            ? "Adding Medicine..."
                            : "Add Medicine"}
                        </button>

                      </div>

                    </div>

                  </form>

                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}