// import { useEffect, useState } from "react";
// import api, { getErrorMessage } from "../../services/api";

// export default function PharmacyMedicines() {
//   const [medicines, setMedicines] = useState([]);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get("/api/account/medicines/");

//       setMedicines(response.data);
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     if (!name.trim() || !price || !stock) {
//       setError("Please fill in medicine name, price and stock.");
//       return;
//     }

//     if (Number(price) < 0) {
//       setError("Price cannot be negative.");
//       return;
//     }

//     if (Number(stock) < 0) {
//       setError("Stock cannot be negative.");
//       return;
//     }

//     try {
//       setSubmitting(true);

//       await api.post("/api/account/pharmacy/medicines/", {
//         name: name.trim(),
//         description: description.trim(),
//         price: price,
//         stock: Number(stock),
//       });

//       setSuccess(`${name.trim()} added to your inventory successfully.`);

//       setName("");
//       setDescription("");
//       setPrice("");
//       setStock("");

//       await fetchMedicines();
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 px-6 py-8">
//       <div className="mx-auto max-w-7xl">

//         {/* Header */}
//         <div className="mb-8">
//           <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
//             Pharmacy Portal
//           </p>

//           <h1 className="text-3xl font-bold tracking-tight text-slate-900">
//             Medicine Inventory
//           </h1>

//           <p className="mt-2 text-sm text-slate-500">
//             Manage medicines, prices and available stock.
//           </p>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
//             <div className="flex items-start gap-3">
//               <span>⚠️</span>

//               <div>
//                 <p className="text-sm font-semibold text-red-800">
//                   Something went wrong
//                 </p>

//                 <p className="mt-1 text-sm text-red-700">
//                   {error}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Success */}
//         {success && (
//           <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
//             <div className="flex items-start gap-3">
//               <span className="text-emerald-600">✓</span>

//               <div>
//                 <p className="text-sm font-semibold text-emerald-800">
//                   Inventory updated
//                 </p>

//                 <p className="mt-1 text-sm text-emerald-700">
//                   {success}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="grid gap-6 lg:grid-cols-12">

//           {/* ADD MEDICINE */}
//           <div className="lg:col-span-4">
//             <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//               <div className="mb-6">
//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
//                     +
//                   </div>

//                   <div>
//                     <h2 className="font-semibold text-slate-900">
//                       Add Medicine
//                     </h2>

//                     <p className="mt-1 text-xs text-slate-500">
//                       Add a medicine to your pharmacy inventory.
//                     </p>
//                   </div>

//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-5">

//                 {/* Name */}
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Medicine Name
//                   </label>

//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="e.g. Paracetamol 500mg"
//                     className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Description
//                   </label>

//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Optional medicine description"
//                     rows={3}
//                     className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                   />
//                 </div>

//                 {/* Price */}
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Price
//                   </label>

//                   <input
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     placeholder="e.g. 25.00"
//                     className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                   />
//                 </div>

//                 {/* Stock */}
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Stock
//                   </label>

//                   <input
//                     type="number"
//                     min="0"
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                     placeholder="e.g. 100"
//                     className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {submitting ? "Adding Medicine..." : "Add Medicine"}
//                 </button>

//               </form>
//             </div>
//           </div>

//           {/* INVENTORY */}
//           <div className="lg:col-span-8">
//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

//               {/* Header */}
//               <div className="border-b border-slate-200 px-6 py-5">

//                 <div className="flex items-center justify-between">

//                   <div>
//                     <h2 className="font-semibold text-slate-900">
//                       Your Medicines
//                     </h2>

//                     <p className="mt-1 text-xs text-slate-500">
//                       Medicines currently available in your inventory.
//                     </p>
//                   </div>

//                   <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
//                     {medicines.length} medicines
//                   </span>

//                 </div>

//               </div>

//               {/* Loading */}
//               {loading ? (
//                 <div className="px-6 py-16 text-center">

//                   <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

//                   <p className="text-sm text-slate-500">
//                     Loading medicines...
//                   </p>

//                 </div>
//               ) : medicines.length === 0 ? (
//                 <div className="px-6 py-16 text-center">

//                   <div className="mb-4 text-5xl">
//                     💊
//                   </div>

//                   <h3 className="font-semibold text-slate-900">
//                     No medicines yet
//                   </h3>

//                   <p className="mt-2 text-sm text-slate-500">
//                     Add your first medicine using the form.
//                   </p>

//                 </div>
//               ) : (
//                 <div className="divide-y divide-slate-100">

//                   {medicines.map((medicine) => (
//                     <div
//                       key={medicine.id}
//                       className="p-6 transition hover:bg-slate-50"
//                     >

//                       <div className="flex flex-col justify-between gap-5 md:flex-row">

//                         {/* Medicine info */}
//                         <div className="min-w-0">

//                           <div className="flex items-center gap-3">

//                             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
//                               💊
//                             </div>

//                             <div>
//                               <h3 className="font-semibold text-slate-900">
//                                 {medicine.name}
//                               </h3>

//                               <p className="mt-1 text-xs text-slate-500">
//                                 Medicine #{medicine.id}
//                               </p>
//                             </div>

//                           </div>

//                           {medicine.description && (
//                             <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
//                               {medicine.description}
//                             </p>
//                           )}

//                         </div>

//                         {/* Price / Stock */}
//                         <div className="flex shrink-0 gap-3">

//                           <div className="min-w-[100px] rounded-xl bg-slate-50 px-4 py-3">
//                             <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//                               Price
//                             </p>

//                             <p className="mt-1 text-sm font-bold text-slate-900">
//                               ₹{medicine.price}
//                             </p>
//                           </div>

//                           <div className="min-w-[100px] rounded-xl bg-slate-50 px-4 py-3">
//                             <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//                               Stock
//                             </p>

//                             <p className="mt-1 text-sm font-bold text-slate-900">
//                               {medicine.stock}
//                             </p>
//                           </div>

//                         </div>

//                       </div>

//                       {/* Availability */}
//                       <div className="mt-5">

//                         {medicine.is_available ? (
//                           <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
//                             ✓ Available
//                           </span>
//                         ) : (
//                           <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
//                             ✕ Unavailable
//                           </span>
//                         )}

//                       </div>

//                     </div>
//                   ))}

//                 </div>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

//new:
import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";

export default function PharmacyMedicines() {
  const [medicines, setMedicines] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      // Use the pharmacy dashboard list: it contains only THIS pharmacy's
      // medicines (including sold-out ones). The public /medicines/ list
      // returns every pharmacy's available stock.
      const response = await api.get("/api/account/pharmacy/dashboard/");

      setMedicines(response.data?.medicines || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim() || !price || !stock) {
      setError("Please fill in medicine name, price and stock.");
      return;
    }

    if (Number(price) < 0) {
      setError("Price cannot be negative.");
      return;
    }

    if (Number(stock) < 0) {
      setError("Stock cannot be negative.");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/api/account/pharmacy/medicines/", {
        name: name.trim(),
        description: description.trim(),
        price: price,
        stock: Number(stock),
      });

      setSuccess(`${name.trim()} added to your inventory successfully.`);

      setName("");
      setDescription("");
      setPrice("");
      setStock("");

      await fetchMedicines();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Pharmacy Portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Medicine Inventory
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage medicines, prices and available stock.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <div className="flex items-start gap-3">
              <span>⚠️</span>

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

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <div className="flex items-start gap-3">
              <span className="text-emerald-600">✓</span>

              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Inventory updated
                </p>

                <p className="mt-1 text-sm text-emerald-700">
                  {success}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-12">

          {/* ADD MEDICINE */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                    +
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Add Medicine
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Add a medicine to your pharmacy inventory.
                    </p>
                  </div>

                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Medicine Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Paracetamol 500mg"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional medicine description"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 25.00"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Stock
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Adding Medicine..." : "Add Medicine"}
                </button>

              </form>
            </div>
          </div>

          {/* INVENTORY */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Header */}
              <div className="border-b border-slate-200 px-6 py-5">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Your Medicines
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Medicines currently available in your inventory.
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {medicines.length} medicines
                  </span>

                </div>

              </div>

              {/* Loading */}
              {loading ? (
                <div className="px-6 py-16 text-center">

                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

                  <p className="text-sm text-slate-500">
                    Loading medicines...
                  </p>

                </div>
              ) : medicines.length === 0 ? (
                <div className="px-6 py-16 text-center">

                  <div className="mb-4 text-5xl">
                    💊
                  </div>

                  <h3 className="font-semibold text-slate-900">
                    No medicines yet
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Add your first medicine using the form.
                  </p>

                </div>
              ) : (
                <div className="divide-y divide-slate-100">

                  {medicines.map((medicine) => (
                    <div
                      key={medicine.id}
                      className="p-6 transition hover:bg-slate-50"
                    >

                      <div className="flex flex-col justify-between gap-5 md:flex-row">

                        {/* Medicine info */}
                        <div className="min-w-0">

                          <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                              💊
                            </div>

                            <div>
                              <h3 className="font-semibold text-slate-900">
                                {medicine.name}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                Medicine #{medicine.id}
                              </p>
                            </div>

                          </div>

                          {medicine.description && (
                            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                              {medicine.description}
                            </p>
                          )}

                        </div>

                        {/* Price / Stock */}
                        <div className="flex shrink-0 gap-3">

                          <div className="min-w-[100px] rounded-xl bg-slate-50 px-4 py-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Price
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-900">
                              ₹{medicine.price}
                            </p>
                          </div>

                          <div className="min-w-[100px] rounded-xl bg-slate-50 px-4 py-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Stock
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-900">
                              {medicine.stock}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* Availability */}
                      <div className="mt-5">

                        {medicine.is_available ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            ✓ Available
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                            ✕ Unavailable
                          </span>
                        )}

                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}