import { useState } from "react";
import { farmerOrders } from "../data/dashboardData";

function Orders() {
  // Figuring out the user details
  const savedUser = JSON.parse(localStorage.getItem("theRegisteredUser"));
  const isFarmer = savedUser?.role === "Farmer";
  const userEmail = savedUser?.email;

  const [orders, setOrders] = useState(() => {
    const globalOrders =
      JSON.parse(localStorage.getItem("allOrders")) || farmerOrders;

    // filtering globalOrders to get the orders that is directed to the specific farmer
    return isFarmer
      ? globalOrders.filter((order) => order.farmerEmail === userEmail)
      : globalOrders.filter((order) => order.buyerEmail === userEmail);
  });

  function updateOrderStatus(orderId, newStatus) {
    // Pull latest global stack
    const globalOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

    // Map over it to change the status of the matching order ID
    const updatedGlobal = globalOrders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });

    // Save updated full stack back to the global LocalStorage "database"
    localStorage.setItem("allOrders", JSON.stringify(updatedGlobal));

    // Update local state so UI instantly re-renders
    setOrders(
      isFarmer
        ? updatedGlobal.filter((order) => order.farmerEmail === userEmail)
        : updatedGlobal.filter((order) => order.buyerEmail === userEmail),
    );

    // Crucial: Fire custom event to tell the Overview tab to update its calculations immediately!
    window.dispatchEvent(new Event("authUpdate"));
  }

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
                    ? `Buyer: ${item.buyerName || item.buyerEmail}`
                    : `Farmer: ${item.farmerName || "Agro Farmer"}`}
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
