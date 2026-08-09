import { useNavigate, useLocation, Link } from "react-router-dom";
import { farmersData } from "../data/farmers";
import ProductCard from "./ProductCard";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./Context/AuthContext";

function MarketPlace() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);

      const [
        { data: productsData, error: productsDataError },
        { data: ordersData, error: ordersDataError },
      ] = await Promise.all([
        supabase.from("products").select("*"),
        supabase.from("orders").select("product_id, quantity").eq("status", "Delivered"),
      ]);

      if (productsDataError || ordersDataError) {
        console.error("Error loading marketplace products:", productsDataError?.message || ordersDataError?.message);
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
    <div className="bg-[var(--bg)] min-h-screen">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-deep)] border-b border-[var(--color-primary)]/20 px-5 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-2">Verified Listings</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] tracking-tight mb-1">
            Farm Marketplace
          </h1>
          <p className="text-[var(--muted)] text-sm">
            Browse produce from verified{" "}
            <span className="text-[var(--color-accent)]">✓</span>{" "}
            farmers across Nigeria
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-20 text-[var(--muted)]">
            <div className="w-10 h-10 border-2 border-[var(--border)] border-t-[var(--color-primary)] rounded-full animate-spin" />
            <span className="font-medium text-sm">Gathering fresh farm listings from the cloud...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-[var(--muted)] font-medium">No active products listed on the market right now.</p>
            <p className="text-[var(--subtle)] text-sm mt-2">Check back later or list your own produce.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
            {products.map((item) => <ProductCard key={item.id} produce={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketPlace;
