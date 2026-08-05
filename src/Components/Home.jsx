import { NavLink } from "react-router-dom";
import image1 from "../assets/hero-section-image-1.jpg";
import image2 from "../assets/hero-section-image-2.jpg";
import image3 from "../assets/hero-section-image-3.jpg";
import image4 from "../assets/hero-section-image-4.jpg";
import { useState, useEffect, useRef } from "react";
import productsData from "../data/products";
import ProductCard from "./ProductCard";
import { farmerListings } from "../data/listings";
import { initialListings } from "../data/dashboardData";
import { supabase } from "../supabaseClient";

const slides = [
  {
    image: image1,
    headline: "Fresh From the Farm,",
    headlineSpan: " Straight to You",
    subtext: "AgroConnect links Nigerian farmers directly with buyers.",
    primaryBtn: { label: "Order Fresh Produce", link: "/marketplace" },
    secondaryBtn: { label: "List Your Farm", link: "/register" },
  },
  {
    image: image2,
    headline: "From Nigerian Soil,",
    headlineSpan: "To Your Doorstep",
    subtext: "We partner with local farmers to bring you the freshest tubers, grains and vegetables harvested and delivered with care.",
    primaryBtn: { label: "Shop Now", link: "/marketplace" },
    secondaryBtn: { label: "List Your Farm", link: "/dashboard/" },
  },
  {
    image: image3,
    headline: "Support Local Farmers, ",
    headlineSpan: "Eat Better",
    subtext: "Every order you place puts money directly in a Nigerian farmer's pocket. Fresh food, fair prices, real impact.",
    primaryBtn: { label: "Browse Products", link: "/marketplace" },
    secondaryBtn: { label: "Join as a Farmer", link: "/register" },
  },
  {
    image: image4,
    headline: "Your Trusted ",
    headlineSpan: "Agro Marketplace",
    subtext: "From Oyo to Kano, verified farmers across Nigeria are ready to deliver quality produce straight to you.",
    primaryBtn: { label: "Order Fresh Produce", link: "/marketplace" },
    secondaryBtn: { label: "Get Started", link: "/register" },
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error loading marketplace products:", error.message);
      } else if (data) {
        const mappedProdcuct = data.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          unit: item.unit,
          quantity: Number(item.quantity),
          image: item.image,
          farmerEmail: item.farmer_email,
          farmerName: item.farmer_name,
          location: item.location,
        }));
        setProducts(mappedProdcuct);
      }
      setLoading(false);
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const containerRef = useRef(null);
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(true);

  const checkArrrow = () => {
    const container = containerRef.current;
    setShowScrollLeft(container.scrollLeft > 10);
    setShowScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-black/60 to-black/30" />

        {/* Emerald tint strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#065F46]/40 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-16">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">Nigeria's Agritech Marketplace</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg mb-4 tracking-tight">
            {slides[currentIndex].headline}
            <span className="text-[#10B981]"> {slides[currentIndex].headlineSpan}</span>
          </h1>

          <p className="text-base md:text-xl text-[#94A3B8] max-w-2xl mb-10 leading-relaxed">
            {slides[currentIndex].subtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink
              to={slides[currentIndex].primaryBtn.link}
              className="bg-[#10B981] hover:bg-[#059669] text-[#0F172A] font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-[#10B981]/30 transition-all duration-300"
            >
              {slides[currentIndex].primaryBtn.label}
            </NavLink>
            <NavLink
              to={slides[currentIndex].secondaryBtn.link}
              className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-3.5 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              {slides[currentIndex].secondaryBtn.label}
            </NavLink>
          </div>

          {/* Trust badges */}
          <div className="flex gap-6 mt-12 flex-wrap justify-center">
            {[["✓", "Verified Farmers"], ["🛡️", "Secure Payments"], ["⚡", "Fast Delivery"]].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 text-[#94A3B8] text-sm font-medium">
                <span className="text-[#10B981]">{icon}</span> {label}
              </div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "bg-[#10B981] w-6 h-2.5"
                  : "bg-white/30 hover:bg-white/50 w-2.5 h-2.5"
              }`}
            />
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-[#0F172A] px-4 py-14 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-2">Fresh From the Market</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">Featured Products</h2>
            </div>
            <NavLink
              to="/marketplace"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:text-[#059669] bg-[#10B981]/10 hover:bg-[#10B981]/20 border border-[#10B981]/20 px-4 py-2 rounded-full transition-all"
            >
              View All →
            </NavLink>
          </div>

          <div className="relative">
            <div
              ref={containerRef}
              onScroll={checkArrrow}
              className="flex overflow-x-auto gap-5 pb-4 pt-2 px-1 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3 py-16 w-full text-[#94A3B8] font-medium">
                  <div className="w-6 h-6 border-2 border-[#334155] border-t-[#10B981] rounded-full animate-spin" />
                  Gathering fresh farm listings...
                </div>
              ) : products.length === 0 ? (
                <div className="w-full text-center py-16 text-[#94A3B8]">
                  📦 No active products listed on the market right now.
                </div>
              ) : (
                products.slice(0, 4).map((item) => <ProductCard key={item.id} produce={item} />)
              )}
            </div>
          </div>

          <div className="flex justify-center mt-6 sm:hidden">
            <NavLink
              to="/marketplace"
              className="text-sm font-semibold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-6 py-2.5 rounded-full"
            >
              View All Products →
            </NavLink>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-[#10B981] py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["200+", "Verified Farmers"],
            ["5,000+", "Orders Fulfilled"],
            ["18", "States Covered"],
            ["100%", "Fresh Produce"],
          ].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold text-[#0F172A] mb-1 tracking-tight">{val}</div>
              <div className="text-[#065F46] text-sm font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="bg-[#065F46] px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest">Our Mission</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              We're connecting Nigeria's{" "}
              <span className="text-[#10B981]">farmers to the world.</span>
            </h2>
            <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed">
              AgroConnect is committed to closing the gap between Nigerian farmers and buyers. We make fresh produce accessible, affordable, and traceable, starting from Ibadan, spreading across Nigeria.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                ["🌾", "Fresh Produce"],
                ["🚚", "Fast Delivery"],
                ["🧑‍🌾", "Verified Farmers"],
                ["💰", "Fair Prices"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-white font-semibold text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-4 shadow-2xl w-full max-w-sm">
              <video
                src="https://res.cloudinary.com/dzerw6edh/video/upload/v1779789746/home-page-video_esbith.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-72 object-cover rounded-2xl"
              />
              <div className="mt-4 px-2 pb-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-sm shrink-0">🌿</div>
                <div>
                  <p className="text-[#F8FAFC] font-bold text-sm">Farm fresh, always.</p>
                  <p className="text-[#94A3B8] text-xs">Sourced directly from verified farms across Nigeria.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0f1a] border-t border-[#1E293B] text-white px-6 md:px-20 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-base">🌿</div>
              <h3 className="text-xl font-bold text-[#10B981]">AgroConnect</h3>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Bridging the gap between Nigerian farmers and buyers. Fresh produce, trusted farmers, fast delivery.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-widest">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[["Home", "/"], ["Marketplace", "/marketplace"], ["Farmers", "/farmers"], ["Dashboard", "/dashboard"]].map(([label, to]) => (
                <NavLink key={to} to={to} className="text-[#94A3B8] text-sm hover:text-[#10B981] transition-colors">
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-widest">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { label: "Facebook", path: "M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
                { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-[#1E293B] hover:bg-[#10B981] border border-[#334155] hover:border-[#10B981] transition-all duration-300 rounded-full flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-[#94A3B8] group-hover:fill-white" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[#475569] text-xs">© 2026 AgroConnect. All rights reserved.</p>
          <p className="text-[#475569] text-xs">Built with ❤️ for Nigerian farmers.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
