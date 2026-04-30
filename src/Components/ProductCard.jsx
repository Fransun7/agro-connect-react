import { useNavigate } from "react-router-dom";
import Order from "./Order";

function ProductCard({ productData }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={productData.image}
        alt={productData.name}
        className="w-full h-48 object-cover"
      />
      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category tag */}
        <span className="text-xs font-semibold text-white bg-[#2F6B3F] px-2 py-1 rounded-full w-fit">
          {productData.category}
        </span>

        {/* Product name */}
        <h2 className="text-lg font-bold text-gray-800">{productData.name}</h2>

        {/* Price */}
        <p className="text-[#FFA02E] font-bold text-base">
          ₦{productData.price.toLocaleString()} / {productData.unit}
        </p>

        {/* Farmer details */}
        <div className="text-sm text-gray-500 flex flex-col gap-1">
          <span>🧑‍🌾 {productData.farmerName}</span>
          <span>📍 {productData.location}</span>
          <span>
            📦 {productData.quantity} {productData.unit}s available
          </span>
        </div>

        {/* Order button */}
        <button
          onClick={() => navigate(`/order/${productData.id}`)}
          className="mt-2 bg-[#2F6B3F] hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
