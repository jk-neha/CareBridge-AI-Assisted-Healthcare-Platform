import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api, { getErrorMessage } from "../../services/api";

export default function DoctorDetails() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const response = await api.get(
          `/api/account/doctors/${doctorId}/`
        );

        setDoctor(response.data);
      } catch (err) {
        setError(
          getErrorMessage(
            err,
            "Unable to load doctor details."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading doctor details...
        </p>
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

  if (!doctor) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Back */}
      <button
        onClick={() => navigate("/patient/doctors")}
        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Back to Doctors
      </button>

      {/* Doctor profile */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="bg-blue-600 px-8 py-10 text-white">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl">
              👨‍⚕️
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Dr. {doctor.username}
              </h1>

              <p className="mt-2 text-blue-100">
                {doctor.specialization}
              </p>
            </div>

          </div>
        </div>

        {/* Information */}
        <div className="grid gap-6 p-8 sm:grid-cols-2">

          <InfoItem
            label="Specialization"
            value={doctor.specialization}
          />

          <InfoItem
            label="Qualification"
            value={doctor.qualification}
          />

          <InfoItem
            label="Experience"
            value={`${doctor.experience_years} years`}
          />

          <InfoItem
            label="Consultation Fee"
            value={`₹${doctor.consultation_fee}`}
          />

          <InfoItem
            label="License Number"
            value={doctor.license_number}
          />

          <InfoItem
            label="Verification"
            value={
              doctor.is_verified
                ? "Verified Doctor ✓"
                : "Not Verified"
            }
          />

        </div>

        {/* Booking */}
        <div className="border-t border-slate-200 bg-slate-50 p-8">

          <h2 className="text-xl font-semibold text-slate-900">
            Book a Consultation
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Choose this doctor to continue with your appointment.
          </p>

          <button
            onClick={() =>
              navigate(`/patient/doctors/${doctor.id}/book`)
            }
            className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Book Appointment →
          </button>

        </div>

      </div>

    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value || "Not available"}
      </p>
    </div>
  );
}