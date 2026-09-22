// import { useEffect, useState } from "react";
// import api from "../../services/api";

// const PharmacyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updatingId, setUpdatingId] = useState(null);
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get("/api/account/pharmacy/orders/");

//       setOrders(response.data);
//     } catch (err) {
//       console.error(err);

//       setError(
//         err.response?.data?.detail ||
//           "Failed to load pharmacy orders."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       setUpdatingId(orderId);
//       setError("");
//       setSuccess("");

//       await api.patch(
//         `/api/account/pharmacy/orders/${orderId}/status/`,
//         {
//           status,
//         }
//       );

//       setSuccess(
//         `Order #${orderId} ${
//           status === "CONFIRMED"
//             ? "confirmed"
//             : "rejected"
//         } successfully.`
//       );

//       await fetchOrders();
//     } catch (err) {
//       console.error(err);

//       setError(
//         err.response?.data?.detail ||
//           "Failed to update order status."
//       );
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-4xl mb-3">📦</div>

//           <p className="text-slate-600 font-medium">
//             Loading pharmacy orders...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">

//         {/* Header */}
//         <div>
//           <p className="text-sm font-medium text-blue-600 mb-1">
//             Pharmacy Portal
//           </p>

//           <h1 className="text-3xl font-bold text-slate-900">
//             Medicine Orders
//           </h1>

//           <p className="text-slate-500 mt-2">
//             Review and manage medicine orders received from patients.
//           </p>
//         </div>

//         {/* Success */}
//         {success && (
//           <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">
//             {success}
//           </div>
//         )}

//         {/* Error */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
//             {error}
//           </div>
//         )}

//         {/* Orders */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

//           <div className="p-6 border-b border-slate-200 flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-bold text-slate-900">
//                 All Orders
//               </h2>

//               <p className="text-sm text-slate-500 mt-1">
//                 {orders.length}{" "}
//                 {orders.length === 1 ? "order" : "orders"} received
//               </p>
//             </div>

//             <button
//               onClick={fetchOrders}
//               className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
//             >
//               Refresh
//             </button>
//           </div>

//           {orders.length === 0 ? (
//             <div className="p-12 text-center">

//               <div className="text-5xl mb-4">
//                 📦
//               </div>

//               <h3 className="text-lg font-semibold text-slate-900">
//                 No orders yet
//               </h3>

//               <p className="text-slate-500 mt-1">
//                 Patient medicine orders will appear here.
//               </p>

//             </div>
//           ) : (
//             <div className="divide-y divide-slate-100">

//               {orders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="p-6"
//                 >

//                   <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

//                     {/* Order information */}
//                     <div className="flex items-start gap-4">

//                       <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
//                         💊
//                       </div>

//                       <div>
//                         <div className="flex items-center gap-3">
//                           <h3 className="font-bold text-slate-900">
//                             Order #{order.id}
//                           </h3>

//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               order.status === "PENDING"
//                                 ? "bg-yellow-50 text-yellow-700"
//                                 : order.status === "CONFIRMED"
//                                 ? "bg-green-50 text-green-700"
//                                 : "bg-red-50 text-red-700"
//                             }`}
//                           >
//                             {order.status}
//                           </span>
//                         </div>

//                         <p className="text-sm text-slate-500 mt-2">
//                           Patient:{" "}
//                           <span className="font-medium text-slate-700">
//                             {order.patient_name}
//                           </span>
//                         </p>

//                         <p className="text-sm text-slate-500">
//                           {order.patient_email}
//                         </p>
//                       </div>

//                     </div>

//                     {/* Medicine */}
//                     <div>
//                       <p className="text-xs text-slate-400 uppercase tracking-wide">
//                         Medicine
//                       </p>

//                       <p className="font-semibold text-slate-900 mt-1">
//                         {order.medicine_name}
//                       </p>
//                     </div>

//                     {/* Quantity */}
//                     <div>
//                       <p className="text-xs text-slate-400 uppercase tracking-wide">
//                         Quantity
//                       </p>

//                       <p className="font-semibold text-slate-900 mt-1">
//                         {order.quantity}
//                       </p>
//                     </div>

