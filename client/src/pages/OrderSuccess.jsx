import {
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-20">

      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-sm sm:p-10">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
          <CheckCircle2 size={42} />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-[#09245f] sm:text-3xl">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Thank you for shopping with SuperMart.
          Your order has been received successfully.
        </p>

        <div className="mt-6 rounded-2xl bg-blue-50 p-4">

          <p className="text-xs text-slate-500">
            Order Status
          </p>

          <p className="mt-1 text-sm font-bold text-blue-600">
            Order Confirmed
          </p>

        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <Link
            to="/"
            className="flex h-11 flex-1 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Back to Home
          </Link>

          <Link
            to="/products"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
};

export default OrderSuccess;