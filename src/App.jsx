import { useAuth } from "./Components/Context/AuthContext";
import { supabase } from "./supabaseClient";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    if (!localStorage.getItem("allFarmerProducts")) {
      localStorage.setItem(
        "allFarmerProducts",
        JSON.stringify(initialListings),
      );
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

  const savedUser = JSON.parse(localStorage.getItem("theRegisteredUser"));

  const getInitials = () => {
    const name = currentUser?.fullName || "Agro User";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="h-screen w-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A]">
        <div className="flex flex-col items-center gap-5 bg-[#1E293B] p-10 rounded-3xl border border-[#334155]">
          <div className="w-12 h-12 border-3 border-[#334155] border-t-[#10B981] rounded-full animate-spin" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-base">🌿</div>
            <span className="text-[#10B981] font-bold text-base tracking-wide">AgroConnect</span>
          </div>
          <span className="text-[#94A3B8] text-sm font-medium">Connecting to the market...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* LOGOUT CONFIRM MODAL */}
      {logoutConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">Logging out?</h2>
            <p className="text-[#94A3B8] text-sm mb-7 leading-relaxed">
              You'll need to sign in again to access your dashboard and orders.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-[#334155] hover:bg-[#475569] text-[#F8FAFC] font-bold py-3 rounded-2xl transition-all"
              >
                Stay
              </button>
              <button
                onClick={confirmLogOut}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <div className="bg-[#0F172A]/95 backdrop-blur-md w-full fixed top-0 left-0 right-0 z-40 border-b border-[#1E293B] shadow-lg shadow-black/20">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 h-16 md:h-18">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-base font-bold text-[#0F172A]">🌿</div>
            <span className="text-[#F8FAFC] font-bold text-lg tracking-tight hidden sm:block">AgroConnect</span>
          </NavLink>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/farmers", label: "Farmers" },
              { to: "/marketplace", label: "Marketplace" },
              ...(isAuth ? [{ to: "/dashboard", label: "Dashboard" }] : []),
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#10B981]/10 text-[#10B981]"
                      : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP SEARCH (marketplace only) */}
          {location.pathname === "/marketplace" && (
            <div className="hidden md:flex flex-1 max-w-xs mx-6 items-center bg-[#1E293B] border border-[#334155] focus-within:border-[#10B981] rounded-full overflow-hidden transition-all duration-200">
              <button className="bg-[#10B981] hover:bg-[#059669] rounded-full p-1.5 m-1 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none py-2 px-3 text-[#F8FAFC] text-sm placeholder-[#475569] outline-none"
              />
            </div>
          )}

          {/* DESKTOP RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {isAuth ? (
              <>
                <NavLink to="/dashboard" className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#10B981] to-[#065F46] text-white flex items-center justify-center font-bold text-sm border-2 border-[#10B981]/30">
                    {getInitials()}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-[#0F172A] rounded-full" />
                </NavLink>
                <button
                  onClick={triggerLogoutPopup}
                  className="text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] bg-[#1E293B] hover:bg-[#334155] border border-[#334155] px-4 py-2 rounded-xl transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] bg-[#1E293B] border border-[#334155] px-5 py-2 rounded-xl transition-all">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button className="text-sm font-bold text-[#0F172A] bg-[#10B981] hover:bg-[#059669] px-5 py-2 rounded-xl transition-all shadow-lg shadow-[#10B981]/20">
                    Get Started
                  </button>
                </NavLink>
              </>
            )}
          </div>

          {/* MOBILE RIGHT (avatar + hamburger) */}
          <div className="flex md:hidden items-center gap-3">
            {isAuth && (
              <NavLink to="/dashboard">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-[#065F46] text-white flex items-center justify-center font-bold text-xs border border-[#10B981]/30">
                  {getInitials()}
                </div>
              </NavLink>
            )}
            <button
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* MOBILE SEARCH (marketplace only) */}
        {location.pathname === "/marketplace" && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center bg-[#1E293B] border border-[#334155] rounded-full overflow-hidden">
              <button className="bg-[#10B981] rounded-full p-1.5 m-1 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none py-2 px-3 text-[#F8FAFC] text-sm placeholder-[#475569] outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* MOBILE SIDE MENU */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`fixed flex-col top-0 right-0 h-screen bg-[#0F172A] w-80 z-50 transform transition-transform duration-300 ease-in-out border-l border-[#1E293B] shadow-2xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Side menu header */}
        {isAuth ? (
          <div className="bg-gradient-to-br from-[#065F46] to-[#0F172A] p-6 pt-8">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-[#065F46] flex items-center justify-center font-bold text-white text-sm border-2 border-[#10B981]/40">
                {getInitials()}
              </div>
              <div>
                <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-0.5">Welcome back</p>
                <p className="text-white font-bold text-base truncate">{currentUser?.fullName || "Agro User"}</p>
                <p className="text-[#94A3B8] text-xs font-medium">{currentUser?.role || "Buyer"} · AgroConnect</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#065F46] to-[#0F172A] p-6 pt-8">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#10B981] rounded-lg flex items-center justify-center text-sm">🌿</div>
              <span className="text-white font-bold text-lg">AgroConnect</span>
            </div>
            <h3 className="text-white font-extrabold text-xl leading-tight mb-2">Fresh Farm Produce,<br/><span className="text-[#10B981]">Direct to You.</span></h3>
            <p className="text-[#94A3B8] text-xs leading-relaxed">Connecting local farmers directly with homes & vendors.</p>
          </div>
        )}

        <div className="border-t border-[#1E293B]" />

        {/* Nav links */}
        <nav className="px-4 py-4 flex flex-col gap-1">
          {[
            { to: "/", icon: "🏠", label: "Home" },
            { to: "/farmers", icon: "👨‍🌾", label: "Farmers" },
            { to: "/marketplace", icon: "🛒", label: "Marketplace" },
            ...(isAuth ? [{ to: "/dashboard", icon: "📊", label: "Dashboard" }] : []),
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]"
                }`
              }
            >
              <span className="text-base">{icon}</span> {label}
            </NavLink>
          ))}

          <div className="border-t border-[#1E293B] my-2" />

          {isAuth ? (
            <button
              onClick={() => { setMenuOpen(false); triggerLogoutPopup(); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-left"
            >
              <span className="text-base">🚪</span> Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-all"
              >
                <span className="text-base">🔑</span> Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-[#10B981] text-[#0F172A] hover:bg-[#059669] transition-all mt-1"
              >
                ✨ Sign Up Free
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full min-h-screen bg-[#0F172A] pt-16 md:pt-18">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmers" element={<Farmers searchTerm={searchTerm} />} />
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
