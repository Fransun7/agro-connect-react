import { useNavigate } from "react-router-dom";
import Order from "./Order";

function FarmerCard({ farmersData, onViewProduce }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Card Body */}
      <div className="p-4 flex flex-col gap-8">
        <div className="flex justify-center">
          {/* <i className="fa-solid fa-circle-user text-[180px]"></i> */}
          <img className="rounded-lgö" src={farmersData.image} alt="image" />
        </div>

        <div>
          {/* Farmer details */}
          <div className="text-sm text-gray-500 flex flex-col gap-1">
            <span>🧑‍🌾 {farmersData.name}</span>
            <span>📍 {farmersData.location}</span>
            <span>🏡 {farmersData.farmName}</span>
          </div>

          <button
            onClick={() => onViewProduce(farmersData.id)}
            onClick={() => navigate(`/order/${farmersData.id}`)}
            className="mt-2 w-full bg-[#2F6B3F] hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300"
          >
            View Farmer Produce
          </button>
        </div>
      </div>
    </div>
  );
}

export default FarmerCard;
