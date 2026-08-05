import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/products";
import ProductCard from "./ProductCard";
import { farmersData } from "../data/farmers";
import FarmersCard from "./FarmerCard";
import { farmerListings } from "../data/listings";

function Farmers({ searchTerm }) {
  const navigate = useNavigate();
  const [selectedListing, setSelectedListing] = useState([]);

  const handleFarmerListing = (id) => {
    const matches = farmerListings.filter((Listing) => Listing.id === id);
    setSelectedListing(matches);
    navigate(`/produce/${id}`, { state: { produce: matches } });
  };

  return (
    <div className="bg-[#0F172A] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#065F46] to-[#0a2918] border-b border-[#10B981]/20 px-5 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-2">Our Network</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#F8FAFC] tracking-tight mb-1">
            Verified Farmers
          </h1>
          <p className="text-[#94A3B8] text-sm">
            Browse verified{" "}
            <span className="text-[#F59E0B]">✓</span>{" "}
            farmers across Nigeria and order fresh produce directly from the source.
          </p>
        </div>
      </div>

      {/* Farmer grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {farmersData.map((farmer) => (
            <FarmersCard
              key={farmer.id}
              farmersData={farmer}
              onViewProduce={handleFarmerListing}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Farmers;
