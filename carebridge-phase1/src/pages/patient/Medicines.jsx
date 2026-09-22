// // // import { useEffect, useState } from "react";
// // // import api, { getErrorMessage } from "../../services/api";

// // // export default function Medicines() {
// // //   const [medicines, setMedicines] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   const loadMedicines = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError("");

// // //       const response = await api.get(
// // //         "/api/account/medicines/"
// // //       );

// // //       setMedicines(response.data);
// // //     } catch (err) {
// // //       setError(
// // //         getErrorMessage(
// // //           err,
// // //           "Unable to load available medicines."
// // //         )
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadMedicines();
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <div className="flex min-h-[60vh] items-center justify-center">
// // //         <p className="text-slate-500">
// // //           Loading medicines...
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="mx-auto max-w-6xl space-y-6">

// // //       <div>
// // //         <h1 className="text-3xl font-bold text-slate-900">
// // //           Medicines 💊
// // //         </h1>

// // //         <p className="mt-2 text-slate-500">
// // //           Browse medicines available from verified pharmacies.
// // //         </p>
// // //       </div>

// // //       {error && (
// // //         <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
// // //           {error}
// // //         </div>
// // //       )}

// // //       {!error && medicines.length === 0 && (
// // //         <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

// // //           <div className="text-4xl">💊</div>

// // //           <h2 className="mt-4 text-xl font-semibold text-slate-900">
// // //             No medicines available
// // //           </h2>

// // //           <p className="mt-2 text-sm text-slate-500">
// // //             Medicines added by pharmacies will appear here.
// // //           </p>

// // //         </div>
// // //       )}

// // //       <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

// // //         {medicines.map((medicine) => (
// // //           <div
// // //             key={medicine.id}
// // //             className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
// // //           >

// // //             <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
// // //               💊
// // //             </div>

// // //             <h2 className="mt-4 text-xl font-bold text-slate-900">
// // //               {medicine.name}
// // //             </h2>

// // //             <p className="mt-2 text-sm text-slate-500">
// // //               Pharmacy:{" "}
// // //               <span className="font-medium text-slate-700">
// // //                 {medicine.pharmacy_name}
// // //               </span>
// // //             </p>

// // //             <div className="mt-5 flex items-center justify-between">

// // //               <div>
// // //                 <p className="text-xs font-semibold text-slate-500">
// // //                   Price
// // //                 </p>

// // //                 <p className="mt-1 text-lg font-bold text-slate-900">
// // //                   ₹{medicine.price}
// // //                 </p>
// // //               </div>

// // //               <div className="text-right">

// // //                 <p className="text-xs font-semibold text-slate-500">
// // //                   Stock
// // //                 </p>

// // //                 <p className="mt-1 text-sm font-semibold text-slate-700">
// // //                   {medicine.stock}
// // //                 </p>

// // //               </div>

// // //             </div>

// // //           </div>
// // //         ))}

// // //       </div>

// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import api, { getErrorMessage } from "../../services/api";

