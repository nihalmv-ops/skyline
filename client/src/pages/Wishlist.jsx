import {
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">

        <div className="mx-auto flex min-h-[500px] max-w-4xl items-center justify-center">

          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Heart size={35} />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-[#09245f]">
              Your Wishlist is Empty
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Save your favourite products here.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Explore Products
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-7 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-extrabold text-[#09245f] sm:text-3xl">
              My Wishlist
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {wishlistItems.length} saved product
              {wishlistItems.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs font-semibold text-red-500 hover:text-red-600"
          >
            Clear Wishlist
          </button>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">

          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              {/* REMOVE */}
              <button
                type="button"
                onClick={() =>
                  removeFromWishlist(product.id)
                }
                className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                aria-label={`Remove ${product.name}`}
              >
                <Trash2 size={15} />
              </button>

              {/* IMAGE */}

              <Link
                to={`/products/${product.id}`}
                className="flex h-48 items-center justify-center bg-[#eef8ff] p-5"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </Link>

              {/* DETAILS */}

              <div className="p-4">

                <Link
                  to={`/products/${product.id}`}
                  className="block truncate text-sm font-bold text-[#09245f] hover:text-blue-600"
                >
                  {product.name}
                </Link>

                <p className="mt-1 text-xs text-slate-500">
                  {product.quantity}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">

                  <p className="text-lg font-extrabold text-[#09245f]">
                    ₹{product.price}
                  </p>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex h-9 items-center gap-1.5 rounded-full bg-blue-600 px-3 text-[11px] font-bold text-white transition hover:bg-blue-700"
                  >
                    <ShoppingCart size={14} />
                    Add
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
};

export default Wishlist;