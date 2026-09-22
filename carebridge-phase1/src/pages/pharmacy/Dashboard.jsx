import { useEffect, useState } from "react";
import api from "../../services/api";

const PharmacyDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/account/pharmacy/dashboard/");

      setDashboard(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
        "Failed to load pharmacy dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">💊</div>
          <p className="text-slate-600 font-medium">
            Loading pharmacy dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const { pharmacy, summary, medicines, orders } = dashboard;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-blue-600 mb-1">
            Pharmacy Portal
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {pharmacy.pharmacy_name} 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your medicines and pharmacy orders from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Total Medicines */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Medicines
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {summary.total_medicines}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                💊
              </div>
            </div>
          </div>

          {/* Available Medicines */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Available Medicines
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {summary.available_medicines}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">
                ✓
              </div>
            </div>
          </div>

          {/* Low Stock */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Low Stock
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {summary.low_stock_medicines}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
                ⚠️
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Orders
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {summary.total_orders}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                📦
              </div>
            </div>
          </div>

        </div>

        {/* Order Statistics */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Order Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Pending */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Pending Orders
              </p>

              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {summary.pending_orders}
              </p>
            </div>

            {/* Confirmed */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Confirmed Orders
              </p>

              <p className="text-2xl font-bold text-green-600 mt-2">
                {summary.confirmed_orders}
              </p>
            </div>

            {/* Rejected */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Rejected Orders
              </p>

              <p className="text-2xl font-bold text-red-600 mt-2">
                {summary.rejected_orders}
              </p>
            </div>

          </div>
        </div>

        {/* Recent Medicines */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Medicine Inventory
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Recently added medicines in your pharmacy.
            </p>
          </div>

          <div className="divide-y divide-slate-100">

            {medicines.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No medicines added yet.
              </div>
            ) : (
              medicines.slice(0, 5).map((medicine) => (
                <div
                  key={medicine.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                      💊
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {medicine.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Medicine #{medicine.id}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-6 text-sm">

                    <div>
                      <p className="text-slate-400">
                        Price
                      </p>

                      <p className="font-semibold text-slate-900">
                        ₹{Number(medicine.price).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Stock
                      </p>

                      <p
                        className={`font-semibold ${
                          medicine.stock <= 10
                            ? "text-orange-600"
                            : "text-slate-900"
                        }`}
                      >
                        {medicine.stock}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        medicine.is_available
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {medicine.is_available
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Orders
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Latest medicine orders received by your pharmacy.
            </p>
          </div>

          <div className="divide-y divide-slate-100">

            {orders.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No orders received yet.
              </div>
            ) : (
              orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                >

                  <div>
                    <p className="font-semibold text-slate-900">
                      Order #{order.id}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Patient: {order.patient_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Medicine
                    </p>

                    <p className="font-medium text-slate-900">
                      {order.medicine_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Quantity
                    </p>

                    <p className="font-medium text-slate-900">
                      {order.quantity}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Total
                    </p>

                    <p className="font-semibold text-slate-900">
                      ₹{Number(order.total_price).toFixed(2)}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                      order.status === "PENDING"
                        ? "bg-yellow-50 text-yellow-700"
                        : order.status === "CONFIRMED"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default PharmacyDashboard;