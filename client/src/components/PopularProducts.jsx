import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

import milkImage from "../assets/products/milk.png";
import tomatoesImage from "../assets/products/tomatoes.png";
import laysImage from "../assets/products/lays.png";
import cocaColaImage from "../assets/products/coca-cola.png";
import bananasImage from "../assets/products/bananas.png";
import eggsImage from "../assets/products/eggs.png";

const products = [
  {
    id: 1,
    name: "Amul Fresh Milk",
    quantity: "1 Litre",
    price: 35,
    oldPrice: 40,
    rating: 4.8,
    reviews: 124,
    category: "Dairy",
    image: milkImage,
  },

  {
    id: 2,
    name: "Fresh Tomatoes",
    quantity: "1 Kg",
    price: 40,
    oldPrice: 48,
    rating: 4.7,
    reviews: 98,
    category: "Grocery",
    image: tomatoesImage,
  },

  {
    id: 3,
    name: "Lay's Classic",
    quantity: "52g",
    price: 20,
    oldPrice: 25,
    rating: 4.6,
    reviews: 76,
    category: "Snacks",
    image: laysImage,
  },

  {
    id: 4,
    name: "Coca Cola",
    quantity: "500ml",
    price: 40,
    oldPrice: 45,
    rating: 4.7,
    reviews: 102,
    category: "Beverages",
    image: cocaColaImage,
  },

  {
    id: 5,
    name: "Fresh Bananas",
    quantity: "1 Kg",
    price: 60,
    oldPrice: 70,
    rating: 4.8,
    reviews: 88,
    category: "Grocery",
    image: bananasImage,
  },

  {
    id: 6,
    name: "Farm Fresh Eggs",
    quantity: "6 Pcs",
    price: 48,
    oldPrice: 55,
    rating: 4.7,
    reviews: 66,
    category: "Dairy",
    image: eggsImage,
  },
];

const filters = [
  "All",
  "Grocery",
  "Dairy",
  "Snacks",
  "Beverages",
];

const PopularProducts = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") {
      return products;
    }

    return products.filter(
      (product) => product.category === activeFilter
    );
  }, [activeFilter]);

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  return (
    <section className="bg-sky-100   px-4 py-12 sm:px-6 md:py-16 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#09245f] sm:text-3xl">
              Popular Products
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Check out our most loved products
            </p>
          </div>

          <Link
            to="/products"
            className="group hidden items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
          >
            View All

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* =========================
            FILTER BUTTONS
        ========================== */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                }`}
              >
                {filter}
              </button>
            );
          })}

        </div>

        {/* =========================
            PRODUCTS GRID
        ========================== */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}

        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mt-7 flex justify-center sm:hidden">

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            View All

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>

    </section>
  );
};

export default PopularProducts;