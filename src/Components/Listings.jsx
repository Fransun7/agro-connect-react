import {
  currentRole,
  isFarmer,
  initialListings,
  farmerOrders,
  buyerOrders,
} from "../data/dashboardData";

function Listings() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#1A5C2A]">Listings</h2>
      {isFarmer && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#1A5C2A]">My Listings</h2>
            <button className="bg-[#1A5C2A] hover:bg-green-800 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all">
              Add Product
            </button>
          </div>
          {/* listing grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {initialListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <span className="text-xs text-white bg-[#2F6B3F] px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <button className="text-red-400 hover:text-red-600 text-xs font-semibold transition-colors">
                    Delete
                  </button>
                </div>
                <p className="text-[#FFA02E] font-bold text-sm">
                  ₦{item.price.toLocaleString()} / {item.unit}
                </p>
                <p className="text-gray-400 text-xs">
                  📦 {item.quantity} {item.unit}s available
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listings;
