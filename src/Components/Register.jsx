import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Register() {
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  // const [form, setForm] = useState({
  //   fullName: "",
  //   email: "",
  //   phone: "",
  //   location: "",
  //   age: "",
  //   gender: "",
  // });
  // function handleChange(e) {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-[45%] bg-[#1A5C2A] px-12 py-40 relative overflow-hidden">
        <div>
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute top-40 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 left-20 w-96 h-96 rounded-full bg-white/5" />
        </div>

        {/* Logo */}
        {/* <div className="relative z-10">
          <img src={logo} alt="AgroConnect" className="h-10" />
        </div> */}

        {/* Middle content */}
        <div className="relative z-10 flex flex-col gap-12 p-0">
          <h1 className="text-4xl font-bold text-white leading-snug">
            Fresh produce,
            <br />
            <span className="text-green-300">direct from</span>
            <br />
            Nigerian farms.
          </h1>
          <p className="text-green-200 text-base leading-relaxed max-w-xs">
            Join thousands of farmers and buyers building a better food system
            together.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-2">
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl">200+</span>
              <span className="text-green-300 text-xs">Farmers</span>
            </div>
            <div className="w-px bg-white/20" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl">5k+</span>
              <span className="text-green-300 text-xs">Orders</span>
            </div>
            <div className="w-px bg-white/20" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl">18</span>
              <span className="text-green-300 text-xs">States</span>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 border-l-2 border-green-400 pl-4">
          <p className="text-green-200 text-sm italic leading-relaxed">
            "AgroConnect helped me reach buyers across three states without
            leaving my farm."
          </p>
          <p className="text-white text-xs font-semibold mt-2">
            — Emeka Okafor, Benue State
          </p>
        </div>
      </div>

      {/* right panel */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-20 md:py-40 bg-[#F7F7F5]">
        {/* Mobile logo */}
        {/* <div className="flex lg:hidden mb-8">
        <img src={logo} alt="AgroConnect" className="h-8" />
      </div> */}

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A5C2A] mb-1">
            Create your account
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-[#2F6B3F] font-semibold hover:underline"
            >
              Log in
            </NavLink>
          </p>
        </div>

        {/* where the role toggles */}
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 mb-6">
          <button
            onClick={() => setRole("buyer")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              role === "buyer"
                ? "bg-[#1A5C2A] text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            } `}
          >
            🛒 I'm a Buyer
          </button>

          <button
            onClick={() => setRole("farmer")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              role === "farmer"
                ? "bg-[#1A5C2A] text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            } `}
          >
            🌾 I'm a Farmer
          </button>
        </div>

        {/* form field */}
        <div className="flex flex-col gap-4">
          {/* Full name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Chidi Okafor"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="08087654321"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              min="0"
              max="120"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1  focus:ring-[#2F6B3F]/20  transition-all placeholder-gray-300"
              placeholder="e.g. 25"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1  focus:ring-[#2F6B3F]/20  transition-all placeholder-gray-300"
              required
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* farm field only */}
          {role === "farmer" && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Farmer Location
              </label>
              <input
                type="tel"
                placeholder="e.g. Akure, Ondo State"
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="w-20 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-1">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 accent-[#2F6B3F] w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-xs text-gray-400 leading-relaxed cursor-pointer"
            >
              I agree to AgroConnect's{" "}
              <span className="text-[#2F6B3F] font-semibold hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#2F6B3F] font-semibold hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>

          {/* Submit */}
          <button className="mt-2 bg-[#1A5C2A] hover:bg-green-800 text-white font-semibold text-base py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-300 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google button */}
          <button className="flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 font-semibold text-sm py-3 rounded-xl transition-all duration-200">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

// function Register() {
//   const [role, setRole] = useState("buyer");
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Panel */}
//       <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#1A5C2A] px-12 py-10 relative overflow-hidden">
//         {/* Decorative circles */}
//         <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
//         <div className="absolute top-40 -right-10 w-48 h-48 rounded-full bg-white/5" />
//         <div className="absolute -bottom-10 left-20 w-96 h-96 rounded-full bg-white/5" />

//         {/* Logo */}
//         <div className="relative z-10">
//           <img src={logo} alt="AgroConnect" className="h-10" />
//         </div>

//         {/* Middle content */}
//         <div className="relative z-10 flex flex-col gap-6">
//           <h1 className="text-4xl font-bold text-white leading-snug">
//             Fresh produce,
//             <br />
//             <span className="text-green-300">direct from</span>
//             <br />
//             Nigerian farms.
//           </h1>
//           <p className="text-green-200 text-base leading-relaxed max-w-xs">
//             Join thousands of farmers and buyers building a better food system
//             together.
//           </p>

//           {/* Stats */}
//           <div className="flex gap-6 mt-2">
//             <div className="flex flex-col">
//               <span className="text-white font-bold text-2xl">200+</span>
//               <span className="text-green-300 text-xs">Farmers</span>
//             </div>
//             <div className="w-px bg-white/20" />
//             <div className="flex flex-col">
//               <span className="text-white font-bold text-2xl">5k+</span>
//               <span className="text-green-300 text-xs">Orders</span>
//             </div>
//             <div className="w-px bg-white/20" />
//             <div className="flex flex-col">
//               <span className="text-white font-bold text-2xl">18</span>
//               <span className="text-green-300 text-xs">States</span>
//             </div>
//           </div>
//         </div>

//         {/* Bottom quote */}
//         <div className="relative z-10 border-l-2 border-green-400 pl-4">
//           <p className="text-green-200 text-sm italic leading-relaxed">
//             "AgroConnect helped me reach buyers across three states without
//             leaving my farm."
//           </p>
//           <p className="text-white text-xs font-semibold mt-2">
//             — Emeka Okafor, Benue State
//           </p>
//         </div>
//       </div>

//       {/* Right Panel — Form */}
//       <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-10 bg-[#F7F7F5]">
//         {/* Mobile logo */}
//         <div className="flex lg:hidden mb-8">
//           <img src={logo} alt="AgroConnect" className="h-8" />
//         </div>

//         <div className="max-w-md w-full mx-auto">
//           <h2 className="text-2xl md:text-3xl font-bold text-[#1A5C2A] mb-1">
//             Create your account
//           </h2>
//           <p className="text-gray-400 text-sm mb-8">
//             Already have an account?{" "}
//             <NavLink
//               to="/login"
//               className="text-[#2F6B3F] font-semibold hover:underline"
//             >
//               Log in
//             </NavLink>
//           </p>

//           {/* Role toggle */}
//           <div className="flex bg-white border border-gray-200 rounded-xl p-1 mb-6">
//             <button
//               onClick={() => setRole("buyer")}
//               className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
//                 role === "buyer"
//                   ? "bg-[#1A5C2A] text-white shadow-sm"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               🛒 I'm a Buyer
//             </button>
//             <button
//               onClick={() => setRole("farmer")}
//               className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
//                 role === "farmer"
//                   ? "bg-[#1A5C2A] text-white shadow-sm"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               🌾 I'm a Farmer
//             </button>
//           </div>

//           {/* Form fields */}
//           <div className="flex flex-col gap-4">
//             {/* Full name */}
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-semibold text-gray-700">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Chidi Okafor"
//                 className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
//               />
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-semibold text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
//               />
//             </div>

//             {/* Phone */}
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-semibold text-gray-700">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 placeholder="08012345678"
//                 className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
//               />
//             </div>

//             {/* Farmer-only field */}
//             {role === "farmer" && (
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-semibold text-gray-700">
//                   Farm Location
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. Ibadan, Oyo State"
//                   className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
//                 />
//               </div>
//             )}

//             {/* Password */}
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-semibold text-gray-700">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Min. 8 characters"
//                   className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F6B3F] focus:ring-1 focus:ring-[#2F6B3F]/20 transition-all placeholder-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
//                 >
//                   {showPassword ? "HIDE" : "SHOW"}
//                 </button>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="flex items-start gap-3 mt-1">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 className="mt-0.5 accent-[#2F6B3F] w-4 h-4 cursor-pointer"
//               />
//               <label
//                 htmlFor="terms"
//                 className="text-xs text-gray-400 leading-relaxed cursor-pointer"
//               >
//                 I agree to AgroConnect's{" "}
//                 <span className="text-[#2F6B3F] font-semibold hover:underline cursor-pointer">
//                   Terms of Service
//                 </span>{" "}
//                 and{" "}
//                 <span className="text-[#2F6B3F] font-semibold hover:underline cursor-pointer">
//                   Privacy Policy
//                 </span>
//               </label>
//             </div>

//             {/* Submit */}
//             <button className="mt-2 bg-[#1A5C2A] hover:bg-green-800 text-white font-semibold text-base py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
//               Create Account
//             </button>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-1">
//               <div className="flex-1 h-px bg-gray-200" />
//               <span className="text-gray-300 text-xs">or continue with</span>
//               <div className="flex-1 h-px bg-gray-200" />
//             </div>

//             {/* Google button */}
//             <button className="flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 font-semibold text-sm py-3 rounded-xl transition-all duration-200">
//               <svg className="w-4 h-4" viewBox="0 0 24 24">
//                 <path
//                   fill="#4285F4"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 />
//                 <path
//                   fill="#34A853"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="#FBBC05"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                 />
//                 <path
//                   fill="#EA4335"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 />
//               </svg>
//               Continue with Google
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import logo from "../assets/logo.png";

// // function Register() {
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     fristName: "",
// //     lastName: "",
// //     email: "",
// //     phoneNumber: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const [submitted, setSubmitted] = useState(false);

// //   function handleSubmit() {
// //     if (
// //       !form.fristName ||
// //       !form.lastName ||
// //       form.password ||
// //       form.confirmPassword
// //     ) {
// //       alert("please fill in your bio's");
// //       return;
// //     }
// //     setSubmitted(true);
// //   }

// //   function handleChange(e) {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   }
// // }

// // export default Register;
