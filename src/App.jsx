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
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [logoutConfirm, setLogConfirm] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  // DECIDE ACTION IF SESSION EXIST OR NOT
  useEffect(() => {
    const profileName = async (sessionUser) => {
      if (!sessionUser) {
        setCurrentUser(null);
        return;
      }
      // getting session user full name
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, farm_name, farm_location, role")
        .eq("id", sessionUser.id)
        .single();

      setCurrentUser({
        ...sessionUser,
        fullName: profile?.full_name || "Agro User",
        farmName: profile?.farm_name,
        farmLocation: profile?.farm_location,
        role: profile?.role,
      });
    };

    // GETTING THE SESSION
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuth(true);
        profileName(session.user);
      }
    });

    // LISTEN TO LOGIN STATE AND DECIDE ACTION BASED ON THE STATE
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setIsAuth(true);
        profileName(session.user);
      } else {
        setIsAuth(false);
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        className={`bg-emerald-50/70 backdrop-blur-md w-full fixed top-0 left-0 right-0 z-40 flex flex-col border-emerald-100 shadow-xs gap-3 rounded-b-xl border-2 border-b ${location.pathname === "marketplace" ? "gap-3 pb-0" : "gap-0 pb-0"}`}
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

            {isAuth ? (
              <NavLink to="/dashboard" className="relative group md:hidden">
                {/* The Initials Circle */}
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#1A5C2A] via-[#2D7A3F] to-[#154620] text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-md active:scale-95 transition-transform">
                  {getInitials()}
                </div>

                {/* Optional: Small Green Dot to show they are "Active" */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </NavLink>
            ) : (
              <div className="flex md:hidden items-center">
                <NavLink to="/register">
                  <div className="flex items-center gap-12 h-[90%] w-full text-green-800">
                    <div className="w-full items-center h-full bg-linear-to-b from-stone-300/40 to-transparent p-1 rounded-2xl">
                      <button
                        // onClick={() => navigate("/register")}
                        className="items-center w-full h-full group p-1 rounded-xl bg-linear-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
                      >
                        <div className="items-center h-full bg-linear-to-b from-stone-200/40 to-white/80 rounded-lg px-1 py-1">
                          <div className="flex gap-2 items-center justify-center w-full h-full">
                            <span className="font-semibold text-lg">
                              Get Started
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </NavLink>
              </div>
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

            {/* right side of the menu */}
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
                    <i className="fa-solid fa-right-to-bracket w-5"></i> Login
                  </NavLink>

                  <div className="hidden  md:flex items-center justify-center  h-ful px-2 py-2">
                    {/* <div className="bg-linear-to-bg-green-800 to-transparent p-1 rounded-2xl bg-red-800"> */}
                    <NavLink to="/register">
                      <button
                        // onClick={() => navigate("/register")}
                        className="group px-2 py-2 rounded-[50px]  bg-linear-to-b bg-green-800 text-emerald-50/100  active:scale-[0.995]"
                      >
                        <span className="font-semibold text-base">
                          Get Started
                        </span>
                      </button>
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
        className={`fixed top-0 right-0 h-full w-80 bg-[#1A5C2A] z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img className="w-28" src={logo} alt="AgroConnect logo" />
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mx-6 mb-6" />

        {/* search input for mobile */}
        <div className="flex items-center bg-white/10 border border-white/20 rounded-full overflow-hidden mx-6 mb-4">
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
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-6 gap-2">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#1A5C2A]"
                  : "text-white hover:bg-white/10"
              }`
            }
          >
            <i className="fa-solid fa-house w-5"></i> Home
          </NavLink>

          <NavLink
            to="/farmers"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#1A5C2A]"
                  : "text-white hover:bg-white/10"
              }`
            }
          >
            <i className="fa-solid fa-tractor w-5"></i>Farmers
          </NavLink>

          <NavLink
            to="/marketplace"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#1A5C2A]"
                  : "text-white hover:bg-white/10"
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
                  `flex items-center gap-4 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#1A5C2A]"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                <i className="fa-solid fa-gauge w-5"></i> Dashboard
              </NavLink>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  triggerLogoutPopup();
                }}
                className="text-white hover:bg-white/10 p-3 rounded-lg text-left"
              >
                <i className="fa-solid fa-right-from-bracket w-5 ml-2"></i>{" "}
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#1A5C2A]"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                <i className="fa-solid fa-right-to-bracket w-5"></i> Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#1A5C2A]"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                <i className="fa-solid fa-user-plus w-5"></i> Sign Up
              </NavLink>
            </>
          )}
        </nav>

        {/* Bottom tag */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <p className="text-white/40 text-xs">© 2026 AgroConnect</p>
        </div>
      </div>

      <div
        className={`w-full h-screen bg-slate-500 transition-all duration-300 ${
          location.pathname === "/marketplace" ? "pt-20 md:pt-40" : " md:pt-30"
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

          <Route
            path="/dashboard"
            element={<Dashboard currentUser={currentUser} isAuth={isAuth} />}
          >
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
