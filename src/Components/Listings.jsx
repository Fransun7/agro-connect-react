import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../supabaseClient";

import {
  currentRole,
  isFarmer,
  initialListings,
  farmerOrders,
  buyerOrders,
} from "../data/dashboardData";

function Listings() {
  const { currentUser } = useOutletContext();
  const isFarmer = currentUser?.role === "Farmer";
  const userEmail = currentUser?.email;
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [newProductLoading, setNewProductLoading] = useState(false);

  // FETCHING FARMER LISTED PRODUCT AND UPDATING IT TO LOCAL STATE
  useEffect(() => {
    const fetchFarmerListings = async () => {
      if (!userEmail) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("farmer_email", userEmail);

      if (error) {
        alert("Error fetching listings:", error.message);
      } else if (data) {
        const mappedListings = data.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          unit: item.unit,
          quantity: Number(item.quantity),
          image: item.image,
          farmerEmail: item.farmer_email,
          farmerName: item.farmer_name,
          location: item.location,
        }));
        setListings(mappedListings);
      }
      setLoading(false);
    };

    fetchFarmerListings();
  }, [userEmail]);

  // WHAT NEW PRODUCT CONTAINS
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

  // ADDING PRODUCT FUNCTIONALITY
  async function handleAddProduct() {
    if (!newProduct.price || !newProduct.name) {
      alert("please fill in product price and name!");
      return;
    }
    setNewProductLoading(true);

    let imageUrl = null;
    // UPLAODING PRODUCT IMAGE
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("farmers-product-images")
        .upload(fileName, imageFile);

      //  GETTING THE URL
      const { data: publicUrl } = supabase.storage
        .from("farmers-product-images")
        .getPublicUrl(fileName);

      //  I NEED TO SAVE THE URL INTO A VARIABLE I CAN USE
      imageUrl = publicUrl.publicUrl;

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message);
        setNewProductLoading(false);
        return;
      }
    }

    // INSERTS PRODUCT DATA TO DATABASE
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price),
          unit: newProduct.unit,
          quantity: Number(newProduct.quantity),
          image: imageUrl || null,
          farmer_email: userEmail,
          farmer_name: currentUser?.fullName || "Anonymous Farmer",
          location: currentUser?.farmLocation || "Unknown Location",
        },
      ])
      .select();

    if (error) {
      alert("Error saving product to cloud: " + error.message);
      setNewProductLoading(false);
      return;
    }

    // THE SELECTED DATA THAT HAS BEEN INSERTED TO DATABASE NOW MAPPED THROUGH AND SAVED AS A NEW OBJECT
    if (data && data[0]) {
      const savedItem = {
        id: data[0].id,
        name: data[0].name,
        category: data[0].category,
        price: Number(data[0].price),
        unit: data[0].unit,
        quantity: Number(data[0].quantity),
        image: data[0].image,
        farmerEmail: data[0].farmer_email,
        farmerName: data[0].farmer_name,
        location: data[0].location,
      };

      setListings([...listings, savedItem]);
    }

    setNewProduct({
      name: "",
      category: "",
      price: "",
      unit: "",
      quantity: "",
      image: "",
    });
    setNewProductLoading(false);
    setShowForm(false);
  }

  // DELETE THE PRODUCT FROM DATABASE AND UPDATE THE UI
  async function handleDelete(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      alert("Could not remove item from database: " + error.essage);
      return;
    }

    setListings(listings.filter((item) => item.id !== id));
  }

  const handleFile = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="p-6">
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
                  Insert an image for the product.
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Insert an image"
                  onChange={handleFile}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2F6B3F]"
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <button
                  onClick={handleAddProduct}
                  disabled={newProductLoading}
                  className="w-full bg-[#1A5C2A] hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                  {newProductLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Saving Product...</span>
                    </>
                  ) : (
                    "Save Product"
                  )}
                </button>

                <button
                  onClick={() => setShowForm(false)}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {loading ? (
            <div className="text-center py-12 text-gray-500 font-medium">
              🔄 Loading your fresh farm produce listings from cloud...
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              📦 No active listings found. Click "Add Product" to create your
              first one!
            </div>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

export default Listings;
