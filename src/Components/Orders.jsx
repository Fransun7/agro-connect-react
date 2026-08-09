import { useState, useEffect } from "react";
import { farmerOrders } from "../data/dashboardData";
import { useAuth } from "./Context/AuthContext";
import { supabase } from "../supabaseClient";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const isFarmer = currentUser?.role === "Farmer";
  const userEmail = currentUser?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return;
      setLoading(false);

      let query = supabase.from("orders").select("*").order("id", { ascending: false });

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
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    if (error) {
      console.error("Error updating status:", error.message);
      alert("Unable to update order status. Please try again.");
      return;
    }
    setOrders((currentOrders) =>
      currentOrders.map((order) => order.id === orderId ? { ...order, status: newStatus } : order)
    );
  }

  window.dispatchEvent(new Event("authUpdate"));

  const statusStyle = (status) => {
    if (status === "Delivered") return "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20";
    if (status === "Pending") return "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20";
    if (status === "Confirmed") return "bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20";
    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl bg-[var(--bg)] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-[var(--text)]">
            {isFarmer ? "Farm Orders" : "My Purchase Orders"}
          </h2>
          <p className="text-[var(--muted)] text-xs mt-0.5">{orders.length} total orders</p>
        </div>
        <span className="text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold px-3 py-1.5 rounded-full border border-[var(--color-primary)]/20">
          {orders.length} orders
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[var(--color-primary)]/20 transition-all duration-200"
            >
              {/* Order info */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-[var(--text)] text-base">{order.product}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight border ${statusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] font-mono">
                  #{order.id} · {order.date || "Today"}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  👤 {isFarmer
                    ? `Buyer: ${order.buyer_name || order.buyer_email}`
                    : `Farmer: ${order.farmer_name || "Agro Farmer"}`}
                </p>
              </div>

              {/* Financial info */}
              <div className="flex flex-col md:items-end gap-1">
                <span className="text-[var(--color-accent)] font-black text-base">
                  ₦{order.total ? order.total.toLocaleString() : "0"}
                </span>
                <span className="text-xs text-[var(--muted)] font-medium">{order.quantity} units</span>
              </div>

              {/* Farmer actions */}
              {isFarmer && (
                <div className="flex items-center gap-2 border-t border-[var(--border)] pt-3 md:border-t-0 md:pt-0 shrink-0">
                  {order.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, "Cancelled")}
                        className="text-xs font-bold text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-xl transition-colors border border-red-500/20"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "Confirmed")}
                        className="text-xs font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--bg)] px-4 py-2 rounded-xl transition-all shadow-md shadow-[var(--color-primary)]/20"
                      >
                        Accept
                      </button>
                    </>
                  )}
                  {order.status === "Confirmed" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "Delivered")}
                      className="text-xs font-bold bg-[var(--color-info)] hover:bg-[var(--color-info-hover)] text-white px-4 py-2 rounded-xl transition-all"
                    >
                      Mark Delivered
                    </button>
                  )}
                  {(order.status === "Delivered" || order.status === "Cancelled") && (
                    <span className="text-xs text-[var(--muted)] italic bg-[var(--border)]/50 px-3 py-1.5 rounded-lg border border-[var(--border)]">
                      Archived
                    </span>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-2xl">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-[var(--muted)] font-medium text-sm">No orders recorded yet on your account.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
