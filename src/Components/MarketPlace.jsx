import { useNavigate, useLocation, Link } from "react-router-dom";
import { farmersData } from "../data/farmers";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function MarketPlace() {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className="bg-green-800 h-full pt-15">
      <div className="flex flex-col justify-center items-center p-4">
        <h3 className="text-white text-sm md:text-md font-bold leading-tight drop-shadow-lg">
          Browse
          {"                     "}
          produce of verified{" "}
          <span>
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "#FFD700" }}
            ></i>
          </span>{" "}
          farmers across Nigeria{" "}
        </h3>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="col-span-full text-center py-6 text-gray-500 font-medium">
            🔄 Gathering fresh farm listings live from the cloud...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-6 text-gray-400">
            📦 No active products listed on the market right now.
          </div>
        ) : (
          products
            .slice(0, 4)
            .map((item) => <ProductCard key={item.id} produce={item} />)
        )}
      </div>
    </div>
  );
}

export default MarketPlace;
