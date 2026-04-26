import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import logo from "../src/assets/logo.png";
import Home from "./Components/Home";
import Products from "./Components/Products";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <nav
          id="navigation"
          className="bg-green-50 grid grid-cols-[80%_20%] md:grid-cols-[15%_40%_30%_15%] text-white fixed top-0 left-0  md:pt-5 md:pl-5 pr-5 gap-2 w-full items-center z-50 shadow-md md:shadow-2xl md: md:h-35"
        >
          {/* logo container + get-started-button */}
          <div id="logo-div" class="flex">
            {/* logo container */}
            <div className="w-[40%] md:w-[80%]">
              {/* logo image */}
              <img className="" src={logo} alt="" />
            </div>

            {/* get started button for mobile hidden on desktop */}
            <div className="flex w-[60%] md:hidden items-center">
              <a href="" className="flex w-[70%] h-[90%] items-center">
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

          {/* search input hidden on mobile  */}
          <div className="hidden md:flex w-full h-[40%] bg-white rounded-lg font-mono justify-end items-center">
            <input
              className="text-sm text-green-900 custom-input w-full h-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-green-800 hover:shadow-lg hover:border-green-800 bg-gray-100"
              placeholder="Enter text here"
              type="text"
              id="unique-input"
            />
          </div>

          {/* hidden on mobile */}
          <div class="basis-[30%] hidden md:flex md:items-center gap-8">
            <NavLink
              to="/"
              className="text-[#2F6B3F] font-bold text-lg hover:text-green-600"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="text-[#2F6B3F] font-bold text-lg hover:text-green-600 hover:rounded-md"
            >
              Products
            </NavLink>

            <a
              href="#"
              className="text-[#2F6B3F] font-bold text-lg   hover:rounded-md hover:text-green-600 "
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-[#2F6B3F] font-bold text-lg  hover:rounded-md hover:text-green-600"
            >
              Login
            </a>
          </div>

          {/* right menu on mobile */}
          <div className="hidden md:flex items-center gap-12 h-full text-[#2F6B3F] pl-10">
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
        <div
          id="sideMenu"
          className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* close button */}
          <div className="flex justify-end p-4">
            <button
              id="close-button"
              className="text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center">
            <img className="w-50" src={logo} alt="" />
          </div>

          <nav className="flex flex-col px-6 gap-11 mt-4">
            <NavLink
              to="./"
              className="flex items-center gap-3 text-[#2F6B3F] text-xl font-medium hover:text-[#7FB77E]"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-house"></i> Home
            </NavLink>

            <NavLink
              to="/products"
              className="flex items-center gap-3 text-[#2F6B3F] text-xl font-medium hover:text-[#7FB77E]"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-house"></i> Products
            </NavLink>

            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 text-[#2F6B3F] text-xl font-medium hover:text-[#7FB77E]"
            >
              <i className="fa-solid fa-house"></i> Dashboard
            </NavLink>

            <NavLink
              to="./"
              className="flex items-center gap-3 text-[#2F6B3F] text-xl font-medium hover:text-[#7FB77E]"
            >
              <i className="fa-solid fa-house"></i> Login
            </NavLink>

            <NavLink
              to="./"
              className="flex items-center gap-3 text-[#2F6B3F] text-xl font-medium hover:text-[#7FB77E]"
            >
              <i className="fa-solid fa-house"></i> Signup
            </NavLink>
          </nav>
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
