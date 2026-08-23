import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">

        <div className="mx-auto flex min-h-[500px] max-w-4xl items-center justify-center">

          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <ShoppingCart size={35} />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-[#09245f]">
              Your Cart is Empty
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add some products to your cart and they will appear here.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Start Shopping
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
              Shopping Cart
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review your selected products
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold text-red-500 hover:text-red-600"
          >
            Clear Cart
          </button>

        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* PRODUCTS */}
          <div className="space-y-3">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >

                {/* IMAGE */}
                <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-[#eef8ff] sm:w-28">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain p-3"
                  />

                </div>

                {/* DETAILS */}
                <div className="flex-1">

                  <h2 className="text-sm font-bold text-[#09245f]">
                    {item.name}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.quantity}
                  </p>

                  <p className="mt-2 text-base font-extrabold text-[#09245f]">
                    ₹{item.price}
                  </p>

                </div>

                {/* QUANTITY */}
                <div className="flex items-center rounded-xl border border-slate-200">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-blue-50"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="flex h-9 w-10 items-center justify-center border-x border-slate-200 text-sm font-bold text-[#09245f]">
                    {item.cartQuantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-blue-50"
                  >
                    <Plus size={14} />
                  </button>

                </div>

                {/* TOTAL */}
                <div className="flex items-center justify-between gap-4 sm:block sm:text-right">

                  <p className="text-base font-extrabold text-[#09245f]">
                    ₹{item.price * item.cartQuantity}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="mt-1 text-red-500 transition hover:text-red-600"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* SUMMARY */}
          <div className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

            <h2 className="text-lg font-extrabold text-[#09245f]">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3 border-b border-slate-100 pb-5">

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span className="font-semibold text-[#09245f]">
                  ₹{cartTotal}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Delivery
                </span>

                <span className="font-semibold text-green-600">
                  FREE
                </span>
              </div>

            </div>

            <div className="mt-5 flex justify-between">

              <span className="text-base font-bold text-[#09245f]">
                Total
              </span>

              <span className="text-xl font-extrabold text-blue-600">
                ₹{cartTotal}
              </span>

            </div>

            <button
              type="button"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Cart;