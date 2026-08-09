import { useAuth } from "./Components/Context/AuthContext";
import { useTheme } from "./Components/Context/ThemeContext";
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
import { LogoMark, Wordmark } from "./Components/CropbitLogo";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [logoutConfirm, setLogConfirm] = useState(false);
  const { isAuth, currentUser, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();

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
      <div className="h-screen w-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-5 bg-[var(--surface)] p-10 rounded-3xl border border-[var(--border)]">
          <div className="w-12 h-12 border-3 border-[var(--border)] border-t-[var(--color-primary)] rounded-full animate-spin" />
          <div className="flex items-center gap-3">
            <Wordmark size="md" />
          </div>
          <span className="text-[var(--muted)] text-sm font-medium">Connecting to the market...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* LOGOUT CONFIRM MODAL */}
      {logoutConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-2">Logging out?</h2>
            <p className="text-[var(--muted)] text-sm mb-7 leading-relaxed">
              You'll need to sign in again to access your dashboard and orders.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-[var(--border)] hover:bg-[var(--subtle)] text-[var(--text)] font-bold py-3 rounded-2xl transition-all"
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
      <div className="backdrop-blur-md w-full fixed top-0 left-0 right-0 z-40 border-b border-[var(--border-2)] shadow-lg shadow-black/10" style={{ backgroundColor: "color-mix(in srgb, var(--bg) 95%, transparent)" }}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 h-16 md:h-18">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center shrink-0">
            <Wordmark size="md" />
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
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP SEARCH (marketplace only) */}
          {location.pathname === "/marketplace" && (
            <div className="hidden md:flex flex-1 max-w-xs mx-6 items-center bg-[var(--surface)] border border-[var(--border)] focus-within:border-[var(--color-primary)] rounded-full overflow-hidden transition-all duration-200">
              <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-full p-1.5 m-1 flex items-center justify-center">
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
                className="flex-1 bg-transparent border-none py-2 px-3 text-[var(--text)] text-sm placeholder-[var(--subtle)] outline-none"
              />
            </div>
          )}

          {/* DESKTOP RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] transition-all"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
                </svg>
              )}
            </button>

            {isAuth ? (
              <>
                <NavLink to="/dashboard" className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white flex items-center justify-center font-bold text-sm border-2 border-[var(--color-primary)]/30">
                    {getInitials()}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[var(--color-primary)] border-2 border-[var(--bg)] rounded-full" />
                </NavLink>
                <button
                  onClick={triggerLogoutPopup}
                  className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] px-4 py-2 rounded-xl transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] px-5 py-2 rounded-xl transition-all">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button className="text-sm font-bold text-[var(--bg)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] px-5 py-2 rounded-xl transition-all shadow-lg shadow-[var(--color-primary)]/20">
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white flex items-center justify-center font-bold text-xs border border-[var(--color-primary)]/30">
                  {getInitials()}
                </div>
              </NavLink>
            )}
            <button
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-all"
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
            <div className="flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-full overflow-hidden">
              <button className="bg-[var(--color-primary)] rounded-full p-1.5 m-1 flex items-center justify-center">
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
                className="flex-1 bg-transparent border-none py-2 px-3 text-[var(--text)] text-sm placeholder-[var(--subtle)] outline-none"
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
        className={`fixed flex-col top-0 right-0 h-screen bg-[var(--bg)] w-80 z-50 transform transition-transform duration-300 ease-in-out border-l border-[var(--border-2)] shadow-2xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Side menu header */}
        {isAuth ? (
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--bg)] p-6 pt-8">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--muted)] hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center font-bold text-white text-sm border-2 border-[var(--color-primary)]/40">
                {getInitials()}
              </div>
              <div>
                <p className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-0.5">Welcome back</p>
                <p className="text-white font-bold text-base truncate">{currentUser?.fullName || "Agro User"}</p>
                <p className="text-[var(--muted)] text-xs font-medium">{currentUser?.role || "Buyer"} · Cropbit</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--bg)] p-6 pt-8">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--muted)] hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-3">
              <Wordmark size="md" lightText />
            </div>
            <h3 className="text-white font-extrabold text-xl leading-tight mb-2">Fresh Farm Produce,<br/><span className="text-[var(--color-primary)]">Direct to You.</span></h3>
            <p className="text-[var(--muted)] text-xs leading-relaxed">Connecting local farmers directly with homes & vendors.</p>
          </div>
        )}

        <div className="border-t border-[var(--border-2)]" />

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
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                    : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                }`
              }
            >
              <span className="text-base">{icon}</span> {label}
            </NavLink>
          ))}

          <div className="border-t border-[var(--border-2)] my-2" />

          {/* Theme toggle row */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-all w-full text-left"
          >
            <span className="text-base">{theme === "dark" ? "☀️" : "🌙"}</span>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          <div className="border-t border-[var(--border-2)] my-2" />

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
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-all"
              >
                <span className="text-base">🔑</span> Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-[var(--color-primary)] text-[var(--bg)] hover:bg-[var(--color-primary-hover)] transition-all mt-1"
              >
                ✨ Sign Up Free
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full min-h-screen bg-[var(--bg)] pt-16 md:pt-18">
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
