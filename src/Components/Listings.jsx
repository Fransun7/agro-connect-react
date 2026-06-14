import { useState } from "react";

import {
  currentRole,
  isFarmer,
  initialListings,
  farmerOrders,
  buyerOrders,
} from "../data/dashboardData";

function Listings() {
  // getting the user details
  const savedUser = JSON.parse(localStorage.getItem("theRegisteredUser"));
  const isFarmer = savedUser?.role === "Farmer";
  const userEmail = savedUser?.email;

  const [showForm, setShowForm] = useState(false);

  // reading listings from local storage
  const [listings, setListings] = useState(() => {
    const globalProducts =
      JSON.parse(localStorage.getItem("allProducts")) || initialListings;
    return globalProducts.filter((item) => item.farmerEmail === userEmail);
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    quantity: "",
    image: "",
  });
  function handleChange(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }
  function handleAddProduct() {
    if (!newProduct.price || !newProduct.name) {
      alert("please fill in product price and name!");
      return;
    }
    const newItem = {
      ...newProduct,
      // id: listings.length + 1,
      // price: Number(newProduct.price),
      // quantity: Number(newProduct.quantity),
      id: Date.now(), // Unique identifier timestamp
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
      farmerEmail: userEmail, // Link to this specific account
      farmerName: savedUser?.fullName || "Anonymous Farmer",
      location: savedUser?.farmLocation || "Unknown Location",
    };

    const globalProducts =
      JSON.parse(localStorage.getItem("allProducts")) || initialListings;
    const updatedGlobal = [...globalProducts, newItem];
    localStorage.setItem("allProducts", JSON.stringify(updatedGlobal));

    setListings([...listings, newItem]);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      unit: "",
      quantity: "",
      image: "",
    });
    setShowForm(false);
  }

  function handleDelete(id) {
    setListings(listings.filter((item) => item.id !== id));

    const globalProducts =
      JSON.parse(localStorage.getItem("allProducts")) || [];
    const updatedGlobal = globalProducts.filter((item) => item.id !== id);
    localStorage.setItem("allProducts", JSON.stringify(updatedGlobal));
  }
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#1A5C2A]">Listings</h2>
      {isFarmer && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#1A5C2A]">My Listings</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#1A5C2A] hover:bg-green-800 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all"
            >
              Add Product
            </button>
          </div>
          {/* product form */}
          {showForm && (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["name", "category", "unit"].map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={newProduct[field]}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#2F6B3F] transition-all"
                  />
                </div>
              ))}
              {["price", "quantity"].map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    type="number"
                    placeholder={`Enter ${field}`}
                    onChange={handleChange}
                    value={newProduct[field]}
                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#2F6B3F] transition-all"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1 mt-2">
                <label className="text-xs font-semibold text-gray-600 text-left">
                  Product Image URL (Optional)
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="Paste an image link address (e.g. https://...)"
                  value={newProduct.image}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2F6B3F]"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  onClick={handleAddProduct}
                  className="w-full bg-[#1A5C2A] hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  Save Product
                </button>
              </div>
            </div>
          )}
          {/* listing grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {listings.map((item) => (
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
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-600 text-xs font-semibold transition-colors"
                  >
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
