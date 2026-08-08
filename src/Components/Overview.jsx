import { supabase } from "../supabaseClient";
import { useOutletContext } from "react-router-dom";
import StatsCard from "./StatsCard";
import { currentRole, initialListings, farmerOrders, buyerOrders } from "../data/dashboardData";
import { useEffect, useState } from "react";

function Overview() {
  const { currentUser } = useOutletContext();

  const isFarmer = currentUser?.role === "Farmer";
  const userEmail = currentUser?.email;
  const userName = currentUser?.fullName || "Agro User";
  const farmName = currentUser?.farmName || "UNDEFINED";
  const farmLocation = currentUser?.farmLocation || "UNDEFINED";
  const [databaseProducts, setDatabaseProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchSupabaseProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching overview products:", error.message);
      } else if (data) {
        setDatabaseProducts(data);
      }
    };
    fetchSupabaseProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return;
      let query = supabase.from("orders").select("*").order("id", { ascending: false });
      if (isFarmer) {
        query = query.eq("farmer_email", userEmail);
      } else {
        query = query.eq("buyer_email", userEmail);
      }
      const { data, error } = await query;
      if (error) {
        setMyOrders([]);
      } else {
        setMyOrders(data || []);
      }
    };
    fetchOrders();
  }, [isFarmer, userEmail]);

  const myProducts = databaseProducts.filter((item) => item.farmer_email === userEmail);
  const pendingOrders = myOrders.filter((order) => order.status === "Pending");
  const totalEarnings = myOrders.filter((o) => o.status === "Pending").reduce((sum, o) => sum + o.total, 0);

  const produceSales = myOrders.reduce((acc, o) => {
    if (o.status !== "Cancelled") {
      acc[o.product] = (acc[o.product] || 0) + o.total;
    }
    return acc;
  }, {});

  const recentOrders = myOrders.slice(-4).reverse();
  const totalSalesRevenue = Object.values(produceSales).reduce((sum, val) => sum + val, 0);
  const LOW_STOCK_LIMIT = 20;

  const statusColor = (status) => {
    if (status === "Delivered") return "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20";
    if (status === "Pending") return "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20";
    if (status === "Confirmed") return "bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20";
    return "bg-red-500/10 text-red-400 border border-red-500/20";
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-[var(--bg)] min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--text)]">Overview</h2>
        <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">
          {new Date().toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short" })}
        </span>
      </div>

      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#065F46] via-[#0a3d26] to-[var(--bg)] p-6 md:p-8 border border-[#10B981]/20">
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#F59E0B]/5 blur-3xl" />
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-[#10B981]/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 items-center">
          <div className="flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 text-xs font-bold text-[#10B981] mb-4 uppercase tracking-widest">
              {isFarmer ? "🧑‍🌾 Verified Farmer" : "🛒 Verified Buyer"}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2 text-[var(--text)]">
              Welcome back, {userName}
            </h1>
            {isFarmer && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)] mb-4 font-medium">
                <span>📍 {farmName}</span>
                <span className="h-1 w-1 rounded-full bg-[#10B981]/50 hidden sm:inline" />
                <span>{farmLocation}</span>
              </div>
            )}
            <p className="text-sm md:text-base text-[var(--muted)] max-w-xl leading-relaxed">
              {isFarmer ? (
                <>
                  Your digital shop is online and active. You have{" "}
                  <strong className="text-[#10B981]">{myProducts.length}</strong>{" "}
                  products listed and{" "}
                  <strong className="text-[#F59E0B]">{pendingOrders.length} pending orders</strong>{" "}
                  waiting for review.
                </>
              ) : (
                <>Discover premium, fresh farm produce directly from verified local suppliers today.</>
              )}
            </p>
          </div>

          {isFarmer && (
            <div className="hidden md:flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 p-5 h-full min-h-36">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#10B981] font-bold mb-1">{farmLocation} Market Alert</p>
                <p className="text-xs text-[var(--muted)] leading-snug">🌱 Grains and Tubers are in peak demand this weekend across {farmLocation} hubs.</p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-3">
                <span className="text-xs font-semibold text-[var(--muted)]">
                  📅 {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {isFarmer ? (
          <>
            <StatsCard label="Active Listings" value={myProducts.length} icon="🌾" iconColor="bg-[#10B981]/10 text-[#10B981]" />
            <StatsCard label="Total Orders" value={myOrders.length} icon="📦" iconColor="bg-[#0284C7]/10 text-[#0284C7]" />
            <StatsCard label="Pending Approvals" value={myOrders.filter((o) => o.status === "Pending").length} icon="⏳" iconColor="bg-[#F59E0B]/10 text-[#F59E0B]" />
            <StatsCard label="Net Earnings" value={`₦${totalEarnings.toLocaleString()}`} icon="💰" iconColor="bg-[#10B981]/10 text-[#10B981]" />
          </>
        ) : (
          <>
            <StatsCard label="Orders Placed" value={myOrders.length} icon="🛒" iconColor="bg-[#10B981]/10 text-[#10B981]" />
            <StatsCard label="Pending" value={myOrders.filter((o) => o.status === "Pending").length} icon="⏳" iconColor="bg-[#F59E0B]/10 text-[#F59E0B]" />
            <StatsCard label="Delivered" value={myOrders.filter((o) => o.status === "Delivered").length} icon="✅" iconColor="bg-[#10B981]/10 text-[#10B981]" />
            <StatsCard label="Total Spent" value={`₦${totalEarnings.toLocaleString()}`} icon="💳" iconColor="bg-[#0284C7]/10 text-[#0284C7]" />
          </>
        )}
      </div>

      {/* INSIGHTS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Selling Crops */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-[var(--text)]">📈 Top Selling Crops</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">By Revenue</span>
          </div>
          <div className="flex flex-col gap-4">
            {Object.entries(produceSales)
              .sort((a, b) => b[1] - a[1])
              .map(([cropName, cropTotal]) => {
                const percentage = Math.round((cropTotal / totalSalesRevenue) * 100);
                return (
                  <div key={cropName}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-[var(--text)]">{cropName}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#10B981]">₦{cropTotal.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-[var(--muted)]">{percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#334155] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            {Object.keys(produceSales).length === 0 && (
              <p className="text-[var(--muted)] text-sm text-center py-4">No sales data yet</p>
            )}
          </div>
        </div>

        {/* Stock Levels */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-[var(--text)]">🚨 Stock Levels</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Live Inventory</span>
          </div>
          <div className="flex flex-col gap-4">
            {myOrders.map((item) => {
              const isLow = item.quantity <= LOW_STOCK_LIMIT;
              return (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-[var(--text)] truncate">{item.name}</span>
                    <span className="text-xs text-[var(--muted)]">{item.quantity} {item.unit}s remaining</span>
                  </div>
                  <span className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                    isLow ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20" : "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
                  }`}>
                    {isLow ? "⚠️ Low" : "✅ Good"}
                  </span>
                </div>
              );
            })}
            {myOrders.length === 0 && (
              <p className="text-[var(--muted)] text-sm text-center py-4">No inventory data</p>
            )}
          </div>
        </div>
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="font-bold text-[var(--text)] text-sm">Recent Orders</h3>
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">{myOrders.length} Total</span>
        </div>

        <div className="hidden md:grid grid-cols-6 border-b border-[var(--border)] px-5 py-3 bg-[var(--bg)]/50">
          {["Customer", "Product", "Qty", "Total", "Status", "Date"].map((h) => (
            <span key={h} className="text-[10px] font-bold text-[var(--muted)] uppercase">{h}</span>
          ))}
        </div>

        <div className="divide-y divide-[var(--border-2)]">
          {myOrders.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-6 px-5 py-4 items-center hover:bg-[var(--bg)]/30 transition-colors gap-y-2 md:gap-y-0">
              <div className="flex justify-between md:block">
                <span className="md:hidden text-[10px] font-bold text-[var(--muted)] uppercase">Customer</span>
                <span className="text-sm font-semibold text-[var(--text)]">{isFarmer ? item.buyer : "My Order"}</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="md:hidden text-[10px] font-bold text-[var(--muted)] uppercase">Product</span>
                <span className="text-sm text-[var(--muted)]">{item.product}</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="md:hidden text-[10px] font-bold text-[var(--muted)] uppercase">Quantity</span>
                <span className="text-sm text-[var(--muted)] font-medium">{item.quantity} units</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="md:hidden text-[10px] font-bold text-[var(--muted)] uppercase">Total</span>
                <span className="text-sm font-bold text-[#10B981]">₦{item.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="md:hidden text-[10px] font-bold text-[var(--muted)] uppercase">Status</span>
                <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${statusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="flex justify-between md:block md:text-right">
                <span className="md:hidden text-[10px] font-bold text-[var(--muted)] uppercase">Date</span>
                <span className="text-[11px] font-medium text-[var(--muted)] uppercase">{item.date || "Today"}</span>
              </div>
            </div>
          ))}
          {myOrders.length === 0 && (
            <div className="py-12 text-center text-[var(--muted)] text-sm">No orders yet</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Overview;