// // export default function Medicines() {
// //   const [medicines, setMedicines] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [orderingId, setOrderingId] = useState(null);
// //   const [quantity, setQuantity] = useState({});
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const loadMedicines = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const response = await api.get(
// //         "/api/account/medicines/"
// //       );

// //       setMedicines(response.data);
// //     } catch (err) {
// //       setError(
// //         getErrorMessage(
// //           err,
// //           "Unable to load available medicines."
// //         )
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadMedicines();
// //   }, []);

// //   const handleQuantityChange = (medicineId, value) => {
// //     setQuantity((previous) => ({
// //       ...previous,
// //       [medicineId]: value,
// //     }));
// //   };

// //   const handleOrder = async (medicineId) => {
// //     setError("");
// //     setSuccess("");

// //     const selectedQuantity = Number(quantity[medicineId] || 1);

// //     if (selectedQuantity < 1) {
// //       setError("Quantity must be at least 1.");
// //       return;
// //     }

// //     const medicine = medicines.find(
// //       (item) => item.id === medicineId
// //     );

// //     if (!medicine) {
// //       setError("Medicine not found.");
// //       return;
// //     }

// //     if (selectedQuantity > medicine.stock) {
// //       setError(
// //         `Only ${medicine.stock} units are currently available.`
// //       );
// //       return;
// //     }

// //     try {
// //       setOrderingId(medicineId);

// //       await api.post(
// //         "/api/account/medicine-orders/",
// //         {
// //           medicine: medicineId,
// //           quantity: selectedQuantity,
// //         }
// //       );

// //       setSuccess(
// //         `${medicine.name} ordered successfully! 🎉`
// //       );

// //       setQuantity((previous) => ({
// //         ...previous,
// //         [medicineId]: 1,
// //       }));

// //       await loadMedicines();
// //     } catch (err) {
// //       setError(
// //         getErrorMessage(
// //           err,
// //           "Unable to place the medicine order."
// //         )
// //       );
// //     } finally {
// //       setOrderingId(null);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex min-h-[60vh] items-center justify-center">
// //         <p className="text-slate-500">
// //           Loading medicines...
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="mx-auto max-w-6xl space-y-6">

// //       <div>
// //         <h1 className="text-3xl font-bold text-slate-900">
// //           Medicines 💊
// //         </h1>

// //         <p className="mt-2 text-slate-500">
// //           Browse medicines available from verified pharmacies.
// //         </p>
// //       </div>

// //       {error && (
// //         <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
// //           {error}
// //         </div>
// //       )}

// //       {success && (
// //         <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
// //           {success}
// //         </div>
// //       )}

// //       {!error && medicines.length === 0 && (
// //         <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

// //           <div className="text-4xl">💊</div>

// //           <h2 className="mt-4 text-xl font-semibold text-slate-900">
// //             No medicines available
// //           </h2>

// //           <p className="mt-2 text-sm text-slate-500">
// //             Medicines added by pharmacies will appear here.
// //           </p>

// //         </div>
// //       )}

// //       <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

// //         {medicines.map((medicine) => (
// //           <div
// //             key={medicine.id}
// //             className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
// //           >

// //             <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
// //               💊
// //             </div>

// //             <h2 className="mt-4 text-xl font-bold text-slate-900">
// //               {medicine.name}
// //             </h2>

// //             <p className="mt-2 text-sm text-slate-500">
// //               Pharmacy:{" "}
// //               <span className="font-medium text-slate-700">
// //                 {medicine.pharmacy_name}
// //               </span>
// //             </p>

// //             <div className="mt-5 flex items-center justify-between">

// //               <div>
// //                 <p className="text-xs font-semibold text-slate-500">
// //                   Price
// //                 </p>

// //                 <p className="mt-1 text-lg font-bold text-slate-900">
// //                   ₹{medicine.price}
// //                 </p>
// //               </div>

// //               <div className="text-right">

// //                 <p className="text-xs font-semibold text-slate-500">
// //                   Stock
// //                 </p>

// //                 <p className="mt-1 text-sm font-semibold text-slate-700">
// //                   {medicine.stock}
// //                 </p>

// //               </div>

// //             </div>

// //             <div className="mt-5">

// //               <label
// //                 htmlFor={`quantity-${medicine.id}`}
// //                 className="block text-sm font-semibold text-slate-900"
// //               >
// //                 Quantity
// //               </label>

// //               <input
// //                 id={`quantity-${medicine.id}`}
// //                 type="number"
// //                 min="1"
// //                 max={medicine.stock}
// //                 value={quantity[medicine.id] || 1}
// //                 onChange={(e) =>
// //                   handleQuantityChange(
// //                     medicine.id,
// //                     e.target.value
// //                   )
// //                 }
// //                 className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //               />

// //             </div>

// //             <button
// //               type="button"
// //               onClick={() => handleOrder(medicine.id)}
// //               disabled={
// //                 medicine.stock <= 0 ||
// //                 orderingId === medicine.id
// //               }
// //               className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
// //             >
// //               {orderingId === medicine.id
// //                 ? "Placing Order..."
// //                 : medicine.stock <= 0
// //                 ? "Out of Stock"
// //                 : "Order Medicine →"}
// //             </button>

// //           </div>
// //         ))}

// //       </div>

// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import api, { getErrorMessage } from "../../services/api";

// // Match prescription names to pharmacy medicine names (case/space-insensitive)
// const normalize = (value) =>
//   (value ?? "").toString().trim().toLowerCase();

// // Reusable quantity input + order button
// function OrderControls({
//   idPrefix,
//   medicine,
//   value,
//   onChange,
//   onOrder,
//   isOrdering,
// }) {
//   return (
//     <>
//       <div className="mt-4">
//         <label
//           htmlFor={`${idPrefix}-quantity`}
//           className="block text-sm font-semibold text-slate-900"
//         >
//           Quantity
//         </label>

//         <input
//           id={`${idPrefix}-quantity`}
//           type="number"
//           min="1"
//           max={medicine.stock}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//         />
//       </div>

//       <button
//         type="button"
//         onClick={onOrder}
//         disabled={medicine.stock <= 0 || isOrdering}
//         className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {isOrdering
//           ? "Placing Order..."
//           : medicine.stock <= 0
//           ? "Out of Stock"
//           : "Order Medicine →"}
//       </button>
//     </>
//   );
// }

// export default function Medicines() {
//   const [medicines, setMedicines] = useState([]);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [orderingKey, setOrderingKey] = useState(null);
//   const [quantity, setQuantity] = useState({});
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const loadData = async ({ silent = false } = {}) => {
//     if (!silent) setLoading(true);
//     setError("");

//     // Load both lists together; a failure in one shouldn't block the other
//     const [medicinesResult, prescriptionsResult] =
//       await Promise.allSettled([
//         api.get("/api/account/medicines/"),
//         api.get("/api/account/my-prescriptions/"),
//       ]);

//     if (medicinesResult.status === "fulfilled") {
//       setMedicines(medicinesResult.value.data);
//     } else {
//       setError(
//         getErrorMessage(
//           medicinesResult.reason,
//           "Unable to load available medicines."
//         )
//       );
//     }

//     if (prescriptionsResult.status === "fulfilled") {
//       setPrescriptions(prescriptionsResult.value.data);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleQuantityChange = (key, value) => {
//     setQuantity((previous) => ({
//       ...previous,
//       [key]: value,
//     }));
//   };

//   // key identifies which card the order came from (for quantity + spinner)
//   const handleOrder = async (medicine, key, defaultQuantity = 1) => {
//     setError("");
//     setSuccess("");

//     const selectedQuantity = Number(quantity[key] ?? defaultQuantity);

//     if (!Number.isInteger(selectedQuantity) || selectedQuantity < 1) {
//       setError("Quantity must be at least 1.");
//       return;
//     }

//     if (selectedQuantity > medicine.stock) {
//       setError(
//         `Only ${medicine.stock} units of ${medicine.name} are currently available.`
//       );
//       return;
//     }

//     try {
//       setOrderingKey(key);

//       await api.post("/api/account/medicine-orders/", {
//         medicine: medicine.id,
//         quantity: selectedQuantity,
//       });

//       setSuccess(`${medicine.name} ordered successfully! 🎉`);

//       setQuantity((previous) => {
//         const next = { ...previous };
//         delete next[key];
//         return next;
//       });

//       await loadData({ silent: true });
//     } catch (err) {
//       setError(
//         getErrorMessage(err, "Unable to place the medicine order.")
//       );
//     } finally {
//       setOrderingKey(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <p className="text-slate-500">Loading medicines...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-6xl space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">
//           Medicines 💊
//         </h1>

//         <p className="mt-2 text-slate-500">
//           Order medicines prescribed by your doctors, or browse
//           everything available from verified pharmacies.
//         </p>
//       </div>

//       {error && (
//         <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
//           {success}
//         </div>
//       )}

//       {/* ---------- Prescribed by your doctors ---------- */}
//       {prescriptions.length > 0 && (
//         <section className="space-y-4">
//           <div>
//             <h2 className="text-xl font-bold text-slate-900">
//               Prescribed for you
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Medicines from your completed consultations, with the
//               pharmacies that stock them.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {prescriptions.map((prescription) => {
//               const matches = medicines.filter(
//                 (medicine) =>
//                   normalize(medicine.name) ===
//                   normalize(prescription.medicine_name)
//               );

//               const prescribedQty =
//                 Number(prescription.quantity) || 1;

//               return (
//                 <div
//                   key={prescription.id}
//                   className="rounded-xl border border-green-200 bg-white p-6 shadow-sm"
//                 >
//                   <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
//                     <div>
//                       <h3 className="text-lg font-bold text-slate-900">
//                         {prescription.medicine_name}
//                       </h3>

//                       <p className="mt-1 text-sm text-slate-500">
//                         Prescribed by Dr.{" "}
//                         {prescription.doctor_name} · 📅{" "}
//                         {prescription.appointment_date}
//                       </p>
//                     </div>

//                     <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//                       Prescription
//                     </span>
//                   </div>

//                   <div className="mt-4 grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <p className="text-xs font-semibold text-slate-500">
//                         Prescribed quantity
//                       </p>
//                       <p className="mt-1 text-sm text-slate-700">
//                         {prescription.quantity}
//                       </p>
//                     </div>

//                     <div>
//                       <p className="text-xs font-semibold text-slate-500">
//                         Dosage
//                       </p>
//                       <p className="mt-1 text-sm text-slate-700">
//                         {prescription.dosage || "Not provided"}
//                       </p>
//                     </div>
//                   </div>

//                   {prescription.instructions && (
//                     <div className="mt-4">
//                       <p className="text-xs font-semibold text-slate-500">
//                         Instructions
//                       </p>
//                       <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
//                         {prescription.instructions}
//                       </p>
//                     </div>
//                   )}

//                   <div className="mt-5 border-t border-slate-100 pt-5">
//                     {matches.length === 0 ? (
//                       <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
//                         This medicine isn&apos;t listed by any
//                         pharmacy right now.
//                       </p>
//                     ) : (
//                       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                         {matches.map((medicine) => {
//                           const key = `rx-${prescription.id}-${medicine.id}`;

//                           return (
//                             <div
//                               key={medicine.id}
//                               className="rounded-lg border border-slate-200 p-4"
//                             >
//                               <p className="text-sm text-slate-500">
//                                 Pharmacy:{" "}
//                                 <span className="font-medium text-slate-700">
//                                   {medicine.pharmacy_name}
//                                 </span>
//                               </p>

//                               <div className="mt-3 flex items-center justify-between">
//                                 <div>
//                                   <p className="text-xs font-semibold text-slate-500">
//                                     Price
//                                   </p>
//                                   <p className="mt-1 text-lg font-bold text-slate-900">
//                                     ₹{medicine.price}
//                                   </p>
//                                 </div>

//                                 <div className="text-right">
//                                   <p className="text-xs font-semibold text-slate-500">
//                                     Stock
//                                   </p>
//                                   <p className="mt-1 text-sm font-semibold text-slate-700">
//                                     {medicine.stock}
//                                   </p>
//                                 </div>
//                               </div>

//                               <OrderControls
//                                 idPrefix={key}
//                                 medicine={medicine}
//                                 value={quantity[key] ?? prescribedQty}
//                                 onChange={(value) =>
//                                   handleQuantityChange(key, value)
//                                 }
//                                 onOrder={() =>
//                                   handleOrder(
//                                     medicine,
//                                     key,
//                                     prescribedQty
//                                   )
//                                 }
//                                 isOrdering={orderingKey === key}
//                               />
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       )}

