import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { currentRole, isFarmer, initialListings, farmerOrders, buyerOrders } from "../data/dashboardData";

function Listings() {
  const { currentUser } = useOutletContext();
  const isFarmer = currentUser?.role === "Farmer";
  const userEmail = currentUser?.email;
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [newProductLoading, setNewProductLoading] = useState(false);

  useEffect(() => {
    const fetchFarmerListings = async () => {
      if (!userEmail) return;
      setLoading(true);

      const [
        { data: productData, error: productDataError },
        { data: orderData, error: orderDataError },
      ] = await Promise.all([
        supabase.from("products").select("*").eq("farmer_email", userEmail),
        supabase.from("orders").select("product_id, quantity").eq("status", "Delivered"),
      ]);

      if (productDataError || orderDataError) {
        alert("Error fetching listings:", productDataError?.message || orderDataError?.message);
      } else if (productData) {
        const mappedListings = productData.map((item) => {
          const soldQuantity = orderData
            .filter((order) => order.product_id === item.id)
            .reduce((total, order) => total + Number(order.quantity), 0);
          const availableQuantity = Number(item.quantity) - soldQuantity;
          return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: Number(item.price),
            unit: item.unit,
            quantity: Number(item.quantity),
            soldQuantity,
            availableQuantity,
            image: item.image,
            farmerEmail: item.farmer_email,
            farmerName: item.farmer_name,
            location: item.location,
          };
        });
        setListings(mappedListings);
      }
      setLoading(false);
    };
    fetchFarmerListings();
  }, [userEmail]);

  const [newProduct, setNewProduct] = useState({
    name: "", category: "", price: "", unit: "", quantity: "", image: "",
  });

  function handleChange(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }

  async function handleAddProduct() {
    if (!newProduct.price || !newProduct.name) {
      alert("please fill in product price and name!");
      return;
    }
    setNewProductLoading(true);

    let imageUrl = null;
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("farmers-product-images")
        .upload(fileName, imageFile);

      const { data: publicUrl } = supabase.storage.from("farmers-product-images").getPublicUrl(fileName);
      imageUrl = publicUrl.publicUrl;

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message);
        setNewProductLoading(false);
        return;
      }
    }

    const { data, error } = await supabase
      .from("products")
      .insert([{
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        unit: newProduct.unit,
        quantity: Number(newProduct.quantity),
        image: imageUrl || null,
        farmer_email: userEmail,
        farmer_name: currentUser?.fullName || "Anonymous Farmer",
        location: currentUser?.farmLocation || "Unknown Location",
      }])
      .select();

    if (error) {
      alert("Error saving product to cloud: " + error.message);
      setNewProductLoading(false);
      return;
    }

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

    setNewProduct({ name: "", category: "", price: "", unit: "", quantity: "", image: "" });
    setNewProductLoading(false);
    setShowForm(false);
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("Could not remove item from database: " + error.message);
      return;
    }
    setListings(listings.filter((item) => item.id !== id));
  }

  const handleFile = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const inputClass = "border border-[var(--border)] bg-[var(--bg)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#10B981] transition-all placeholder-[var(--subtle)] w-full";

  return (
    <div className="p-4 md:p-6 bg-[var(--bg)] min-h-screen">
      {isFarmer && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">My Listings</h2>
              <p className="text-[var(--muted)] text-xs mt-0.5">{listings.length} products listed</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#10B981] hover:bg-[#059669] text-[#0F172A] text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#10B981]/20 flex items-center gap-2"
            >
              {showForm ? "✕ Cancel" : "+ Add Product"}
            </button>
          </div>

          {/* Add product form */}
          {showForm && (
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <h3 className="sm:col-span-2 text-sm font-bold text-[var(--text)] mb-1">New Product Details</h3>
              {["name", "category", "unit"].map((field) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider capitalize">{field}</label>
                  <input
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={newProduct[field]}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              ))}
              {["price", "quantity"].map((field) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider capitalize">{field}</label>
                  <input
                    name={field}
                    type="number"
                    placeholder={`Enter ${field}`}
                    onChange={handleChange}
                    value={newProduct[field]}
                    className={inputClass}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleFile}
                  className="border border-[var(--border)] bg-[var(--bg)] rounded-xl px-3 py-2 text-sm text-[var(--muted)] outline-none focus:border-[#10B981] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#10B981] file:text-[#0F172A] cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <button
                  onClick={handleAddProduct}
                  disabled={newProductLoading}
                  className="w-full bg-[#10B981] hover:bg-[#059669] disabled:bg-[#334155] disabled:text-[var(--muted)] text-[#0F172A] font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-[#10B981]/20"
                >
                  {newProductLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0F172A]/30 border-t-[#0F172A] rounded-full animate-spin" />
                      Saving Product...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Listings */}
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-16 text-[var(--muted)]">
              <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[#10B981] rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading your farm listings...</span>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-2xl">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-[var(--muted)] font-medium text-sm">No active listings yet.</p>
              <p className="text-[var(--subtle)] text-xs mt-1">Click "Add Product" to create your first listing!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {listings.map((item) => (
                <div key={item.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3 hover:border-[#10B981]/30 transition-all">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded-xl" />
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[var(--text)] text-sm">{item.name}</h3>
                      <span className="text-xs text-[#0F172A] bg-[#10B981] px-2 py-0.5 rounded-full font-bold mt-1 inline-block">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs font-bold px-2 py-1 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-[#F59E0B] font-bold text-sm">
                    ₦{item.price.toLocaleString()} <span className="text-[var(--muted)] font-normal">/ {item.unit}</span>
                  </p>
                  <div className="flex gap-3 text-xs text-[var(--muted)]">
                    <span>📦 {item.quantity} available</span>
                    <span>✓ {item.soldQuantity} sold</span>
                  </div>
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
