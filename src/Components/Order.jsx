import { useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
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

  const [form, setForm] = useState({
    quantity: 1,
    address: "",
    phone: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
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

  async function handleSubmit() {
    if (!form.address || !form.phone) {
      alert("Please fill in your address and phone number");
      return;
    }

    const totalCost = Number(product.price) * Number(form.quantity);

    const { data, error } = await supabase
      .from("orders")
      .insert([{
        product_id: product.id,
        product: product.name,
        price: product.price,
        quantity: Number(form.quantity),
        total: totalCost,
        status: "Pending",
        date: new Date().toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }),
        buyer_email: currentUser.email,
        buyer_name: currentUser.fullName,
        buyer_phone: form.phone,
        delivery_address: form.address,
        additional_note: form.note,
        farmer_email: product?.farmer_email || "admin@cropbit.com",
        farmer_name: product?.farmer_name || "Agro Farmer",
      }])
      .select();

    if (error) {
      console.error("Error placing order:", error.message);
      alert("Unable to place your order. Please try again.");
      return;
    }

    setSubmitted(true);
    window.dispatchEvent(new Event("authUpdate"));
    setTimeout(() => {
      navigate("/dashboard/orders");
    }, 3500);
  }

  const inputClass = "border border-[var(--border)] bg-[var(--surface)] focus:border-[#10B981] rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-all placeholder-[var(--subtle)] w-full resize-none";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-[var(--bg)]">
        <div className="w-10 h-10 border-2 border-[var(--border)] border-t-[#10B981] rounded-full animate-spin" />
        <span className="text-sm font-bold text-[#10B981] tracking-wide">Loading product...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--bg)]">
        <div className="text-4xl mb-2">🔍</div>
        <p className="text-[var(--muted)] text-lg font-medium">Product not found or unavailable.</p>
        <button
          onClick={() => navigate("/marketplace")}
          className="bg-[#10B981] hover:bg-[#059669] text-[#0F172A] px-6 py-3 rounded-xl font-bold transition-all"
        >
          Return to Market
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 px-4 sm:px-6 lg:px-8 mt-4">
      {/* Success modal */}
      {submitted && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">✓</div>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-2">Order Placed!</h2>
            <p className="text-[var(--muted)] mb-6 text-sm">
              Your order has been sent to the farmer. Redirecting to your dashboard...
            </p>
            <div className="w-full bg-[#334155] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#10B981] h-full rounded-full w-full transition-all duration-[3500ms] ease-linear" />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl shadow-black/30">
        {/* Left: Product info */}
        <div className="p-8 bg-gradient-to-br from-[#065F46]/30 to-[#1E293B] border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full">
              Review Order
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-[var(--text)] tracking-tight">{product.name}</h1>
            <p className="text-sm text-[var(--muted)] mt-1">📍 {product.location || "Local Farm"}</p>
            <p className="text-sm text-[var(--muted)] mt-1">🧑‍🌾 {product.farmer_name || "Agro Farmer"}</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#10B981]">₦{product.price.toLocaleString()}</span>
              <span className="text-sm text-[var(--muted)]">/ {product.unit || "unit"}</span>
            </div>

            {/* Total estimate */}
            <div className="mt-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Total Estimate</span>
                <span className="text-[#F59E0B] font-extrabold text-xl">
                  ₦{(Number(product?.price || 0) * Number(form.quantity)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="text-[#10B981]">🔒</span>
            Secure transaction powered by Cropbit
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8 flex flex-col gap-5">
          <h2 className="text-lg font-bold text-[var(--text)]">Delivery Details</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Quantity</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                className={inputClass}
              />
              <span className="text-xs font-bold text-[var(--muted)] bg-[#334155] px-3 py-3 rounded-xl border border-[#475569] shrink-0">
                {product.unit || "units"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Delivery Address</label>
            <textarea
              name="address"
              placeholder="Enter your clear doorstep delivery address..."
              value={form.address}
              onChange={handleChange}
              rows={2}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g., 08012345678"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
              Additional Note <span className="text-[var(--subtle)] font-normal normal-case">(optional)</span>
            </label>
            <textarea
              name="note"
              placeholder="Any special requests for the farmer..."
              value={form.note}
              onChange={handleChange}
              rows={2}
              className={inputClass}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#10B981] hover:bg-[#059669] text-[#0F172A] font-bold text-base py-3.5 rounded-xl shadow-lg shadow-[#10B981]/20 transition-all mt-2"
          >
            Confirm & Place Order →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
