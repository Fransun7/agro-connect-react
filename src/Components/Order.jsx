// import { useParams, useNavigate, Navigate } from "react-router-dom";
// import { useState } from "react";
// import productsData from "../data/products";
// import { farmersData } from "../data/farmers";

// function Order() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   // checking for loggedin details
//   const loggedInUser = JSON.parse(localStorage.getItem("theRegisteredUser"));
//   const isAuth = localStorage.getItem("isAuth") == "true";

//   // pull the product from localStorage
//   const globalProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
//   const product = globalProducts.find((p) => p.id === Number(id));

//   // const farmer = farmersData.find((f) => f.id === product?.id);
//   const [form, setForm] = useState({
//     quantity: 1,
//     address: "",
//     phone: "",
//     note: "",
//   });
//   const [submitted, setSubmitted] = useState(false);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   function handleSubmit() {
//     if (!form.address || !form.phone) {
//       alert("please fill in your address and phone number");
//       return;
//     }
//     // setSubmitted(true);
//   }

//   if (!isAuth || !loggedInUser) {
//     alert("You need to sign in first to place an order!");
//     <Navigate to="/login" replace />;
//     return;
//   }

//   const totalCost = Number(product.price) * Number(form.quantity);

//   const newOrderReceipt = {
//     id: Date.now(), // Generate unique Order ID number
//     product: product.name,
//     price: product.price,
//     quantity: Number(form.quantity),
//     total: totalCost,
//     status: "Pending", // Initial lifecycle state entry point
//     date: new Date().toLocaleDateString("en-NG", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     }),

//     // Relationship Links
//     buyerEmail: loggedInUser.email,
//     buyerName: loggedInUser.fullName,
//     buyerPhone: form.phone,
//     deliveryAddress: form.address,
//     additionalNote: form.note,

//     // Targeting vectors: Grabs the details of the farmer who uploaded it!
//     farmerEmail: product.farmerEmail || "admin@agroconnect.com",
//     farmerName: product.farmerName || "Agro Farmer",
//   };

//   const currentOrdersTable =
//     JSON.parse(localStorage.getItem("allOrders")) || [];
//   const updatedOrdersTable = [...currentOrdersTable, newOrderReceipt];
//   localStorage.setItem("allOrders", JSON.stringify(updatedOrdersTable));

//   // Show success visual state indicator
//   setSubmitted(true);

//   window.dispatchEvent(new Event("authUpdate"));

//   setTimeout(() => {
//     navigate("/dashboard/orders");
//   }, 3500);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p className="text-gray-500 text-lg">Product not found.</p>
//         <button
//           onClick={() => navigate("/farmers")}
//           className="bg-[#2F6B3F] text-white px-6 py-2 rounded-full"
//         >
//           Back to Products
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       {/* SUCCESS CONFIRMATION MODAL CARD POPUP */}
//       {submitted && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center animate-in fade-in zoom-in duration-300">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <i className="fa-solid fa-check text-4xl text-[#2F6B3F]"></i>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Order Placed!
//             </h2>
//             <p className="text-gray-500 mb-6 text-sm">
//               Your order request has been sent to the farmer. Redirecting to
//               your dashboard...
//             </p>
//             <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
//               <div className="bg-[#2F6B3F] h-full transition-all duration-3500 ease-linear w-full animate-progress"></div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CORE CHECKOUT FORM GRAPHICS SCREEN */}
//       <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
//         {/* Left Card Column: Product details review */}
//         <div className="p-8 bg-[#2F6B3F]/5 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
//           <div>
//             <span className="text-xs font-bold uppercase tracking-wider text-[#2F6B3F] bg-[#2F6B3F]/10 px-3 py-1 rounded-full">
//               Review Checkout Item
//             </span>
//             <h1 className="mt-4 text-2xl font-black text-gray-800">
//               {product.name}
//             </h1>
//             <p className="text-sm text-gray-400 mt-1">
//               Origin: {product.location || "Local Farm"}
//             </p>

//             <div className="mt-6 flex items-baseline gap-1">
//               <span className="text-2xl font-black text-[#2F6B3F]">
//                 ₦{product.price.toLocaleString()}
//               </span>
//               <span className="text-xs text-gray-400 font-medium">
//                 / {product.unit || "unit"}
//               </span>
//             </div>
//           </div>

