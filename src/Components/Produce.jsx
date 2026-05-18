// function Produce() {}

// export default Produce;

import { useLocation, Link } from "react-router-dom";
import { farmersData } from "../data/farmers";

function Produce() {
  const location = useLocation();

  // This is where we "unpack" the produce we sent from the previous page
  const produceItems = location.state?.produce || [];

  return (
    <div className="p-8 mt-30 bg-white">
      <Link className="text-green-900" to="/">
        ← Back to Farmers
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-6  text-[#1A5C2A]">
        Farmer's Produce
      </h1>

      <div className="grid grid-cols-1 gap-4 text-[#1A5C2A]">
        {produceItems.map((item, index) => {
          const matched = farmersData.find(
            (farmer) => farmer.farmerId === item.farmerId,
          );
          const displayFarmerName = matched ? matched.name : "Uknown";
          const displayLocation = matched ? matched.location : "Uknown";

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {/* Card Body */}
              <div className="p-4 flex flex-col gap-2">
                {/* Category tag */}
                <span className="text-xs font-semibold text-white bg-[#2F6B3F] px-2 py-1 rounded-full w-fit">
                  {item.category}
                </span>

                {/* Product name */}
                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>

                {/* Price */}
                <p className="text-[#FFA02E] font-bold text-base">
                  ₦{item.price.toLocaleString()} / {item.unit}
                </p>

                {/* Farmer details */}
                <div className="text-sm text-gray-500 flex flex-col gap-1">
                  <span>🧑‍🌾 {displayFarmerName}</span>
                  <span>📍 {displayLocation}</span>
                  <span>
                    📦 {item.quantity} {item.unit}s available
                  </span>
                </div>

                {/* Order button */}
                <button
                  onClick={() => navigate(`/order/${item.id}`)}
                  className="mt-2 bg-[#2F6B3F] hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300"
                >
                  Order Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Produce;
