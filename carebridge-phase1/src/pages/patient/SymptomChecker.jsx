import { useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckSymptoms = async (e) => {
    e.preventDefault();

    if (!symptoms.trim()) {
      setError("Please describe your symptoms.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await api.post(
        "/api/account/symptom-checker/",
        {
          symptoms: symptoms.trim(),
        }
      );

      setResult(response.data);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to analyze your symptoms. Please try again."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const getSpecializationLabel = (specialization) => {
    const labels = {
      GENERAL: "General Physician",
      CARDIOLOGY: "Cardiology",
      DERMATOLOGY: "Dermatology",
      PEDIATRICS: "Pediatrics",
      ENT: "ENT",
    };

    return labels[specialization] || specialization;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          AI Symptom Checker 🩺
        </h1>

        <p className="mt-2 text-slate-500">
          Describe your symptoms and get a preliminary specialist
          recommendation before booking an appointment.
        </p>
      </div>

      {/* Important notice */}
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
        <p className="font-semibold text-yellow-800">
          ⚠️ Important
        </p>

        <p className="mt-1 text-sm text-yellow-700">
          This tool provides a preliminary recommendation only.
          It is not a medical diagnosis or a replacement for professional
          medical advice.
        </p>
      </div>

      {/* Symptom form */}
      <form
        onSubmit={handleCheckSymptoms}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label
          htmlFor="symptoms"
          className="block text-sm font-semibold text-slate-900"
        >
          Describe your symptoms
        </label>

        <textarea
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Example: I have a sore throat, blocked nose and ear pain..."
          maxLength={2000}
          rows={7}
          className="mt-3 w-full resize-none rounded-lg border border-slate-300 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>Describe your symptoms clearly.</span>
          <span>{symptoms.length}/2000</span>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Analyzing symptoms..." : "Check Symptoms →"}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="space-y-5">

          <h2 className="text-xl font-semibold text-slate-900">
            AI Recommendation
          </h2>

          {/* Specialization */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-medium text-blue-600">
              Recommended Specialist
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {getSpecializationLabel(result.specialization)}
            </p>
          </div>

          {/* Reason */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Why this recommendation?
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              {result.reason}
            </p>
          </div>

          {/* Urgency */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Urgency
            </p>

            <span className="mt-3 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              {result.urgency}
            </span>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-600">
              {result.disclaimer}
            </p>
          </div>

          {/* Find doctor */}
          <button
            onClick={() => {
              window.location.href = "/patient/doctors";
            }}
            className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Find {getSpecializationLabel(result.specialization)} Doctors →
          </button>

        </div>
      )}

    </div>
  );
}