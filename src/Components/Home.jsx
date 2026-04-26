import { NavLink } from "react-router-dom";
import image1 from "../assets/hero-section-image-1.jpg";
import image2 from "../assets/hero-section-image-2.jpg";
import image3 from "../assets/hero-section-image-3.jpg";
import image4 from "../assets/hero-section-image-4.jpg";
import { useState, useEffect } from "react";

// const images = [image1, image2, image3, image4];
const slides = [
  {
    image: image1,
    headline: "Fresh From the Farm,",
    headlineSpan: "Straight to You",
    subtext: "AgroConnect links Nigerian farmers directly with buyers.",
    primaryBtn: { label: "Order Fresh Produce", link: "/products" },
    secondaryBtn: { label: "List Your Farm", link: "/signup" },
  },

  {
    image: image2,
    headline: "From Nigerian Soil,",
    headlineSpan: "To Your Doorstep",
    subtext:
      "We partner with local farmers to bring you the freshest tubers, grains and vegetables — harvested and delivered with care.",
    primaryBtn: { label: "Shop Now", link: "/products" },
    secondaryBtn: { label: "List Your Farm", link: "/signup" },
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
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
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
  );
}

export default Home;
