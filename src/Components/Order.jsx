import {
  useParams,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { initialListings } from "../data/dashboardData";
import { supabase } from "../supabaseClient";
import { useAuth } from "./Context/AuthContext";

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Set up local state fields
  const [form, setForm] = useState({
    quantity: 1,
    address: "",
    phone: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // I NEED TO FETCH FARMERS PRODUCE FROM SUPABASE
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Enter fetching product:", error.message);
        setProduct(null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 4. Submit Order Action Engine
  async function handleSubmit() {
    if (!form.address || !form.phone) {
      alert("Please fill in your address and phone number");
      return;
    }

    const totalCost = Number(product.price) * Number(form.quantity);

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id: product.id,
          product: product.name,
          price: product.price,
          quantity: Number(form.quantity),
          total: totalCost,
          status: "Pending",
          date: new Date().toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          buyer_email: currentUser.email,
          buyer_name: currentUser.fullName,
          buyer_phone: form.phone,
          delivery_address: form.address,
          additional_note: form.note,

          farmer_email: product?.farmer_email || "admin@agroconnect.com",
          farmer_name: product?.farmer_name || "Agro Farmer",
        },
      ])
      .select();

    if (error) {
      console.error("Error placing order:", error.message);
      alert("Unable to place your order. Please try again.");
      return;
    }
    console.log("Order created successfully:", data);
    // // Create the invoice receipt object
    // const newOrderReceipt = {
    //   id: Date.now(),
    //   product: product.name,
    //   price: product.price,
    //   quantity: Number(form.quantity),
    //   total: totalCost,
    //   status: "Pending",
    //   date: new Date().toLocaleDateString("en-NG", {
    //     day: "numeric",
    //     month: "short",
    //     year: "numeric",
    //   }),

    //   buyerEmail: currentUser.email,
    //   buyerName: currentUser.fullName,
    //   buyerPhone: form.phone,
    //   deliveryAddress: form.address,
    //   additionalNote: form.note,

    //   farmerEmail: product?.farmerEmail || "admin@agroconnect.com",
    //   farmerName: product?.farmerName || "Agro Farmer",
    // };

    // Commit to the global orders timeline storage

    // Open the success pop-up card state
    setSubmitted(true);

    // Sync metrics across the app
    window.dispatchEvent(new Event("authUpdate"));

    // Smoothly redirect to dashboard after 3.5 seconds
    setTimeout(() => {
      navigate("/dashboard/orders");
    }, 3500);
  }

  // I NEED TO HANDLE LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-gray-50">
        <svg
          className="animate-spin h-10 w-10 text-[#1A5C2A]"
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

        <span className="text-sm font-bold text-[#1A5C2A] tracking-wide">
          Loading product...
        </span>
      </div>
    );
  }

  // Safety Fallback if product ID does not match any items in memory
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-500 text-lg font-medium">
          Product not found or unavailable right now.
        </p>
        <button
          onClick={() => navigate("/marketplace")}
          className="bg-[#2F6B3F] text-white px-6 py-2 rounded-full font-bold shadow-xs transition-transform active:scale-95"
        >
          Return to Market
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      {/* SUCCESS CONFIRMATION MODAL CARD POPUP */}
      {submitted && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-check text-4xl text-[#2F6B3F]"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Placed!
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Your order request has been sent to the farmer. Redirecting to
              your dashboard...
            </p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#2F6B3F] h-full transition-all duration-3500ms ease-linear w-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* CORE CHECKOUT FORM SCREEN */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Column: Product Info Display */}
        <div className="p-8 bg-[#2F6B3F]/5 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F6B3F] bg-[#2F6B3F]/10 px-3 py-1 rounded-full">
              Review Checkout Item
            </span>
            <h1 className="mt-4 text-2xl font-black text-gray-800">
              {product.name}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Origin: {product.location || "Local Farm"}
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#2F6B3F]">
                ₦{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                / {product.unit || "unit"}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200/60 text-xs text-gray-400">
            🔒 Secure transaction powered by AgroConnect relational data
            pipelines.
          </div>
        </div>

        {/* Right Column: User Input Fields */}
        <div className="p-8 flex flex-col gap-5">
          <h2 className="text-lg font-bold text-gray-800">
            Delivery Information
          </h2>

          {/* Quantity Counter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              Quantity Requested
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#2F6B3F] transition-all"
              />
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-3 rounded-xl border border-gray-100">
                {product.unit || "units"}
              </span>
            </div>
          </div>

          {/* Delivery Address Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              Delivery Address
            </label>
            <textarea
              name="address"
              placeholder="Enter your clear doorstep delivery physical address..."
              value={form.address}
              onChange={handleChange}
              rows={2}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all resize-none"
            />
          </div>

          {/* Phone Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              Contact Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g., 08012345678"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all"
            />
          </div>

          {/* Notes Optional Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
              Additional Note{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="note"
              placeholder="Any special requests or details for the farmer..."
              value={form.note}
              onChange={handleChange}
              rows={2}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all resize-none"
            />
          </div>

          {/* Dynamic Price Estimate Card Display */}
          <div className="bg-gray-50 rounded-2xl px-4 py-3.5 flex justify-between items-center border border-gray-100 mt-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
              Total Estimate
            </span>
            <span className="text-[#2F6B3F] font-black text-xl">
              ₦
              {(
                Number(product?.price || 0) * Number(form.quantity)
              ).toLocaleString()}
            </span>
          </div>

          {/* Submit Action Trigger */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#2F6B3F] hover:bg-green-800 text-white font-bold text-base py-3.5 rounded-xl shadow-md active:scale-98 transition-all mt-2"
          >
            Confirm & Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
