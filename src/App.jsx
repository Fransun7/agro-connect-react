import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import logo from "../src/assets/logo.png";
import Home from "./Components/Home";
import Products from "./Components/Products";
import image1 from "./assets/hero-section-image-1.jpg";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <BrowserRouter>
        <nav
          id="navigation"
          className="bg-green-50 grid grid-cols-[80%_20%] md:grid-cols-[15%_35%_37%_13%] text-white fixed top-0 left-0  md:pt-5 md:pl-5 gap-2 w-full items-center z-50 shadow-md md:shadow-2xl md:h-35 pr-5 md:pr-0"
        >
          {/* logo container + get-started-button */}
          <div id="logo-div" class="flex">
            {/* logo container */}
            <div className="w-[30%] md:w-[80%]">
              {/* logo image */}
              <img className="" src={logo} alt="" />
            </div>

            {/* get started button for mobile hidden on desktop */}
            <div className="flex w-[70%] md:hidden items-center">
              <a href="" className="flex w-[60%] h-full items-center">
                <div className="flex items-center gap-12 h-[90%] w-full text-green-800">
                  <div className="w-full items-center h-full bg-linear-to-b from-stone-300/40 to-transparent p-1 rounded-2xl">
                    <button className="items-center w-full h-full group p-1 rounded-xl bg-linear-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]">
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
              </a>
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
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="green"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* search input container hidden on mobile  */}
          <div className="hidden h-[90%] md:flex items-center">
            <div className="hidden h-[50%] w-full md:flex rounded-lg font-mono items-center">
              <input
                className="text-sm text-green-900 custom-input w-full h-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-green-800 hover:shadow-lg hover:border-green-800"
                placeholder="Enter text here"
                type="text"
                id="unique-input"
              />
            </div>
          </div>

          {/* menu links hidden on mobile */}
          <div class="hidden md:flex md:items-center justify-center gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                  isActive ? "border-b-2 border-[#2F6B3F]" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                  isActive ? "border-b-2 border-[#2F6B3F]" : ""
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                  isActive ? "border-b-2 border-[#2F6B3F]" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-[#2F6B3F] font-bold text-lg hover:text-green-600 ${
                  isActive ? "border-b-2 border-[#2F6B3F]" : ""
                }`
              }
            >
              Login
            </NavLink>
          </div>

          {/* right menu on mobile */}
          <div className="hidden md:flex items-center gap-12 h-full text-[#2F6B3F] pl-5">
            <div className="bg-linear-to-b from-stone-300/40 to-transparent p-1 rounded-2xl">
              <button className="group p-px rounded-xl bg-linear-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]">
                <div className="bg-linear-to-b from-stone-200/40 to-white/80 rounded-lg px-1 py-1">
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold text-base">Get Started</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* side menu */}
        {/* Side Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#1A5C2A] z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
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
              to="/products"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#1A5C2A]"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              <i className="fa-solid fa-basket-shopping w-5"></i> Products
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
              to="/signup"
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
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
