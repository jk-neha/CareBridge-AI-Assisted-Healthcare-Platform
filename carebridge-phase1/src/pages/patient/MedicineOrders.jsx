// import { useEffect, useState } from "react";
// import api, { getErrorMessage } from "../../services/api";

// export default function MedicineOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadOrders = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get(
//         "/api/account/my-medicine-orders/"
//       );

//       setOrders(response.data);
//     } catch (err) {
//       setError(
//         getErrorMessage(
//           err,
//           "Unable to load your medicine orders."
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "CONFIRMED":
//         return "bg-green-100 text-green-700";

//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";

//       case "REJECTED":
//         return "bg-red-100 text-red-700";

//       default:
//         return "bg-slate-100 text-slate-600";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <p className="text-slate-500">
//           Loading your medicine orders...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-6">

//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">
//           Medicine Orders 📦
//         </h1>

//         <p className="mt-2 text-slate-500">
//           Track your medicine orders and their status.
//         </p>
//       </div>

//       {error && (
//         <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       {!error && orders.length === 0 && (
//         <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

//           <div className="text-4xl">📦</div>

//           <h2 className="mt-4 text-xl font-semibold text-slate-900">
//             No medicine orders yet
//           </h2>

//           <p className="mt-2 text-sm text-slate-500">
//             Medicines you order will appear here.
//           </p>

//         </div>
//       )}

//       <div className="space-y-4">

//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
//           >

//             <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

//               <div>

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
//                     💊
//                   </div>

//                   <div>

//                     <h2 className="text-xl font-bold text-slate-900">
//                       {order.medicine_name}
//                     </h2>

//                     <p className="text-sm text-slate-500">
//                       Pharmacy: {order.pharmacy_name}
//                     </p>

//                   </div>

//                 </div>

//                 <div className="mt-5 grid gap-4 sm:grid-cols-2">

//                   <div>
//                     <p className="text-xs font-semibold text-slate-500">
//                       Quantity
//                     </p>

//                     <p className="mt-1 font-medium text-slate-900">
//                       {order.quantity}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs font-semibold text-slate-500">
//                       Total Price
//                     </p>

//                     <p className="mt-1 font-semibold text-slate-900">
//                       ₹{order.total_price}
//                     </p>
//                   </div>

//                 </div>

//               </div>

//               <span
//                 className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
//                   order.status
//                 )}`}
//               >
//                 {order.status}
//               </span>

//             </div>

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }

//new

import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";

export default function MedicineOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/account/my-medicine-orders/"
      );

      setOrders(response.data);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to load your medicine orders."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading your medicine orders...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Medicine Orders 📦
        </h1>

        <p className="mt-2 text-slate-500">
          Track your medicine orders and their status.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && orders.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="text-4xl">📦</div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No medicine orders yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Medicines you order will appear here.
          </p>

        </div>
      )}

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                    💊
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      {order.medicine_name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      Pharmacy: {order.pharmacy_name}
                    </p>

                  </div>

                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Quantity
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {order.quantity}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Total Price
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      ₹{order.total_price}
                    </p>
                  </div>

                </div>

              </div>

              <OrderStatusBadge status={order.status} className="w-fit" />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}