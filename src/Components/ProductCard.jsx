import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Order from "./Order";
import { farmersData } from "../data/farmers";
import { useAuth } from "./Context/AuthContext";

function ProductCard({ produce }) {
  const [orderAuth, setOrderAuth] = useState(false);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const handleOrderClick = () => {
    if (!isAuth) {
      setOrderAuth(true);
    } else {
      setOrderAuth(false);
      navigate(`/order/${produce.id}`);
    }
  };

  return (
    <div className="w-100 shrink-0 snap-start bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {produce.image && produce.image.trim() !== "" ? (
        <img
          src={produce.image}
          alt={produce.name}
          className="w-full h-50 object-cover"
        />
      ) : (
        /* Sleek CSS Image Placeholder box that draws if the farmer didn't upload a file */
        <div className="w-full h-48 bg-slate-50 border-b border-gray-100 flex flex-col items-center justify-center gap-2 text-slate-300 select-none">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <i className="fa-solid fa-basket-shopping text-xl"></i>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            No Image Provided
          </span>
        </div>
      )}

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category tag */}
        <span className="text-xs font-semibold text-white bg-[#2F6B3F] px-2 py-1 rounded-full w-fit">
          {produce.category}
        </span>

        {/* Product name */}
        <h2 className="text-lg font-bold text-gray-800">{produce.name}</h2>

        {/* Price */}
        <p className="text-[#FFA02E] font-bold text-base">
          ₦{produce.price.toLocaleString()} / {produce.unit}
        </p>

        {/* Farmer details */}
        <div className="text-sm text-gray-500 flex flex-col gap-1">
          <span>🧑‍🌾 {produce.farmerName}</span>
          <span>📍 {produce.location}</span>
          <span>
            📦 {produce.quantity} {produce.unit}s available
          </span>
        </div>

        {/* Order button */}
        <button
          onClick={handleOrderClick}
          className="mt-2 bg-[#2F6B3F] hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300"
        >
          Order Now
        </button>

        {orderAuth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center border border-gray-100 transform transition-all scale-100">
              {/* Lock / Key Icon Circle */}
              <div className="w-16 h-16 bg-emerald-100 text-[#1A5C2A] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
                <i className="fa-solid fa-lock"></i>
              </div>

              {/* Modal Heading & Body Text */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Authentication Required
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Please log in to your account first before placing an order for{" "}
                <span className="font-semibold text-gray-700">
                  "{produce?.name || "this item"}"
                </span>
                .
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-[#1A5C2A] hover:bg-emerald-800 text-white font-bold py-3 rounded-2xl shadow-md transition-all active:scale-95"
                >
                  Go to Login Page
                </button>

                <button
                  onClick={() => setOrderAuth(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-2xl transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
