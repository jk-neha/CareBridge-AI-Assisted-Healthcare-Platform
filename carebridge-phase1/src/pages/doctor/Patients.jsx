// import { useEffect, useState } from "react";
// import api from "../../services/api";

// const Patients = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get("/api/account/doctor/patients/");
//       setPatients(response.data);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.detail ||
//           "Failed to load patients."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-[300px] items-center justify-center">
//         <p className="text-slate-500">Loading patients...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="rounded-xl border border-red-200 bg-red-50 p-6">
//         <p className="text-sm text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">
//           My Patients
//         </h1>
//         <p className="mt-1 text-sm text-slate-500">
//           View patients who have appointments with you.
//         </p>
//       </div>

//       {/* Patient List */}
//       {patients.length === 0 ? (
//         <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
//           <p className="text-slate-500">
//             No patients found.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-5 md:grid-cols-2">
//           {patients.map((patient) => (
//             <div
//               key={patient.id}
//               className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold text-slate-900">
//                     {patient.username}
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     {patient.email}
//                   </p>
//                 </div>

//                 <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
//                   Patient
//                 </div>
//               </div>

//               <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500">
//                     Phone
//                   </span>
//                   <span className="font-medium text-slate-800">
//                     {patient.phone_number || "Not provided"}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500">
//                     Appointments
//                   </span>
//                   <span className="font-medium text-slate-800">
//                     {patient.total_appointments}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500">
//                     Medical Records
//                   </span>
//                   <span className="font-medium text-slate-800">
//                     {patient.total_medical_records}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500">
//                     Last Appointment
//                   </span>
//                   <span className="font-medium text-slate-800">
//                     {patient.last_appointment || "No appointments"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Patients;

//new
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  FileText,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Users,
} from "lucide-react";
import api, { getErrorMessage } from "../../services/api";

// API dates arrive as "YYYY-MM-DD". Build the Date from parts so the
// browser timezone can never shift the day.
const formatDate = (value) => {
  if (!value) return "No appointments yet";

  const [year, month, day] = String(value).split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/account/doctor/patients/");

      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load your patients."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" aria-hidden="true" />
        <p className="text-slate-500">Loading patients...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Patients</h1>

          <p className="mt-2 text-slate-500">
            Patients who have booked appointments with you.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchPatients}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      {/* Empty */}
      {!error && patients.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Users className="h-6 w-6" aria-hidden="true" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No patients yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Patients will appear here once they book an appointment with you.
          </p>
        </div>
      )}

      {/* Patient list */}
      {patients.length > 0 && (
        <>
          <p className="text-sm text-slate-500">
            {patients.length} {patients.length === 1 ? "patient" : "patients"}
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {/* Identity */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                    {patient.username?.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-slate-900">
                      {patient.username}
                    </h2>

                    <p className="text-xs font-medium text-blue-600">Patient</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                    <span className="truncate">{patient.email || "Not provided"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                    <span>{patient.phone_number || "Not provided"}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      Appointments
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {patient.total_appointments ?? 0}
                    </p>
                  </div>

                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      Records
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {patient.total_medical_records ?? 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Last Appointment
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatDate(patient.last_appointment)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
