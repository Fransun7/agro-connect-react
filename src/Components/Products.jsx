import { useState } from "react";
import productsData from "../data/products";
import ProductCard from "./ProductCard";

const categories = [
  "All",
  "Grains",
  "Vegetables",
  "Tubers",
  "Fruits",
  "Others",
];

{
  /* Filtering logic */
}

function Products({ searchTerm }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProduct = productsData
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory,
    )
    .filter((product) =>
      product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
    );

  return (
    <div className="bg-green-800 h-screen mt-20 md:mt-40">
      <div className="flex justify-center items-center h-[10%]">
        <h1 className="text-white text-xl md:text-3xl font-bold leading-tight drop-shadow-lg">
          Fresh Products Available
        </h1>
      </div>
      {/* categories row */}
      <div className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-hide md:gap-12 md:justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#2F6B3F] text-white border-[#2F6B3F]"
                : "bg-white text-[#2F6B3F] border-[#2F6B3F] hover:bg-[#2F6B3F] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProduct.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>

      {/* if no category matches the products */}
      {filteredProduct.length === 0 && (
        <div className="text-center text-gray-400 mt-20 text-lg">
          No products available in this category yet.
        </div>
      )}
    </div>
  );
}

export default Products;
