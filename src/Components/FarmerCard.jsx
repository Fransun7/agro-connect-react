import { useNavigate } from "react-router-dom";

function FarmerCard({ farmersData, onViewProduce }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[#10B981]/30 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20">
      <div className="h-48 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src={farmersData.image}
          alt={farmersData.name}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-[var(--text)] text-base">{farmersData.name}</h3>
            <span className="inline-block bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-1">
              ✓ Verified
            </span>
          </div>
        </div>

        <div className="text-sm text-[var(--muted)] flex flex-col gap-1.5">
          <span className="flex items-center gap-2"><span>📍</span> {farmersData.location}</span>
          <span className="flex items-center gap-2"><span>🏡</span> {farmersData.farmName}</span>
          {farmersData.primaryProduce && (
            <span className="flex items-center gap-2"><span>🌾</span> {farmersData.primaryProduce}</span>
          )}
        </div>

        <button
          onClick={() => navigate(`/order/${farmersData.id}`)}
          className="w-full bg-[#10B981] hover:bg-[#059669] text-[#0F172A] font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#10B981]/20"
        >
          View Produce →
        </button>
      </div>
    </div>
  );
}

export default FarmerCard;
