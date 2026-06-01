import image3 from "../assets/hero-section-image-3.jpg";
import StatsCard from "./StatsCard";
import Listings from "./Listings";
import Settings from "./Settings";
import {
  currentRole,
  isFarmer,
  initialListings,
  farmerOrders,
  buyerOrders,
} from "../data/dashboardData";
import { useState } from "react";

const Order = isFarmer ? farmerOrders : buyerOrders;

function Overview() {
  const [listings, setListings] = useState(initialListings);
  const totalEarnings = Order.filter((o) => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0)

  // creating an object that takes the produce sales of the farmer and saving it into a variable
  const produceSales = Order.reduce((acc, o) => {
    if (o.status !== "Cancelled") {
      acc[o.product] = (acc[o.product] || 0) + o.total;
      
    } 
    return acc;
  }, {})
  console.log("produceSales result:", produceSales)
 
  // summing up the value of the produceSales object to get the total revenue
  const totalSalesRevenue = Object.values(produceSales).reduce((sum, val) => sum + val, 0);

  const LOW_STOCK_LIMIT = 20;

    return (
    <div className="flex flex-col gap-8 p-3">
      <h2 className="text-xl font-bold text-[#1A5C2A]">Overview</h2>
      <div className="border-4 border-black/5 p-2 rounded-lg">
        
        {/*  Row 1, Welcome Banner */}
<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-green-800 p-6 md:p-8 text-white shadow-xl shadow-emerald-950/20">
  
  {/* Modern Aesthetic: Decorative translucent glowing blobs behind text */}
  {/* <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"></div>
  <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-yellow-500/5 blur-3xl"></div> */}

  {/* Two-column layout grid: Stacks on mobile, splits 70/30 on desktop */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 items-center">
    
    {/* Left Column: Greeting, Farm Name & Status */}
    <div className="flex flex-col items-start text-left">
      {/* Translucent Capsule Badge */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/20 mb-4 uppercase tracking-widest">
        🧑‍🌾 Verified Partner
      </span>
      
      {/* Title (Uses Outfit Font automatically!) */}
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-white">
        Welcome back, Tunde!
      </h1>
      
      {/* Sub-details row with location and farm */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-emerald-200/80 mb-4 font-medium">
        <span>📍 Millet Spot Farm</span>
        <span className="h-1 w-1 rounded-full bg-emerald-400/50 hidden sm:inline"></span>
        <span>Akure, Ondo State</span>
      </div>

      {/* Dynamic Status message */}
      <p className="text-sm md:text-base text-emerald-100/90 max-w-xl leading-relaxed">
        Your digital shop is online and active. You have <strong className="text-emerald-300 font-bold">3 crops</strong> listed for sale and <strong className="text-yellow-400 font-bold">1 pending order</strong> waiting for your review.
      </p>
    </div>

    {/* Right Column: Sleek Frosted Glass Widget (Hidden on mobile for space) */}
    <div className="hidden md:flex flex-col justify-between rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/10 h-full min-h-35 shadow-inner">
      <div className="text-left">
        <p className="text-xs uppercase tracking-wider text-emerald-300 font-bold mb-1">Akure Market Alert</p>
        <p className="text-xs text-emerald-100/80 leading-snug">
          🌱 Grains and Tubers are in peak demand this weekend across Ondo hubs.
        </p>
      </div>
      <div className="mt-4 border-t border-white/10 pt-3 text-left">
        <span className="text-xs font-semibold text-emerald-200">
          📅 {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>

  </div>
</div>
       

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-8">
          {isFarmer ? (
            <>
              

              <StatsCard
    label="Active Listings"
    value={listings.length}
    icon="🌾"
    iconColor="bg-emerald-50 text-emerald-600 border border-emerald-100/50"
  />
  {/* Card 2: Total Orders (Blue Colorway) */}
  <StatsCard
    label="Total Orders"
    value={Order.length}
    icon="📦"
    iconColor="bg-blue-50 text-blue-600 border border-blue-100/50"
  />
  {/* Card 3: Pending Orders (Amber Colorway) */}
  <StatsCard
    label="Pending Approvals"
    value={Order.filter((o) => o.status === "Pending").length}
    icon="⏳"
    iconColor="bg-amber-50 text-amber-600 border border-amber-100/50"
  />
  {/* Card 4: Net Earnings (Green Colorway - Calculated Dynamically!) */}
  <StatsCard
    label="Net Earnings"
    value={`₦${totalEarnings.toLocaleString()}`}
    icon="💰"
    iconColor="bg-green-50 text-green-600 border border-green-100/50"
  />
            </>
          ) : (
            <>
              <StatsCard
                label="Orders Placed"
                value={buyerOrders.length}
                icon="🛒"
                bg="bg-[#1A5C2A]"
              />
              <StatsCard
                label="Pending"
                value={buyerOrders.filter((o) => o.status === "Pending").length}
                icon="⏳"
                bg="bg-[#FFA02E]"
              />
              <StatsCard
                label="Delivered"
                value={
                  buyerOrders.filter((o) => o.status === "Delivered").length
                }
                icon="✅"
                bg="bg-green-500"
              />
              <StatsCard
                label="Total Spent"
                value={1}
                icon="💳"
                bg="bg-blue-500"
              />
            </>
          )}
        </div>
        {/* ==================== ROW 3: INSIGHTS PANEL ==================== */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

  {/* ---- LEFT PANEL: Top Selling Crops ---- */}
  <div className="bg-white border border-slate-100/80 rounded-3xl p-6 shadow-sm">
    
    {/* Panel Header */}
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-sm font-bold text-slate-700">
        📈 Top Selling Crops
      </h2>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        By Revenue
      </span>
    </div>

    {/* Crop List */}
    <div className="flex flex-col gap-4">
      {/* takes my object "produceSales" and passed into an array of pairs */}
      {Object.entries(produceSales)
      // sort the items in the array from biggest to smallest 
        .sort((a, b) => b[1] - a[1])
        // goes intp the each array pair, give it a name for easy access
        .map(([cropName, cropTotal]) => {
          const percentage = Math.round((cropTotal / totalSalesRevenue) * 100);
          return (
            <div key={cropName}>
              {/* Crop name + value row */}
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-slate-700">
                  {cropName}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700">
                    ₦{cropTotal.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {percentage}%
                  </span>
                </div>
              </div>
              {/* Progress bar track */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                {/* Progress bar fill (width is the percentage!) */}
                <div
                  className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  </div>

  {/* ---- RIGHT PANEL: Stock Alerts ---- */}
  <div className="bg-white border border-slate-100/80 rounded-3xl p-6 shadow-sm">

    {/* Panel Header */}
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-sm font-bold text-slate-700">
        🚨 Stock Levels
      </h2>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Live Inventory
      </span>
    </div>

    {/* Stock list */}
    <div className="flex flex-col gap-4">
      {listings.map((item) => {
        const isLow = item.quantity <= LOW_STOCK_LIMIT;
        return (
          <div key={item.id} className="flex items-center justify-between gap-4">
            
            {/* Crop Name + Unit */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700">
                {item.name}
              </span>
              <span className="text-xs text-slate-400">
                {item.quantity} {item.unit}s remaining
              </span>
            </div>

            {/* Dynamic Status Badge */}
            <span
              className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                isLow
                  ? "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
                  : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
              }`}
            >
              {isLow ? "⚠️ Low Stock" : "✅ Healthy"}
            </span>

          </div>
        );
      })}
    </div>
  </div>

</div>

       
      </div>
    </div>
  );
}

export default Overview;