//       {/* ---------- All available medicines ---------- */}
//       <section className="space-y-4">
//         <h2 className="text-xl font-bold text-slate-900">
//           All available medicines
//         </h2>

//         {!error && medicines.length === 0 && (
//           <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
//             <div className="text-4xl">💊</div>

//             <h3 className="mt-4 text-xl font-semibold text-slate-900">
//               No medicines available
//             </h3>

//             <p className="mt-2 text-sm text-slate-500">
//               Medicines added by pharmacies will appear here.
//             </p>
//           </div>
//         )}

//         <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//           {medicines.map((medicine) => {
//             const key = `med-${medicine.id}`;

//             return (
//               <div
//                 key={medicine.id}
//                 className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
//               >
//                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
//                   💊
//                 </div>

//                 <h3 className="mt-4 text-xl font-bold text-slate-900">
//                   {medicine.name}
//                 </h3>

//                 <p className="mt-2 text-sm text-slate-500">
//                   Pharmacy:{" "}
//                   <span className="font-medium text-slate-700">
//                     {medicine.pharmacy_name}
//                   </span>
//                 </p>

//                 <div className="mt-5 flex items-center justify-between">
//                   <div>
//                     <p className="text-xs font-semibold text-slate-500">
//                       Price
//                     </p>
//                     <p className="mt-1 text-lg font-bold text-slate-900">
//                       ₹{medicine.price}
//                     </p>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-xs font-semibold text-slate-500">
//                       Stock
//                     </p>
//                     <p className="mt-1 text-sm font-semibold text-slate-700">
//                       {medicine.stock}
//                     </p>
//                   </div>
//                 </div>

