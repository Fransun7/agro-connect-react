import { NavLink } from "react-router-dom";
import image1 from "../assets/hero-section-image-1.jpg";

function Home() {
  return (
    <section
      className="w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image1})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-16 md:pt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
          Fresh From the Farm,{" "}
          <span className="text-green-400">Straight to You</span>
        </h1>

        <p className="text-base md:text-xl text-gray-200 max-w-2xl mb-10 drop-shadow">
          AgroConnect links Nigerian farmers directly with buyers. Order fresh
          produce or list your farm! Fast, simple, and trusted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <NavLink
            to="/products"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-base px-8 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            Order Fresh Produce
          </NavLink>

          <button className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold text-base px-8 py-3 rounded-full shadow-lg transition-all duration-300">
            List Your Farm
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
