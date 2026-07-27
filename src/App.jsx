import { useAuth } from "./Components/Context/AuthContext";
import { supabase } from "./supabaseClient";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import logo from "../src/assets/logo.png";
import farmer from "../src/assets/farmer.svg";
import Home from "./Components/Home";
import Products from "./Components/Farmers";
import image1 from "./assets/hero-section-image-1.jpg";
import Order from "./Components/Order";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Overview from "./Components/Overview";
import Orders from "./Components/Orders";
import Listings from "./Components/Listings";
import Settings from "./Components/Settings";
import Farmers from "./Components/Farmers";
import { Navigate } from "react-router-dom";
import {
  buyerOrders,
  farmerOrders,
  initialListings,
} from "./data/dashboardData";
import FarmerIcon from "./Components/FarmerIcon";
import MarketPlace from "./Components/MarketPlace";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [logoutConfirm, setLogConfirm] = useState(false);
  const { isAuth, currentUser, loading } = useAuth();

  useEffect(() => {
    // checks if there are items for allFarmerProducts in localstarage and put initial listing in the local staorage if not
    if (!localStorage.getItem("allFarmerProducts")) {
      localStorage.setItem(
        "allFarmerProducts",
        JSON.stringify(initialListings),
      );

      // check for items for allOrders in local Storage, if empty set farmerOrders to the localStorage
      if (!localStorage.getItem("allOrders")) {
        localStorage.setItem("allOrders", JSON.stringify(farmerOrders));
      }
    }
  }, []);

  const triggerLogoutPopup = () => {
    setLogConfirm(true);
  };

  const confirmLogOut = async () => {
    await supabase.auth.signOut();
    setLogConfirm(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setLogConfirm(false);
  };

  // 1. Get the user object
  const savedUser = JSON.parse(localStorage.getItem("theRegisteredUser"));

  // 2. Logic to get initials (e.g., "Francis Omotayo" -> "FO")
  const getInitials = () => {
    const name = currentUser?.fullName || "Agro User";

    return name
      .split(" ")
      .map((word) => word[0])
      .join(" ")
      .toUpperCase();
  };

  if (loading) {
    return (
      // <div className="h-screen w-screen flex items-center justify-center bg-emerald-50">
      //   <div className="text-center text-green-800 font-bold">
      //     {/* 🔄 Connecting to AgroConnect... */}

      //     <svg
      //       className="animate-spin h-5 w-5 text-white"
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //     >
      //       <circle
      //         className="opacity-25"
      //         cx="12"
      //         cy="12"
      //         r="10"
      //         stroke="currentColor"
      //         strokeWidth="4"
      //       ></circle>
      //       <path
      //         className="opacity-75"
      //         fill="currentColor"
      //         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      //       ></path>
      //     </svg>
      //     <span>Connecting to AgroConnect...</span>
      //   </div>
      // </div>
      <div className="h-screen w-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-emerald-50/90 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-xl border border-emerald-100">
          {/* Animated Tailwind SVG Spinner */}
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
            Connecting to AgroConnect...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {logoutConfirm && (
        <div
          className={
            "mt-10 fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 "
          }
        >
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center animate-in fade-in zoom-in duration-300 border border-gray-100">
            {/* Warning Icon */}
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-right-from-bracket text-3xl text-red-600"></i>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Logging Out?
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Are you sure you want to log out? You will need to sign in again
              to access your dashboard.
            </p>

            {/* Button Container - Flex for side-by-side */}
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl transition-all active:scale-95"
              >
                No, Stay
              </button>

              <button
                onClick={confirmLogOut}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md shadow-red-200 active:scale-95"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`bg-emerald-50/70 h-25 md:h-30 backdrop-blur-md w-full fixed top-0 left-0 right-0 z-40 flex flex-col border-emerald-100 shadow-xs gap-3 rounded-b-xl border-2 border-b ${location.pathname === "marketplace" ? "gap-3 pb-0" : "gap-0 pb-0"}`}
      >
        <nav
          id="navigation"
          className="grid grid-cols-[80%_20%] md:grid-cols-[15%_50%_30%] text-white md:pt-0 md:pl-5 gap-2 w-full items-center justify-center  md:h-25 pr-5 md:pr-0 rounded-b-xl md:rounded-b-2xl"
        >
          {/* LOGO & GET STARTED BUTTON */}
          <div id="logo-div" className="flex items-center">
            {/* logo container */}
            <div className="w-[30%] md:w-[80%]">
              {/* logo image */}
              <NavLink to="/">
                <img className="" src={logo} alt="logo" />
              </NavLink>
            </div>

            {isAuth && (
              <NavLink to="/dashboard" className="relative group md:hidden">
                {/* The Initials Circle */}
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#1A5C2A] via-[#2D7A3F] to-[#154620] text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-md active:scale-95 transition-transform">
                  {getInitials()}
                </div>

                {/* Optional: Small Green Dot to show they are "Active" */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </NavLink>
              // ) : (
              //   <div className="flex md:hidden items-center">
              //     <NavLink to="/register">
              //       <div className="flex items-center gap-12 h-[90%] w-full text-green-800">
              //         <div className="w-full items-center h-full bg-linear-to-b from-stone-300/40 to-transparent p-1 rounded-2xl">
              //           <button
              //             // onClick={() => navigate("/register")}
              //             className="items-center w-full h-full group p-1 rounded-xl bg-linear-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
              //           >
              //             <div className="items-center h-full bg-linear-to-b from-stone-200/40 to-white/80 rounded-lg px-1 py-1">
              //               <div className="flex gap-2 items-center justify-center w-full h-full">
              //                 <span className="font-semibold text-lg">
              //                   Get Started
              //                 </span>
              //               </div>
              //             </div>
              //           </button>
              //         </div>
              //       </div>
              //     </NavLink>
              //   </div>
            )}
          </div>

          {/* HAMBURGER MENU ICON */}
          <div className="flex md:hidden justify-end">
            <button
              id="hamburger"
              className="text-gray-700 focus:outline-none flex justify-end"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="green"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* MENU FOR BIG SCREEN */}
          <div className="hidden md:flex items-center gap-1 col-span-2 justify-center w-full pl-30 pr-5">
            <div className="flex gap-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                    isActive ? "border-b-2 border-[#2F6B3F]" : ""
                  }`
                }
              >
                <i className="fa-solid fa-house w-5"></i> Home
              </NavLink>
              <NavLink
                to="/farmers"
                className={({ isActive }) =>
                  `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                    isActive ? "border-b-2 border-[#2F6B3F]" : ""
                  }`
                }
              >
                <span className="flex items-center gap-1">
                  <FarmerIcon className="w-6 h-5" /> Farmers
                </span>
              </NavLink>

              <NavLink
                to="/marketplace"
                className={({ isActive }) =>
                  `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                    isActive ? "border-b-2 border-[#2F6B3F]" : ""
                  }`
                }
              >
                <i class="fa-solid fa-basket-shopping"></i> Marketplace
              </NavLink>

              {isAuth && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                      isActive ? "border-b-2 border-[#2F6B3F]" : ""
                    }`
                  }
                >
                  <i className="fa-solid fa-gauge w-5"></i> Dashboard
                </NavLink>
              )}
            </div>

            <div className="flex grow"></div>

            {/* RIGHT SIDE OF THE MENU */}
            <div className="flex items-center gap-4">
              {isAuth ? (
                <>
                  <NavLink to="/dashboard" className="relative group">
                    {/* The Initials Circle */}
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#1A5C2A] via-[#2D7A3F] to-[#154620] text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-md active:scale-95 transition-transform">
                      {getInitials()}
                    </div>

                    {/* Optional: Small Green Dot to show they are "Active" */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
                  </NavLink>

                  <div className="hidden md:flex items-center gap-12 h-full text-[#2F6B3F] pl-5">
                    <div className="bg-linear-to-b from-stone-300/40 to-transparent p-1 rounded-2xl">
                      <button
                        onClick={triggerLogoutPopup}
                        className="group p-px rounded-xl bg-linear-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
                      >
                        <div className="bg-linear-to-b from-stone-200/40 to-white/80 rounded-lg px-1 py-1">
                          <div className="flex gap-2 items-center">
                            <span className="font-semibold text-base">
                              Logout
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                        isActive ? "border-b-2 border-[#2F6B3F]" : ""
                      }`
                    }
                  >
                    <button className="w-[83.84px] h-11 border-2 border-[#2E2F35] bg-[#FFFFFF] shadow-[3px_3px_0px_0px_#2E2F35] rounded-xl text-[15px] cursor-pointer">
                      Login
                    </button>
                    {/* <i className="fa-solid fa-right-to-bracket w-5"></i> Login */}
                  </NavLink>

                  <div className="hidden  md:flex items-center justify-center  h-ful px-2 py-2">
                    {/* <div className="bg-linear-to-bg-green-800 to-transparent p-1 rounded-2xl bg-red-800"> */}
                    <NavLink to="/register">
                      {/* <button
                        // onClick={() => navigate("/register")}
                        className="group px-2 py-2 rounded-[50px]  bg-linear-to-b bg-green-800 text-emerald-50/100  active:scale-[0.995]"
                      >
                        <span className="font-semibold text-base">
                          Get Started
                        </span>
                      </button> */}
                      <div class="flex items-center space-x-4">
                        <button className="w-[184.86px] h-11 border-2 border-[#072e1e] bg-[#FFFFFF] shadow-[3px_3px_0px_0px_#072e1e] rounded-xl text-[#2F6B3F] text-[15px] font-bold cursor-pointer  ">
                          Get Started
                        </button>
                      </div>
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="hidden pl-50 pr-50 bg-transparent pb-4 md:flex items-center">
          {/* SEARCH INPUT FOR LARGE SCREEN */}
          {location.pathname === "/marketplace" && (
            <div className="hidden md:flex w-full items-center bg-white/90 border border-emerald-100  focus-within:border-emerald-600 focu-within:shadow-md rounded-full overflow-hidden transition-all duration-200 shadow-xs">
              <button className="bg-emerald-600 hover:bg-emerald-700 rounded-full p-2 m-1 flex items-center justify-center transition-colors duration-200">
                <svg
                  className="w-4 h-4 stroke-white fill-none"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="flex-1 bg-transparent border-none py-2 px-4 text-green-800 text-sm placeholder-gray-400 outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* SIDEMENU  */}
      <div
        className={`fixed flex-col top-0 right-0 h-screen bg-white w-80 z-50  transform transition-transform duration-300 ease-in-out shadow-[0_0_50px_rgba(0,0,0,0.15)] ${
          menuOpen ? "translate-x-0" : "translate-x-full "
        }`}
      >
        {isAuth ? (
          // TOP DIV
          <div className="bg-[#0A3915] h-[30%] rounded-b-[50px] flex flex-col shrink-0">
            {/* CLOSE BUTTON */}
            <div className="flex justify-end p-4">
              <button
                className=" text-emerald-300/80 hover:text-white transition-colors bg-white/10 rounded-full p-1 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full h-full flex items-center gap-2 p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <NavLink to="/dashboard" className="relative group md:hidden">
                  {/* The Initials Circle */}
                  <div className="w-15 h-15 rounded-full bg-linear-to-br from-[#1A5C2A] via-[#2D7A3F] to-[#154620] text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-md active:scale-95 transition-transform">
                    {getInitials()}
                  </div>

                  {/* Optional: Small Green Dot to show they are "Active"
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span> */}
                </NavLink>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  Welcome Back
                </span>
                <h3 className="text-white font-bold text-lg truncate">
                  {currentUser?.fullName || "Agro User"}
                </h3>
                <span className="text-white/60 text-xs truncate font-medium">
                  {currentUser?.role || "Buyer"} Profile
                </span>
              </div>
            </div>
          </div>
        ) : (
          // TOP DIV
          <div className=" bg-[#1A5C2A]  flex flex-col shrink-0 relative z-10 p-8">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button className="text-white" onClick={() => setMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Logo
            <div className="flex justify-center mb-6">
              <img className="w-28" src={logo} alt="AgroConnect logo" />
            </div> */}

            <div className="flex flex-col  justify-center gap-2 animate-fadeIn">
              <span className="text-[#C4A77D] text-[10px] font-extrabold uppercase tracking-widest">
                Join AgroConnect
              </span>
              <h3 className="text-white font-black text-2xl tracking-tight mt-1 leading-tight">
                Fresh Farm Produce,
                <br />
                Direct to You.
              </h3>
              <p className="text-emerald-100/70 text-xs mt-1.5 font-medium leading-relaxed">
                Connecting local farmers directly with homes & vendors.
              </p>

              {/* Visual Platform Stats Container */}
              <div className="flex gap-4 mt-4 bg-white/5 border border-white/10 rounded-2xl p-3 shadow-inner backdrop-blur-xs">
                <div className="flex flex-col">
                  <span className="text-white font-black text-sm tracking-tight">
                    50+ Hubs
                  </span>
                  <span className="text-[9px] text-[#C4A77D] font-bold uppercase tracking-wider">
                    Verified Farms
                  </span>
                </div>
                <div className="w-1 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-sm tracking-tight">
                    100% Fresh
                  </span>
                  <span className="text-[9px] text-[#C4A77D] font-bold uppercase tracking-wider">
                    Harvest Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Divider */}
        <div className="border-t border-white/20 mx-6 mb-6" />

        {/* SEARCH INPUT FOR MOBILE
        <div className="flex items-center bg-green-800 border border-white/20 rounded-full overflow-hidden mx-6 mb-6">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search products..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="flex-1 bg-transparent border-none py-3 px-4 text-white text-sm placeholder-white/40 outline-none"
          />
          <button className="bg-green-500 rounded-full p-2 m-1 flex items-center justify-center">
            <svg
              className="w-4 h-4 stroke-white fill-none stroke-2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div> */}

        {/* Nav Links */}
        <nav className="px-6 pt-4 pb-8 gap-2 flex flex-col">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 text-base px-4 py-3 transition-all duration-200 font-semibold ${
                isActive
                  ? "bg-black/5 border-2 rounded-full text-[#1A5C2A] hover:bg-black/10 hover:font-bold"
                  : " hover:bg-green-900 rounded-full  text-[#1A5C2A] hover:text-white"
              }`
            }
          >
            <i className="fa-solid fa-house w-5"></i> Home
          </NavLink>

          <NavLink
            to="/farmers"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 text-base px-4 py-3 transition-all duration-200 font-semibold ${
                isActive
                  ? "bg-black/5 border-2 rounded-full text-[#1A5C2A] hover:bg-black/10 hover:font-bold"
                  : " hover:bg-green-900 rounded-full  text-[#1A5C2A] hover:text-white"
              }`
            }
          >
            <i className="fa-solid fa-tractor w-5"></i>Farmers
          </NavLink>

          <NavLink
            to="/marketplace"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 text-base px-4 py-3 transition-all duration-200 font-semibold ${
                isActive
                  ? "bg-black/5 border-2 rounded-full text-[#1A5C2A] hover:bg-black/10 hover:font-bold"
                  : "hover:bg-green-900 rounded-full  text-[#1A5C2A] hover:text-white"
              }`
            }
          >
            <i className="fa-solid fa-tractor w-5"></i>Marketplace
          </NavLink>
          {isAuth ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 text-base font-medium px-4 py-3  transition-all duration-200 ${
                    isActive
                      ? "bg-black/5 border-2 rounded-full text-[#1A5C2A] hover:bg-black/10 hover:font-bold"
                      : "hover:bg-green-900 rounded-full  text-[#1A5C2A] hover:text-white"
                  }`
                }
              >
                <i className="fa-solid fa-gauge w-5"></i> Dashboard
              </NavLink>

              <NavLink
                onClick={() => {
                  setMenuOpen(false);
                  triggerLogoutPopup();
                }}
                className="flex items-center gap-4 text-base font-medium px-4 py-3  transition-all duration-200  text-[#1A5C2A]"
              >
                <i className="fa-solid fa-right-from-bracket w-5"></i> Logout
              </NavLink>
            </>
          ) : (
            <>
              <div>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-base font-medium px-4 py-3  transition-all duration-200 ${
                      isActive
                        ? "bg-black/5 border-2 rounded-full text-[#1A5C2A] hover:bg-black/10 hover:font-bold"
                        : "hover:bg-green-900 rounded-full  text-[#1A5C2A] hover:text-white"
                    }`
                  }
                >
                  <i className="fa-solid fa-right-to-bracket w-5"></i> Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-base font-medium px-4 py-3  transition-all duration-200 ${
                      isActive
                        ? "bg-black/5 border-2 rounded-full text-[#1A5C2A] hover:bg-black/10 hover:font-bold"
                        : "hover:bg-green-900 rounded-full  text-[#1A5C2A] hover:text-white"
                    }`
                  }
                >
                  <i className="fa-solid fa-user-plus w-5"></i> Sign Up
                </NavLink>
              </div>
            </>
          )}
        </nav>
        {/* Bottom tag
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <p className="text-green-800 text-xs font-semibold">
            © 2026 AgroConnect
          </p>
        </div> */}
      </div>

      <div
        className={`w-full min-h-screen transition-all duration-300 ${
          location.pathname === "/marketplace"
            ? "pt-25 md:pt-30"
            : "pt-25  md:pt-30"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/farmers"
            element={<Farmers searchTerm={searchTerm} />}
          />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="listings" element={<Listings />} />

            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