//           <div className="mt-8 pt-6 border-t border-gray-200/60 text-xs text-gray-400">
//             🔒 Secure transaction powered by AgroConnect relational data
//             pipelines.
//           </div>
//         </div>

//         {/* Right Card Column: Data Entry Inputs */}
//         <div className="p-8 flex flex-col gap-5">
//           <h2 className="text-lg font-bold text-gray-800">
//             Delivery Information
//           </h2>

//           {/* Quantity Selector Counter */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
//               Quantity Requested
//             </label>
//             <div className="flex items-center gap-3">
//               <input
//                 type="number"
//                 name="quantity"
//                 min="1"
//                 value={form.quantity}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#2F6B3F] transition-all"
//               />
//               <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-3 rounded-xl border border-gray-100">
//                 {product.unit || "units"}
//               </span>
//             </div>
//           </div>

//           {/* Delivery Destination Address Input Field */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
//               Delivery Address
//             </label>
//             <textarea
//               name="address"
//               placeholder="Enter your clear doorstep delivery physical address..."
//               value={form.address}
//               onChange={handleChange}
//               rows={2}
//               className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all resize-none"
//             />
//           </div>

//           {/* Phone Contact Input Field */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
//               Contact Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="e.g., 08012345678"
//               value={form.phone}
//               onChange={handleChange}
//               className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all"
//             />
//           </div>

//           {/* Optional Notes Field */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
//               Additional Note{" "}
//               <span className="text-gray-400 font-normal">(optional)</span>
//             </label>
//             <textarea
//               name="note"
//               placeholder="Any special requests or details for the farmer..."
//               value={form.note}
//               onChange={handleChange}
//               rows={2}
//               className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] transition-all resize-none"
//             />
//           </div>

//           {/* Interactive Financial Invoice Calculation State Display */}
//           <div className="bg-gray-50 rounded-2xl px-4 py-3.5 flex justify-between items-center border border-gray-100 mt-2">
//             <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
//               Total Estimate
//             </span>
//             <span className="text-[#2F6B3F] font-black text-xl">
//               ₦
//               {(Number(product.price) * Number(form.quantity)).toLocaleString()}
//             </span>
//           </div>

//           {/* Action Execution Button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-[#2F6B3F] hover:bg-green-800 text-white font-bold text-base py-3.5 rounded-xl shadow-md active:scale-98 transition-all mt-2"
//           >
//             Confirm & Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Order;

import {
  useParams,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { initialListings } from "../data/dashboardData";

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Fetch the dynamic inventory database safely
  const globalProducts =
    JSON.parse(localStorage.getItem("allProducts")) || initialListings;
  const product = globalProducts.find((p) => p.id === Number(id));

  // 3. Set up local state fields
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

  // 4. Submit Order Action Engine
  function handleSubmit() {
    if (!form.address || !form.phone) {
      alert("Please fill in your address and phone number");
      return;
    }

    const totalCost = Number(product.price) * Number(form.quantity);

    // Create the invoice receipt object
    const newOrderReceipt = {
      id: Date.now(),
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

      buyerEmail: loggedInUser.email,
      buyerName: loggedInUser.fullName,
      buyerPhone: form.phone,
      deliveryAddress: form.address,
      additionalNote: form.note,

      farmerEmail: product?.farmerEmail || "admin@agroconnect.com",
      farmerName: product?.farmerName || "Agro Farmer",
    };

    // Commit to the global orders timeline storage
    const currentOrdersTable =
      JSON.parse(localStorage.getItem("allOrders")) || [];
    const updatedOrdersTable = [...currentOrdersTable, newOrderReceipt];
    localStorage.setItem("allOrders", JSON.stringify(updatedOrdersTable));

    // Open the success pop-up card state
    setSubmitted(true);

    // Sync metrics across the app
    window.dispatchEvent(new Event("authUpdate"));

    // Smoothly redirect to dashboard after 3.5 seconds
    setTimeout(() => {
      navigate("/dashboard/orders");
    }, 3500);
  }

  // Safety Fallback if product ID does not match any items in memory
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-500 text-lg font-medium">
          Product not found or unavailable right now.
        </p>
        <button
          onClick={() => navigate("/farmers")}
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
