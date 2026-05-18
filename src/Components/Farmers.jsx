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

    // navigating
    navigate(`/produce/${id}`, { state: { produce: matches } });
  };

  return (
    <div className="bg-green-800  mt-20 md:mt-20 pt-4 md:pt-20">
      <div className="flex flex-col justify-center items-center p-4">
        <h3 className="text-white text-sm md:text-md font-bold leading-tight drop-shadow-lg">
          Browse verified{" "}
          <span>
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "#FFD700" }}
            ></i>
          </span>{" "}
          farmers across Nigeria{" "}
          {/*and order fresh produce directly from the
          source. */}
        </h3>
      </div>

      {/* product grid */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-6 p-8">
        {farmersData.map((farmer) => (
          <FarmersCard
            key={farmer.id}
            farmersData={farmer}
            onViewProduce={handleFarmerListing}
          />
        ))}
      </div>
    </div>
  );
}

export default Farmers;
