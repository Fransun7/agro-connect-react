import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="w-72 md:w-80 shrink-0 snap-start bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden hover:border-[#10B981]/30 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20">
      {produce.image && produce.image.trim() !== "" ? (
        <img
          src={produce.image}
          alt={produce.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-[#0F172A] border-b border-[#334155] flex flex-col items-center justify-center gap-2 select-none">
          <div className="w-14 h-14 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-3xl">🌾</div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">No Image Provided</span>
        </div>
      )}

      <div className="p-4 flex flex-col gap-2.5">
        <span className="text-xs font-bold text-[#0F172A] bg-[#10B981] px-2.5 py-1 rounded-full w-fit">
          {produce.category}
        </span>

        <h2 className="text-base font-bold text-[#F8FAFC] leading-tight">{produce.name}</h2>

        <p className="text-[#F59E0B] font-bold text-base">
          ₦{produce.price.toLocaleString()} <span className="text-[#94A3B8] font-normal text-sm">/ {produce.unit}</span>
        </p>

        <div className="text-sm text-[#94A3B8] flex flex-col gap-1">
          <span>🧑‍🌾 {produce.farmerName}</span>
          <span>📍 {produce.location}</span>
          <span>📦 {produce.availableQuantity} {produce.unit}s available</span>
        </div>

        <button
          onClick={handleOrderClick}
          className="mt-1 bg-[#10B981] hover:bg-[#059669] text-[#0F172A] font-bold text-sm px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-[#10B981]/20"
        >
          Order Now
        </button>

        {orderAuth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="w-14 h-14 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔒
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">Sign in Required</h3>
              <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed">
                Please log in before placing an order for{" "}
                <span className="font-semibold text-[#F8FAFC]">"{produce?.name || "this item"}"</span>.
              </p>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-[#0F172A] font-bold py-3 rounded-2xl transition-all"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => setOrderAuth(false)}
                  className="w-full bg-[#334155] hover:bg-[#475569] text-[#94A3B8] font-bold py-3 rounded-2xl transition-all"
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
