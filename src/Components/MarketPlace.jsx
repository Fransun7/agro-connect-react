import { useNavigate, useLocation, Link } from "react-router-dom";
import { farmersData } from "../data/farmers";
import ProductCard from "./ProductCard";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
// import { useOutletContext } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function MarketPlace() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // I NEED TO FETCH PRODUCTS THAT FARMERS HAS LISTED FROM SUPABASE
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);

      const [
        { data: productsData, error: productsDataError },
        { data: ordersData, error: ordersDataError },
      ] = await Promise.all([
        supabase.from("products").select("*"),

        supabase
          .from("orders")
          .select("product_id, quantity")
          .eq("status", "Delivered"),
      ]);
      if (productsDataError || ordersDataError) {
        console.error(
          "Error loading marketplace products:",
          productsDataError?.message || ordersDataError?.message,
        );
      } else if (productsData) {
        const mappedProdcuct = productsData.map((item) => {
          const soldQuantity = ordersData
            .filter((order) => order.product_id === item.id)
            .reduce((total, order) => total + Number(order.quantity), 0);

          const availableQuantity = Number(item.quantity) - soldQuantity;
          return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: Number(item.price),
            unit: item.unit,
            quantity: Number(item.quantity),
            soldQuantity,
            availableQuantity,
            image: item.image,
            farmerEmail: item.farmer_email,
            farmerName: item.farmer_name,
            location: item.location,
          };
        });

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
          <div className="col-span-full text-center py-6 text-gray-500 font-medium  flex flex-col items-center gap-5">
            <div className="bg-white rounded-full">
              <svg
                className="animate-spin h-15 w-15 text-[#1A5C2A]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            Gathering fresh farm listings live from the cloud...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-6 text-gray-400">
            📦 No active products listed on the market right now.
          </div>
        ) : (
          products.map((item) => <ProductCard key={item.id} produce={item} />)
        )}
      </div>
    </div>
  );
}

export default MarketPlace;
