import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api, { getErrorMessage } from "../../services/api";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        setLoadingDoctor(false);
      }
    };

    loadDoctor();
  }, [doctorId]);

  const handleBooking = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!date || !time || !reason.trim()) {
      setError("Please fill in all appointment details.");
      return;
    }

    setBooking(true);

    try {
      await api.post("/api/account/appointments/", {
        doctor: Number(doctorId),
        appointment_date: date,
        appointment_time: time,
        reason: reason.trim(),
      });

      setSuccess("Appointment booked successfully! 🎉");

      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to book the appointment. Please try another time."
        )
      );
    } finally {
      setBooking(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (loadingDoctor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Doctor details could not be loaded.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      {/* Back */}
      <button
        onClick={() =>
          navigate(`/patient/doctors/${doctorId}`)
        }
        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Back to Doctor
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Book Appointment 📅
        </h1>

        <p className="mt-2 text-slate-500">
          Schedule a consultation with your selected doctor.
        </p>
      </div>

      {/* Doctor summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
            👨‍⚕️
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Dr. {doctor.username}
            </h2>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {doctor.specialization}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Consultation Fee: ₹{doctor.consultation_fee}
            </p>
          </div>

        </div>

      </div>

      {/* Booking form */}
      <form
        onSubmit={handleBooking}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        <h2 className="text-xl font-semibold text-slate-900">
          Appointment Details
        </h2>

        {/* Date */}
        <div className="mt-6">

          <label
            htmlFor="appointment-date"
            className="block text-sm font-semibold text-slate-900"
          >
            Appointment Date
          </label>

          <input
            id="appointment-date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Time */}
        <div className="mt-5">

          <label
            htmlFor="appointment-time"
            className="block text-sm font-semibold text-slate-900"
          >
            Appointment Time
          </label>

          <input
            id="appointment-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Reason */}
        <div className="mt-5">

          <label
            htmlFor="appointment-reason"
            className="block text-sm font-semibold text-slate-900"
          >
            Reason for Consultation
          </label>

          <textarea
            id="appointment-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Example: Regular consultation"
            rows={5}
            maxLength={500}
            className="mt-2 w-full resize-none rounded-lg border border-slate-300 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {reason.length}/500
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={booking}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {booking
            ? "Booking appointment..."
            : "Book Appointment →"}
        </button>

      </form>

    </div>
  );
}