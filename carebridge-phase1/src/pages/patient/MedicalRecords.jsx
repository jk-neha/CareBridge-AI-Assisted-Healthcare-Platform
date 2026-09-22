import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/account/medical-records/"
      );

      setRecords(response.data);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to load your medical records."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading your medical records...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Medical Records 🏥
        </h1>

        <p className="mt-2 text-slate-500">
          View your diagnosis, symptoms, prescriptions,
          and consultation notes.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && records.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="text-4xl">🏥</div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No medical records yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your medical records will appear here after
            a completed consultation.
          </p>

        </div>
      )}

      <div className="space-y-5">

        {records.map((record) => (
          <div
            key={record.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Dr. {record.doctor_name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  📅 {record.appointment_date}
                  {"  "}
                  🕐 {record.appointment_time}
                </p>
              </div>

              <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Medical Record
              </span>

            </div>

            {/* Diagnosis */}

            <div className="mt-5">

              <h3 className="text-sm font-semibold text-slate-500">
                Diagnosis
              </h3>

              <p className="mt-1 text-base font-medium text-slate-900">
                {record.diagnosis || "Not provided"}
              </p>

            </div>

            {/* Symptoms */}

            <div className="mt-5">

              <h3 className="text-sm font-semibold text-slate-500">
                Symptoms
              </h3>

              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
                {record.symptoms || "Not provided"}
              </p>

            </div>

            {/* Prescription */}

            <div className="mt-5">

              <h3 className="text-sm font-semibold text-slate-500">
                Prescription
              </h3>

              <div className="mt-2 rounded-lg bg-slate-50 p-4">

                <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                  {record.prescription || "No prescription provided"}
                </p>

              </div>

            </div>

            {/* Notes */}

            <div className="mt-5">

              <h3 className="text-sm font-semibold text-slate-500">
                Doctor's Notes
              </h3>

              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
                {record.notes || "No additional notes"}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}