//                     {/* Total */}
//                     <div>
//                       <p className="text-xs text-slate-400 uppercase tracking-wide">
//                         Total
//                       </p>

//                       <p className="font-bold text-slate-900 mt-1">
//                         ₹{Number(order.total_price).toFixed(2)}
//                       </p>
//                     </div>

//                   </div>

//                   {/* Actions */}
//                   {order.status === "PENDING" && (
//                     <div className="mt-5 pt-5 border-t border-slate-100 flex gap-3">

//                       <button
//                         onClick={() =>
//                           updateOrderStatus(
//                             order.id,
//                             "CONFIRMED"
//                           )
//                         }
//                         disabled={updatingId === order.id}
//                         className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                       >
//                         {updatingId === order.id
//                           ? "Updating..."
//                           : "✓ Confirm Order"}
//                       </button>

//                       <button
//                         onClick={() =>
//                           updateOrderStatus(
//                             order.id,
//                             "REJECTED"
//                           )
//                         }
//                         disabled={updatingId === order.id}
//                         className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                       >
//                         {updatingId === order.id
//                           ? "Updating..."
//                           : "✕ Reject Order"}
//                       </button>

//                     </div>
//                   )}

//                 </div>
//               ))}

//             </div>
//           )}

//         </div>

//       </div>
//     </div>
//   );
// };

// export default PharmacyOrders;

import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";

const PharmacyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/account/pharmacy/orders/");

      setOrders(response.data);
    } catch (err) {
      console.error(err);

      setError(
        getErrorMessage(err, "Failed to load pharmacy orders.")
      );
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      setError("");
      setSuccess("");

      await api.patch(
        `/api/account/pharmacy/orders/${orderId}/status/`,
        {
          status,
        }
      );

      setSuccess(
        `Order #${orderId} ${
          status === "CONFIRMED"
            ? "confirmed"
            : "rejected"
        } successfully.`
      );

      await fetchOrders();
    } catch (err) {
      console.error(err);

      // getErrorMessage also reads `message`, which the backend uses for
      // "Only pending orders can be updated."
      setError(
        getErrorMessage(err, "Failed to update order status.")
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">📦</div>

          <p className="text-slate-600 font-medium">
            Loading pharmacy orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-blue-600 mb-1">
            Pharmacy Portal
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Medicine Orders
          </h1>

          <p className="text-slate-500 mt-2">
            Review and manage medicine orders received from patients.
          </p>
        </div>

        {/* Success */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                All Orders
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"} received
              </p>
            </div>

            <button
              onClick={fetchOrders}
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Refresh
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center">

              <div className="text-5xl mb-4">
                📦
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                No orders yet
              </h3>

              <p className="text-slate-500 mt-1">
                Patient medicine orders will appear here.
              </p>

            </div>
          ) : (
            <div className="divide-y divide-slate-100">

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* Order information */}
                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                        💊
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-slate-900">
                            Order #{order.id}
                          </h3>

                          <OrderStatusBadge status={order.status} />
                        </div>

                        <p className="text-sm text-slate-500 mt-2">
                          Patient:{" "}
                          <span className="font-medium text-slate-700">
                            {order.patient_name}
                          </span>
                        </p>

                        <p className="text-sm text-slate-500">
                          {order.patient_email}
                        </p>
                      </div>

                    </div>

                    {/* Medicine */}
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">
                        Medicine
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        {order.medicine_name}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">
                        Quantity
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        {order.quantity}
                      </p>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">
                        Total
                      </p>

                      <p className="font-bold text-slate-900 mt-1">
                        ₹{Number(order.total_price).toFixed(2)}
                      </p>
                    </div>

                  </div>

                  {/* Actions */}
                  {order.status === "PENDING" && (
                    <div className="mt-5 pt-5 border-t border-slate-100 flex gap-3">

                      <button
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            "CONFIRMED"
                          )
                        }
                        disabled={updatingId === order.id}
                        className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {updatingId === order.id
                          ? "Updating..."
                          : "✓ Confirm Order"}
                      </button>

                      <button
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            "REJECTED"
                          )
                        }
                        disabled={updatingId === order.id}
                        className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {updatingId === order.id
                          ? "Updating..."
                          : "✕ Reject Order"}
                      </button>

                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default PharmacyOrders;