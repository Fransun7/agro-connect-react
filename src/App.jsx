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
// import Produce from "./Components/Produce";
import FarmerIcon from "./Components/FarmerIcon";
import ProtectedRoute from "./Components/ProtectedRoute";
// This invisible helper remembers our route and jumps back to it on reload

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <BrowserRouter>
        <nav
          id="navigation"
          className="bg-green-50 grid grid-cols-[80%_20%] md:grid-cols-[15%_30%_42%_13%] text-white fixed top-0 left-0  md:pt-5 md:pl-5 gap-2 w-full items-center z-50 shadow-md shadow-gray-400 md:h-35 pr-5 md:pr-0 rounded-b-xl md:rounded-b-2xl"
        >
          {/* logo container + get-started-button */}
          <div id="logo-div" className="flex">
            {/* logo container */}
            <div className="w-[30%] md:w-[80%]">
              {/* logo image */}
              <img className="" src={logo} alt="" />
            </div>

            {/* get started button for mobile hidden on desktop */}
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
          </div>

          <div className="flex md:hidden justify-end">
            {/* <!-- hamburger --> */}
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

          {/* Search — hidden on mobile */}
          <div className="hidden md:flex items-center bg-gray-100 border border-gray-200 focus-within:border-green-700 rounded-full overflow-hidden transition-all duration-200">
            <button className="bg-[#2F6B3F] hover:bg-green-700 rounded-full p-2 m-1 flex items-center justify-center transition-colors duration-200">
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
              className="flex-1 bg-transparent border-none py-2 px-4 text-green-900 text-sm placeholder-gray-400 outline-none"
            />
          </div>

          {/* menu links hidden on mobile */}
          <div className="hidden md:flex md:items-center justify-center gap-8">
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
              to="/dashboard"
              className={({ isActive }) =>
                `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                  isActive ? "border-b-2 border-[#2F6B3F]" : ""
                }`
              }
            >
              <i className="fa-solid fa-gauge w-5"></i> Dashboard
            </NavLink>
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
          </div>

          {/* right menu on desktop */}
          <div className="hidden md:flex items-center gap-12 h-full text-[#2F6B3F] pl-5">
            <div className="bg-linear-to-b from-stone-300/40 to-transparent p-1 rounded-2xl">
              <NavLink to="/register">
                <button
                  // onClick={() => navigate("/register")}
                  className="group p-px rounded-xl bg-linear-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
                >
                  <div className="bg-linear-to-b from-stone-200/40 to-white/80 rounded-lg px-1 py-1">
                    <div className="flex gap-2 items-center">
                      <span className="font-semibold text-base">
                        Get Started
                      </span>
                    </div>
                  </div>
                </button>
              </NavLink>
            </div>
          </div>
        </nav>

        {/* side menu */}
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
          </nav>

          {/* Bottom tag */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <p className="text-white/40 text-xs">© 2026 AgroConnect</p>
          </div>
        </div>

        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/farmers"
              element={<Farmers searchTerm={searchTerm} />}
            />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="listings" element={<Listings />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* <Route path="/produce/:id" element={<Produce />}></Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
