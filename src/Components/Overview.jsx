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
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-xl font-bold text-[#1A5C2A]">Overview</h2>
      <div className="border-4 border-black/5 p-2">
        <h3 className="text-white font-semibold p-2 ml-2 bg-[#1A5C2A] flex w-40 justify-center rounded-full mt-4">
          Farmer Dashboard
        </h3>
        {/* image + text section */}
        <div className="flex flex-col object-cover overflow-hidden items-center   p-2 relative mt-8">
          <img className="rounded-lg" src={image3} alt="" />
          <div className="absolute top-10 md:top-20  text-white ">
            <h1 className="text-center text-xl  md:text-4xl font-bold mb-5">
              Welcome to your Dashboard
            </h1>
            <p className="text-center">
              Manage your listings and track incoming orders
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3">
          {isFarmer ? (
            <>
              <StatsCard
                label="Total Listing"
                bg="bg-[#1A5C2A]"
                value={listings.length}
                icon="🌾"
              />

              <StatsCard
                label="Total Orders"
                bg="bg-[#FFA02E]"
                value={Order.length}
                icon="🌾"
              />

              <StatsCard
                label="Pending Orders"
                bg="bg-blue-500"
                value={Order.filter((o) => o.status === "Pending").length}
                icon="🌾"
              />

              <StatsCard
                label="Total Earnings"
                bg="bg-[#1A5C2A]"
                value={1}
                icon="🌾"
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

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {isFarmer ? (
            <>
              <StatsCard
                label="Total Listings"
                value={listings.length}
                icon="🌾"
                bg="bg-[#1A5C2A]"
              />
              <StatsCard
                label="Total Orders"
                value={farmerOrders.length}
                icon="📦"
                bg="bg-[#FFA02E]"
              />
              <StatsCard
                label="Pending Orders"
                value={
                  farmerOrders.filter((o) => o.status === "Pending").length
                }
                icon="⏳"
                bg="bg-blue-500"
              />
              <StatsCard
                label="Total Earnings"
                value={`₦${farmerOrders
                  .filter((o) => o.status === "Delivered")
                  .reduce((sum, o) => sum + o.total, 0)
                  .toLocaleString()}`}
                icon="💰"
                bg="bg-green-500"
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
                value={`₦${buyerOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`}
                icon="💳"
                bg="bg-blue-500"
              />
            </>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Overview;
