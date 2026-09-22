// import { useEffect, useState } from "react";
// import api, { getErrorMessage } from "../../services/api";

// export default function Prescriptions() {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadPrescriptions = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get(
//         "/api/account/my-prescriptions/"
//       );

//       setPrescriptions(response.data);
//     } catch (err) {
//       setError(
//         getErrorMessage(
//           err,
//           "Unable to load your prescriptions."
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadPrescriptions();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <p className="text-slate-500">
//           Loading your prescriptions...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-6">

//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">
//           Prescriptions 💊
//         </h1>

//         <p className="mt-2 text-slate-500">
//           View medicines prescribed by your doctors.
//         </p>
//       </div>

//       {error && (
//         <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       {!error && prescriptions.length === 0 && (
//         <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

//           <div className="text-4xl">💊</div>

//           <h2 className="mt-4 text-xl font-semibold text-slate-900">
//             No prescriptions yet
//           </h2>

//           <p className="mt-2 text-sm text-slate-500">
//             Prescriptions from your completed consultations
//             will appear here.
//           </p>

//         </div>
//       )}

//       <div className="space-y-5">

//         {prescriptions.map((prescription) => (
//           <div
//             key={prescription.id}
//             className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
//           >

//             <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start">

//               <div>

//                 <h2 className="text-xl font-bold text-slate-900">
//                   Dr. {prescription.doctor_name}
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   📅 {prescription.appointment_date}
//                 </p>

//               </div>

//               <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//                 Prescription
//               </span>

//             </div>

//             <div className="mt-5">

//               <h3 className="text-sm font-semibold text-slate-500">
//                 Medicine
//               </h3>

//               <p className="mt-1 text-base font-semibold text-slate-900">
//                 {prescription.medicine_name}
//               </p>

//             </div>

//             <div className="mt-5 grid gap-5 sm:grid-cols-2">

//               <div>
//                 <h3 className="text-sm font-semibold text-slate-500">
//                   Quantity
//                 </h3>

//                 <p className="mt-1 text-sm text-slate-700">
//                   {prescription.quantity}
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold text-slate-500">
//                   Dosage
//                 </h3>

//                 <p className="mt-1 text-sm text-slate-700">
//                   {prescription.dosage || "Not provided"}
//                 </p>
//               </div>

//             </div>

//             {prescription.instructions && (
//               <div className="mt-5">

//                 <h3 className="text-sm font-semibold text-slate-500">
//                   Instructions
//                 </h3>

//                 <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
//                   {prescription.instructions}
//                 </p>

//               </div>
//             )}

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../../services/api";
import { normalizePrescriptions } from "../../services/prescriptionUtils";

function Detail({ label, value }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500">{label}</h3>

      <p className="mt-1 whitespace-pre-line text-sm text-slate-700">
        {value || "Not provided"}
      </p>
    </div>
  );
}

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/account/my-prescriptions/");

      setPrescriptions(normalizePrescriptions(response.data));
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to load your prescriptions.")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading your prescriptions...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Prescriptions 💊
        </h1>

        <p className="mt-2 text-slate-500">
          View medicines prescribed by your doctors.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && prescriptions.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">💊</div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No prescriptions yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Prescriptions from your consultations will appear here.
          </p>
        </div>
      )}

      <div className="space-y-5">
        {prescriptions.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start">
              <div>
                {item.doctorName && (
                  <h2 className="text-xl font-bold text-slate-900">
                    Dr. {item.doctorName}
                  </h2>
                )}

                {item.date && (
                  <p className="mt-1 text-sm text-slate-500">
                    📅 {item.date}
                  </p>
                )}
              </div>

              <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Prescription
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-semibold text-slate-500">
                Medicine
              </h3>

              <p className="mt-1 text-base font-semibold text-slate-900">
                {item.name || "Not provided"}
              </p>

              {item.pharmacyName && (
                <p className="mt-1 text-sm text-slate-500">
                  Pharmacy: {item.pharmacyName}
                </p>
              )}
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Detail label="Dosage" value={item.dosage} />
              <Detail label="Frequency" value={item.frequency} />
              <Detail label="Duration" value={item.duration} />
            </div>

            {item.quantity && (
              <div className="mt-5">
                <Detail label="Quantity" value={String(item.quantity)} />
              </div>
            )}

            {item.instructions && (
              <div className="mt-5">
                <Detail label="Instructions" value={item.instructions} />
              </div>
            )}

            <div className="mt-6">
              <Link
                to="/patient/medicines"
                className="inline-block rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Order this medicine →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}