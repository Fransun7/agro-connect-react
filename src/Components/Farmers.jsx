import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/products";
import ProductCard from "./ProductCard";
import { farmersData } from "../data/farmers";
import FarmersCard from "./FarmerCard";
import { farmerListings } from "../data/listings";
import { supabase } from "../supabaseClient";
import { useEffect } from "react";

function Farmers({ searchTerm }) {
  const navigate = useNavigate();
  const [selectedListing, setSelectedListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "Farmer");

      if (error) {
        console.error("Error fetching farmers:", error.message);
      } else {
        setFarmers(data);
        console.log(data);
      }

      setLoading(false);
    };

    fetchFarmers();
  }, []);

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-deep)] border-b border-[var(--color-primary)]/20 px-5 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-2">
            Our Network
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] tracking-tight mb-1">
            Verified Farmers
          </h1>
          <p className="text-[var(--muted)] text-sm">
            Browse verified <span className="text-[var(--color-accent)]">✓</span> farmers
            across Nigeria and order fresh produce directly from the source.
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <svg
            className="animate-spin h-10 w-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {/* Farmer grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {farmers.map((farmer) => (
            <FarmersCard key={farmer.id} farmers={farmer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Farmers;
