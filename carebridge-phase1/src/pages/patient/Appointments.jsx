// import { useEffect, useState } from "react";
// import api, { getErrorMessage } from "../../services/api";

// export default function Appointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadAppointments = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get(
//         "/api/account/my-appointments/"
//       );

//       setAppointments(response.data);
//     } catch (err) {
//       setError(
//         getErrorMessage(
//           err,
//           "Unable to load your appointments."
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAppointments();
//   }, []);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "CONFIRMED":
//         return "bg-green-100 text-green-700";

//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";

//       case "REJECTED":
//         return "bg-red-100 text-red-700";

//       case "CANCELLED":
//         return "bg-slate-100 text-slate-600";

//       case "COMPLETED":
//         return "bg-blue-100 text-blue-700";

//       default:
//         return "bg-slate-100 text-slate-600";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <p className="text-slate-500">
//           Loading your appointments...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-6">

//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">
//           Appointments 📅
//         </h1>

//         <p className="mt-2 text-slate-500">
//           View and manage your doctor appointments.
//         </p>
//       </div>

//       {error && (
//         <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       {!error && appointments.length === 0 && (
//         <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
//           <div className="text-4xl">📅</div>

//           <h2 className="mt-4 text-xl font-semibold text-slate-900">
//             No appointments yet
//           </h2>

//           <p className="mt-2 text-sm text-slate-500">
//             Book an appointment with a doctor to see it here.
//           </p>
//         </div>
//       )}

//       <div className="space-y-4">

//         {appointments.map((appointment) => (
//           <div
//             key={appointment.id}
//             className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
//           >

//             <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

//               <div>

//                 <h2 className="text-xl font-bold text-slate-900">
//                   Dr. {appointment.doctor_name}
//                 </h2>

//                 <div className="mt-3 space-y-2 text-sm text-slate-600">

//                   <p>
//                     📅{" "}
//                     <span className="font-medium text-slate-900">
//                       {appointment.appointment_date}
//                     </span>
//                   </p>

//                   <p>
//                     🕐{" "}
//                     <span className="font-medium text-slate-900">
//                       {appointment.appointment_time}
//                     </span>
//                   </p>

//                   <p>
//                     📝{" "}
//                     <span className="font-medium text-slate-900">
//                       {appointment.reason}
//                     </span>
//                   </p>

//                 </div>

//               </div>

//               <span
//                 className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
//                   appointment.status
//                 )}`}
//               >
//                 {appointment.status}
//               </span>

//             </div>

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/account/my-appointments/"
      );

      setAppointments(response.data);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to load your appointments."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(appointmentId);
      setError("");

      await api.patch(
        `/api/account/appointments/${appointmentId}/cancel/`
      );

      await loadAppointments();
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to cancel the appointment."
        )
      );
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

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
          Loading your appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Appointments 📅
        </h1>

        <p className="mt-2 text-slate-500">
          View and manage your doctor appointments.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && appointments.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">📅</div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No appointments yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Book an appointment with a doctor to see it here.
          </p>
        </div>
      )}

      <div className="space-y-4">

        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Dr. {appointment.doctor_name}
                </h2>

                <div className="mt-3 space-y-2 text-sm text-slate-600">

                  <p>
                    📅{" "}
                    <span className="font-medium text-slate-900">
                      {appointment.appointment_date}
                    </span>
                  </p>

                  <p>
                    🕐{" "}
                    <span className="font-medium text-slate-900">
                      {appointment.appointment_time}
                    </span>
                  </p>

                  <p>
                    📝{" "}
                    <span className="font-medium text-slate-900">
                      {appointment.reason}
                    </span>
                  </p>

                </div>

              </div>

              <div className="flex flex-col items-start gap-3 md:items-end">

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>

                {appointment.status === "PENDING" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleCancel(appointment.id)
                    }
                    disabled={
                      cancellingId === appointment.id
                    }
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {cancellingId === appointment.id
                      ? "Cancelling..."
                      : "Cancel Appointment"}
                  </button>
                )}

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}