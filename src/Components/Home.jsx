import { NavLink } from "react-router-dom";
import image1 from "../assets/hero-section-image-1.jpg";
import image2 from "../assets/hero-section-image-2.jpg";
import image3 from "../assets/hero-section-image-3.jpg";
import image4 from "../assets/hero-section-image-4.jpg";
import { useState, useEffect } from "react";
import productsData from "../data/products";
import ProductCard from "./ProductCard";

// const images = [image1, image2, image3, image4];
const slides = [
  {
    image: image1,
    headline: "Fresh From the Farm,",
    headlineSpan: " Straight to You",
    subtext: "AgroConnect links Nigerian farmers directly with buyers.",
    primaryBtn: { label: "Order Fresh Produce", link: "/products" },
    secondaryBtn: { label: "List Your Farm", link: "/signup" },
  },

  {
    image: image2,
    headline: "From Nigerian Soil,",
    headlineSpan: "To Your Doorstep",
    subtext:
      "We partner with local farmers to bring you the freshest tubers, grains and vegetables öharvested and delivered with care.",
    primaryBtn: { label: "Shop Now", link: "/products" },
    secondaryBtn: { label: "List Your Farm", link: "/dashboard/" },
  },

  {
    image: image3,
    headline: "Support Local Farmers, ",
    headlineSpan: "Eat Better",
    subtext:
      "Every order you place puts money directly in a Nigerian farmer's pocket. Fresh food, fair prices, real impact.",
    primaryBtn: { label: "Browse Products", link: "/products" },
    secondaryBtn: { label: "Join as a Farmer", link: "/signup" },
  },

  {
    image: image4,
    headline: "Your Trusted ",
    headlineSpan: "Agro Marketplace",
    subtext:
      "From Oyo to Kano, verified farmers across Nigeria are ready to deliver quality produce straight to you.",
    primaryBtn: { label: "Order Fresh Produce", link: "/products" },
    secondaryBtn: { label: "Get Started", link: "/signup" },
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        {/* sliding images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-16 md:pt-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            {/* Fresh From the Farm,{" "} */} {slides[currentIndex].headline}
            <span className="text-green-400">
              {slides[currentIndex].headlineSpan}
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-200 max-w-2xl mb-10 drop-shadow">
            {/* AgroConnect links Nigerian farmers directly with buyers. Order fresh
          produce or list your farm! Fast, simple, and trusted. */}
            {slides[currentIndex].subtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink
              to={slides[currentIndex].primaryBtn.link}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold text-base px-8 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              {slides[currentIndex].primaryBtn.label}
            </NavLink>

            <button className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold text-base px-8 py-3 rounded-full shadow-lg transition-all duration-300">
              {slides[currentIndex].secondaryBtn.label}
            </button>
          </div>
        </div>

        {/* Array dot */}
        <div className="absolute bottom-25 md:bottom-10 left-0 right-0 flex justify-center gap-6 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer  ${index === currentIndex ? "bg-green-600 scale-120" : "bg-white/50 hover:bg-white"}`}
            ></button>
          ))}
        </div>
      </section>

      <section className="bg-white p-3">
        <div className="flex justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 leading-tight mb-4 drop-shadow-lg">
            Products
          </h1>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-6 pt-2 px-2 scrollbar-hide snap-x snap-mandatory scroll-smooth">
          {productsData.map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-[#1A5C2A] px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              We're connecting Nigeria's{" "}
              <span className="text-green-400">farmers to the world.</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              AgroConnect is committed to closing the gap between Nigerian
              farmers and buyers. We make fresh produce accessible, affordable,
              and traceable, starting from Ibadan, spreading across Nigeria.
            </p>

            {/* Icons with labels */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              <div className="flex flex-col items-center text-center bg-white/10 rounded-2xl px-3 py-4 gap-2">
                <span className="text-3xl">🌾</span>
                <span className="text-white font-semibold text-sm">
                  Fresh Produce
                </span>
              </div>
              <div className="flex flex-col items-center text-center bg-white/10 rounded-2xl px-3 py-4 gap-2">
                <span className="text-3xl">🚚</span>
                <span className="text-white font-semibold text-sm">
                  Fast Delivery
                </span>
              </div>
              <div className="flex flex-col items-center text-center bg-white/10 rounded-2xl px-3 py-4 gap-2">
                <span className="text-3xl">🧑‍🌾</span>
                <span className="text-white font-semibold text-sm">
                  Verified Farmers
                </span>
              </div>
              <div className="flex flex-col items-center text-center bg-white/10 rounded-2xl px-3 py-4 gap-2">
                <span className="text-3xl">💰</span>
                <span className="text-white font-semibold text-sm">
                  Fair Prices
                </span>
              </div>
            </div>
          </div>

          {/* Right Side — Farm video in styled card */}
          <div className="flex justify-center">
            <div className="bg-[#f5f0e8] rounded-3xl p-4 shadow-2xl w-full max-w-sm">
              <video
                src="https://res.cloudinary.com/dzerw6edh/video/upload/v1777237205/farm-video_ft3gmx.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-72 object-cover rounded-2xl"
              />
              <div className="mt-4 px-2 pb-2 flex flex-col gap-1">
                <p className="text-[#1A5C2A] font-bold text-base">
                  Farm fresh, always.
                </p>
                <p className="text-gray-500 text-sm">
                  Sourced directly from verified farms across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F3D1A] text-white px-6 md:px-20 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold text-green-400">AgroConnect</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bridging the gap between Nigerian farmers and buyers. Fresh
              produce, trusted farmers, fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/"
                className="text-gray-400 text-sm hover:text-green-400 transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="text-gray-400 text-sm hover:text-green-400 transition-colors"
              >
                Products
              </NavLink>
              <NavLink
                to="/dashboard"
                className="text-gray-400 text-sm hover:text-green-400 transition-colors"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/signup"
                className="text-gray-400 text-sm hover:text-green-400 transition-colors"
              >
                Sign Up
              </NavLink>
            </nav>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-semibold text-white">Follow Us</h4>
            <div className="flex gap-4">
              {/* Facebook */}

              <a
                href="#"
                className="bg-white/10 hover:bg-green-600 transition-colors duration-300 p-3 rounded-full"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* X (Twitter) */}

              <a
                href="#"
                className="bg-white/10 hover:bg-green-600 transition-colors duration-300 p-3 rounded-full"
                aria-label="X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}

              <a
                href="#"
                className="bg-white/10 hover:bg-green-600 transition-colors duration-300 p-3 rounded-full"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">
            © 2026 AgroConnect. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Built with ❤️ for Nigerian farmers.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
