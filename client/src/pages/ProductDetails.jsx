import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

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
    stock: 25,
    description:
      "Fresh and nutritious milk, perfect for your everyday needs. Carefully packed to maintain freshness and quality.",
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
    stock: 30,
    description:
      "Fresh farm-picked tomatoes with great taste and quality. Perfect for everyday cooking.",
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
    stock: 50,
    description:
      "Crispy and delicious potato chips, perfect for your snack time.",
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
    stock: 40,
    description:
      "Refreshing soft drink that is perfect for meals, parties and everyday moments.",
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
    stock: 20,
    description:
      "Fresh and naturally sweet bananas selected for quality and freshness.",
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
    stock: 35,
    description:
      "Fresh farm eggs with excellent taste and nutritional value.",
  },
];

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#09245f]">
            Product Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            The product you are looking for does not exist.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((current) => current + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((current) => current - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      product,
      quantity,
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Products
        </Link>

        {/* Main Product */}
        <div className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm lg:grid-cols-2">

          {/* =========================
              IMAGE
          ========================== */}
          <div className="relative flex min-h-[380px] items-center justify-center bg-[#eef8ff] p-8 sm:min-h-[500px]">

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
              aria-label="Wishlist"
            >
              <Heart
                size={21}
                className={
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-[#09245f]"
                }
              />
            </button>

            <div className="absolute h-[280px] w-[280px] rounded-full bg-white sm:h-[380px] sm:w-[380px]" />

            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 h-[280px] w-full object-contain transition-transform duration-500 hover:scale-105 sm:h-[390px]"
            />

          </div>

          {/* =========================
              DETAILS
          ========================== */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">

            {/* Category */}
            <span className="w-fit rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-600">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#09245f] sm:text-4xl">
              {product.name}
            </h1>

            {/* Quantity */}
            <p className="mt-2 text-sm text-slate-500">
              {product.quantity}
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">

              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    className={
                      star <= Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-200"
                    }
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-[#09245f]">
                {product.rating}
              </span>

              <span className="text-sm text-slate-400">
                ({product.reviews} reviews)
              </span>

            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">

              <span className="text-3xl font-extrabold text-[#09245f]">
                ₹{product.price}
              </span>

              <span className="text-base text-slate-400 line-through">
                ₹{product.oldPrice}
              </span>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                Save ₹{product.oldPrice - product.price}
              </span>

            </div>

            {/* Description */}
            <div className="mt-6 border-t border-slate-100 pt-6">

              <h2 className="text-sm font-bold text-[#09245f]">
                Product Description
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {product.description}
              </p>

            </div>

            {/* Stock */}
            <div className="mt-5 flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <span className="text-sm font-semibold text-green-600">
                In Stock
              </span>

              <span className="text-xs text-slate-400">
                ({product.stock} available)
              </span>

            </div>

            {/* Quantity */}
            <div className="mt-6">

              <p className="mb-2 text-sm font-bold text-[#09245f]">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-[#09245f] transition hover:bg-blue-50"
                >
                  <Minus size={16} />
                </button>

                <span className="flex h-11 w-12 items-center justify-center border-x border-slate-200 text-sm font-bold text-[#09245f]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-[#09245f] transition hover:bg-blue-50"
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                type="button"
                className="h-12 flex-1 rounded-xl border-2 border-blue-600 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Buy Now
              </button>

            </div>

            {/* Delivery */}
            <div className="mt-7 flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <Truck size={20} />
              </div>

              <div>
                <p className="text-xs font-bold text-[#09245f]">
                  Fast Delivery
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Delivered to your doorstep
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default ProductDetails;