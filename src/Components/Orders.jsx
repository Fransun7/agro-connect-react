import { useState, useEffect } from "react";
import { farmerOrders } from "../data/dashboardData";
import { useAuth } from "./Context/AuthContext";
import { supabase } from "../supabaseClient";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // I NEED TO GET THE USER DETAILS
  const isFarmer = currentUser?.role === "Farmer";
  const userEmail = currentUser?.email;

  // I NEED TO FETCH THE ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return;
      setLoading(false);

      let query = supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false });

      if (isFarmer) {
        query = query.eq("farmer_email", userEmail);
      } else {
        query = query.eq("buyer_email", userEmail);
      }

      const { data, error } = await query;

      if (error) {
        console.log("Unable to fetch orders:", error.message);
        setOrders([]);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [isFarmer, userEmail]);

  async function updateOrderStatus(orderId, newStatus) {
    supabase.from("orders").update({ status: newStatus }).eq("id", orderId);

    if (error) {
      console.error("Error updating status:", error.message);
      alert("Unable to update order status. Please try again.");
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  }

  // Fire custom event to tell the Overview tab to update its calculations immediately!
  window.dispatchEvent(new Event("authUpdate"));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1A5C2A]">
          {isFarmer ? "Manage Farm Orders" : "My Purchase Orders"}
        </h2>
        <span className="text-xs bg-green-50 text-[#1A5C2A] font-bold px-3 py-1 rounded-full border border-green-200">
          Total: {orders.length} orders
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {orders.length > 0 ? (
          orders.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Order Essentials */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-800 text-base">
                    {item.product}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight ${
                      item.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : item.status === "Pending"
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : item.status === "Confirmed"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-rose-50 text-rose-600 border border-rose-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Order ID:{" "}
                  <span className="font-mono text-gray-600">#{item.id}</span> |
                  Date: {item.date || "Today"}
                </p>
                <p className="text-xs text-gray-500">
                  👤{" "}
                  {isFarmer
                    ? `Buyer: ${item.buyer_name || item.buyer_email}`
                    : `Farmer: ${item.farmer_name || "Agro Farmer"}`}
                </p>
              </div>

              {/* Financial Metrics */}
              <div className="flex flex-col md:items-end gap-1">
                <span className="text-[#FFA02E] font-black text-base">
                  ₦{item.total ? item.total.toLocaleString() : "0"}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {item.quantity} units requested
                </span>
              </div>

              {/* Action Operations Machine (Only accessible to Farmers) */}
              {isFarmer && (
                <div className="flex items-center gap-2 border-t pt-3 md:border-t-0 md:pt-0">
                  {item.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(item.id, "Cancelled")}
                        className="text-xs font-bold text-rose-500 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateOrderStatus(item.id, "Confirmed")}
                        className="text-xs font-bold bg-[#1A5C2A] hover:bg-green-800 text-white px-4 py-2 rounded-xl shadow-xs transition-all"
                      >
                        Accept Order
                      </button>
                    </>
                  )}

                  {item.status === "Confirmed" && (
                    <button
                      onClick={() => updateOrderStatus(item.id, "Delivered")}
                      className="text-xs font-bold w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-xs transition-all"
                    >
                      Mark as Delivered
                    </button>
                  )}

                  {(item.status === "Delivered" ||
                    item.status === "Cancelled") && (
                    <span className="text-xs text-gray-400 italic bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      Archived Transaction
                    </span>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
              <i className="fa-solid fa-box-open text-xl"></i>
            </div>
            <p className="text-gray-400 font-medium text-sm">
              No orders recorded yet on your account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
