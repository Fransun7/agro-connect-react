import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import productsData from "../data/products";
import { farmersData } from "../data/farmers";

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((p) => p.id === Number(id));
  const farmer = farmersData.find((f) => f.id === product?.id);
  const [form, setForm] = useState({
    quantity: 1,
    address: "",
    phone: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.address || !form.phone) {
      alert("please fill in your address and phone number");
      return;
    }
    setSubmitted(true);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#2F6B3F] text-white px-6 py-2 rounded-full"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-5xl">✅</div>
        <h2 className="text-2xl font-bold text-[#2F6B3F]">Order Placed!</h2>
        <p className="text-gray-500 max-w-sm">
          Your order for <strong>{product.name}</strong> has been received. We
          will contact you on <strong>{form.phone}</strong> to confirm delivery.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-[#2F6B3F] text-white font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] pt-24 px-6 pb-10">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#2F6B3F] font-medium text-sm mb-6 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-[#2F6B3F] mb-6">
          Place Your Order
        </h1>

        {/* product details */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center mb-6">
          <img
            src={product.image}
            alt=""
            className="w-20 h-20 object-cover rounded-xl"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-white bg-[#2F6B3F] px-2 py-0.5 rounded-full w-fit">
              {product.category}
            </span>
            <h2 className="text-base font-bold text-gray-800">
              {product.name}
            </h2>
            <p className="text-[#FFA02E] font-bold text-sm">
              ₦{product.price.toLocaleString()} / {product.unit}
            </p>
            <p className="text-gray-400 text-xs">
              🧑‍🌾 {farmer.name} — 📍 {farmer.location}
            </p>
          </div>
        </div>

        {/* order form */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          {/* quantity form */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Quantity ({product.unit})
            </label>
            <input
              type="number"
              value={form.quantity}
              name="quantity"
              min="1"
              max={product.quantity}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all"
            />
            <p className="text-xs text-gray-400">
              Max available: {product.quantity} {product.unit}s
            </p>
          </div>
          {/* phone form */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              value={form.phone}
              name="phone"
              placeholder="e.g. 08012345678"
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all"
            />
          </div>

          {/* Delivery Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Delivery Address
            </label>
            <textarea
              name="address"
              placeholder="Enter your full delivery address..."
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all resize-none"
            />
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Additional Note{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="note"
              placeholder="Any special instructions for the farmer or delivery..."
              value={form.note}
              onChange={handleChange}
              rows={2}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all resize-none"
            />
          </div>

          {/* Calculates the estimate */}
          <div className="bg-[#EFEFEF] rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Estimate</span>
            <span className="text-[#2F6B3F] font-bold text-base">
              ₦{(product.price * form.quantity).toLocaleString()}
            </span>
          </div>

          <button
            className="bg-[#2F6B3F] hover:bg-green-700 text-white font-semibold text-base px-6 py-3 rounded-full transition-all duration-300"
            onClick={handleSubmit}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
