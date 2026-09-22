import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api, { getErrorMessage } from "../../services/api";

export default function Doctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await api.get("/api/account/doctors/");
        setDoctors(response.data);
      } catch (err) {
        setError(
          getErrorMessage(
            err,
            "Unable to load doctors. Please try again."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading verified doctors...
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

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Find a Doctor 👨‍⚕️
        </h1>

        <p className="mt-2 text-slate-500">
          Browse verified doctors and choose a specialist for your
          consultation.
        </p>
      </div>

      {/* Doctors */}
      {doctors.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">
            No doctors available
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Please check again later.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              {/* Doctor avatar */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                👨‍⚕️
              </div>

              {/* Doctor information */}
              <div className="mt-5">

                <h2 className="text-lg font-bold text-slate-900">
                  Dr. {doctor.username}
                </h2>

                <p className="mt-1 font-medium text-blue-600">
                  {doctor.specialization}
                </p>

                <div className="mt-4 space-y-2 text-sm text-slate-500">

                  <p>
                    🎓 {doctor.qualification}
                  </p>

                  <p>
                    💼 {doctor.experience_years} years experience
                  </p>

                  <p>
                    💰 ₹{doctor.consultation_fee}
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(`/patient/doctors/${doctor.id}`)
                  }
                  className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Doctor →
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}