//                 <OrderControls
//                   idPrefix={key}
//                   medicine={medicine}
//                   value={quantity[key] ?? 1}
//                   onChange={(value) =>
//                     handleQuantityChange(key, value)
//                   }
//                   onOrder={() => handleOrder(medicine, key)}
//                   isOrdering={orderingKey === key}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";
import {
  normalizePrescriptions,
  findMatchingMedicines,
} from "../../services/prescriptionUtils";

// Reusable quantity input + order button
function OrderControls({
  idPrefix,
  medicine,
  value,
  onChange,
  onOrder,
  isOrdering,
}) {
  return (
    <>
      <div className="mt-4">
        <label
          htmlFor={`${idPrefix}-quantity`}
          className="block text-sm font-semibold text-slate-900"
        >
          Quantity
        </label>

        <input
          id={`${idPrefix}-quantity`}
          type="number"
          min="1"
          max={medicine.stock}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="button"
        onClick={onOrder}
        disabled={medicine.stock <= 0 || isOrdering}
        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isOrdering
          ? "Placing Order..."
          : medicine.stock <= 0
          ? "Out of Stock"
          : "Order Medicine →"}
      </button>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 whitespace-pre-line text-sm text-slate-700">
        {value || "Not provided"}
      </p>
    </div>
  );
}

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [prescribed, setPrescribed] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orderingKey, setOrderingKey] = useState(null);
  const [quantity, setQuantity] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError("");

    // Load both lists together; a failure in one shouldn't block the other
    const [medicinesResult, prescriptionsResult] =
      await Promise.allSettled([
        api.get("/api/account/medicines/"),
        api.get("/api/account/my-prescriptions/"),
      ]);

    if (medicinesResult.status === "fulfilled") {
      setMedicines(medicinesResult.value.data);
    } else {
      setError(
        getErrorMessage(
          medicinesResult.reason,
          "Unable to load available medicines."
        )
      );
    }

    if (prescriptionsResult.status === "fulfilled") {
      setPrescribed(
        normalizePrescriptions(prescriptionsResult.value.data)
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuantityChange = (key, value) => {
    setQuantity((previous) => ({ ...previous, [key]: value }));
  };

  // key identifies which card the order came from (for quantity + spinner)
  const handleOrder = async (medicine, key, defaultQuantity = 1) => {
    setError("");
    setSuccess("");

    const selectedQuantity = Number(quantity[key] ?? defaultQuantity);

    if (!Number.isInteger(selectedQuantity) || selectedQuantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    if (selectedQuantity > medicine.stock) {
      setError(
        `Only ${medicine.stock} units of ${medicine.name} are currently available.`
      );
      return;
    }

    try {
      setOrderingKey(key);

      await api.post("/api/account/medicine-orders/", {
        medicine: medicine.id,
        quantity: selectedQuantity,
      });

      setSuccess(`${medicine.name} ordered successfully! 🎉`);

      setQuantity((previous) => {
        const next = { ...previous };
        delete next[key];
        return next;
      });

      await loadData({ silent: true });
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to place the medicine order.")
      );
    } finally {
      setOrderingKey(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading medicines...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Medicines 💊
        </h1>

        <p className="mt-2 text-slate-500">
          Order medicines prescribed by your doctors, or browse
          everything available from verified pharmacies.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* ---------- Prescribed by your doctors ---------- */}
      {prescribed.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Prescribed for you
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Medicines from your consultations, with the pharmacy
              that stocks them.
            </p>
          </div>

          <div className="space-y-4">
            {prescribed.map((item) => {
              const matches = findMatchingMedicines(item, medicines);
              const prescribedQty = Number(item.quantity) || 1;

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-green-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {item.name || matches[0]?.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.doctorName &&
                          `Prescribed by Dr. ${item.doctorName}`}
                        {item.date && ` · 📅 ${item.date}`}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Prescription
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <Detail label="Dosage" value={item.dosage} />
                    <Detail label="Frequency" value={item.frequency} />
                    <Detail label="Duration" value={item.duration} />
                  </div>

                  {item.instructions && (
                    <div className="mt-4">
                      <Detail
                        label="Instructions"
                        value={item.instructions}
                      />
                    </div>
                  )}

                  <div className="mt-5 border-t border-slate-100 pt-5">
                    {matches.length === 0 ? (
                      <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                        This medicine isn&apos;t listed by any
                        pharmacy right now.
                      </p>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {matches.map((medicine) => {
                          const key = `rx-${item.id}-${medicine.id}`;

                          return (
                            <div
                              key={medicine.id}
                              className="rounded-lg border border-slate-200 p-4"
                            >
                              <p className="text-sm text-slate-500">
                                Pharmacy:{" "}
                                <span className="font-medium text-slate-700">
                                  {medicine.pharmacy_name}
                                </span>
                              </p>

                              <div className="mt-3 flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-semibold text-slate-500">
                                    Price
                                  </p>
                                  <p className="mt-1 text-lg font-bold text-slate-900">
                                    ₹{medicine.price}
                                  </p>
                                </div>

                                <div className="text-right">
                                  <p className="text-xs font-semibold text-slate-500">
                                    Stock
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {medicine.stock}
                                  </p>
                                </div>
                              </div>

                              <OrderControls
                                idPrefix={key}
                                medicine={medicine}
                                value={quantity[key] ?? prescribedQty}
                                onChange={(value) =>
                                  handleQuantityChange(key, value)
                                }
                                onOrder={() =>
                                  handleOrder(
                                    medicine,
                                    key,
                                    prescribedQty
                                  )
                                }
                                isOrdering={orderingKey === key}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ---------- All available medicines ---------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          All available medicines
        </h2>

        {!error && medicines.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-4xl">💊</div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              No medicines available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Medicines added by pharmacies will appear here.
            </p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {medicines.map((medicine) => {
            const key = `med-${medicine.id}`;

            return (
              <div
                key={medicine.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                  💊
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {medicine.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Pharmacy:{" "}
                  <span className="font-medium text-slate-700">
                    {medicine.pharmacy_name}
                  </span>
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Price
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      ₹{medicine.price}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-500">
                      Stock
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {medicine.stock}
                    </p>
                  </div>
                </div>

                <OrderControls
                  idPrefix={key}
                  medicine={medicine}
                  value={quantity[key] ?? 1}
                  onChange={(value) =>
                    handleQuantityChange(key, value)
                  }
                  onOrder={() => handleOrder(medicine, key)}
                  isOrdering={orderingKey === key}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}