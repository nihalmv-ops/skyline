import { useState } from "react";
import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShoppingBag,
  Smartphone,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const deliveryCharge = cartTotal >= 500 ? 0 : 40;

  const finalTotal = cartTotal + deliveryCharge;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const order = {
      customer: formData,
      items: cartItems,
      subtotal: cartTotal,
      deliveryCharge,
      total: finalTotal,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    console.log("Order:", order);

    clearCart();

    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">

        <div className="mx-auto flex min-h-[500px] max-w-4xl items-center justify-center">

          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <ShoppingBag size={35} />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-[#09245f]">
              Your Cart is Empty
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add products before going to checkout.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Continue Shopping
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

        <div className="mb-7">

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          <h1 className="mt-4 text-2xl font-extrabold text-[#09245f] sm:text-3xl">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Complete your order details
          </p>

        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid gap-6 lg:grid-cols-[1fr_380px]"
        >

          {/* LEFT SIDE */}

          <div className="space-y-6">

            {/* CUSTOMER INFORMATION */}

            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <ShoppingBag size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-[#09245f]">
                    Customer Information
                  </h2>

                  <p className="text-xs text-slate-400">
                    Enter your contact details
                  </p>
                </div>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.fullName}
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  error={errors.phone}
                  maxLength={10}
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    type="email"
                    error={errors.email}
                  />
                </div>

              </div>

            </section>

            {/* DELIVERY ADDRESS */}

            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <MapPin size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-[#09245f]">
                    Delivery Address
                  </h2>

                  <p className="text-xs text-slate-400">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House / Building / Street"
                  error={errors.address}
                />

                <div className="grid gap-4 sm:grid-cols-3">

                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    error={errors.city}
                  />

                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    error={errors.state}
                  />

                  <Input
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    error={errors.pincode}
                    maxLength={6}
                  />

                </div>

              </div>

            </section>

            {/* PAYMENT */}

            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6">

                <h2 className="text-lg font-extrabold text-[#09245f]">
                  Payment Method
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Choose how you want to pay
                </p>

              </div>

              <div className="space-y-3">

                <PaymentOption
                  value="cod"
                  current={paymentMethod}
                  onChange={setPaymentMethod}
                  icon={<Banknote size={20} />}
                  title="Cash on Delivery"
                  description="Pay when your order arrives"
                />

                <PaymentOption
                  value="upi"
                  current={paymentMethod}
                  onChange={setPaymentMethod}
                  icon={<Smartphone size={20} />}
                  title="UPI"
                  description="Google Pay, PhonePe, Paytm and more"
                />

                <PaymentOption
                  value="card"
                  current={paymentMethod}
                  onChange={setPaymentMethod}
                  icon={<CreditCard size={20} />}
                  title="Credit / Debit Card"
                  description="Secure card payment"
                />

              </div>

              {paymentMethod !== "cod" && (
                <div className="mt-4 rounded-xl bg-blue-50 p-4 text-xs text-blue-700">
                  Payment gateway integration will be added in the next backend/payment stage.
                </div>
              )}

            </section>

          </div>

          {/* RIGHT SIDE */}

          <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">

            <h2 className="text-lg font-extrabold text-[#09245f]">
              Order Summary
            </h2>

            {/* PRODUCTS */}

            <div className="mt-5 max-h-[300px] space-y-4 overflow-y-auto pr-1">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eef8ff]">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-2"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-xs font-bold text-[#09245f]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Qty: {item.cartQuantity}
                    </p>

                  </div>

                  <p className="text-sm font-bold text-[#09245f]">
                    ₹{item.price * item.cartQuantity}
                  </p>

                </div>
              ))}

            </div>

            {/* TOTALS */}

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">

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
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </span>

              </div>

            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

              <span className="font-bold text-[#09245f]">
                Total
              </span>

              <span className="text-2xl font-extrabold text-blue-600">
                ₹{finalTotal}
              </span>

            </div>

            <button
              type="submit"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <CheckCircle2 size={18} />
              Place Order
            </button>

            <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
              By placing this order, you agree to our terms and conditions.
            </p>

          </aside>

        </form>

      </div>

    </main>
  );
};

/* =========================================
   INPUT COMPONENT
========================================= */

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  maxLength,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-bold text-[#09245f]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#09245f] outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          error
            ? "border-red-400"
            : "border-slate-200"
        }`}
      />

      {error && (
        <p className="mt-1 text-[11px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

/* =========================================
   PAYMENT OPTION
========================================= */

const PaymentOption = ({
  value,
  current,
  onChange,
  icon,
  title,
  description,
}) => {
  const selected = value === current;

  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 hover:border-blue-200"
      }`}
    >

      <input
        type="radio"
        name="payment"
        value={value}
        checked={selected}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="sr-only"
      />

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          selected
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-sm font-bold text-[#09245f]">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-400">
          {description}
        </p>

      </div>

      <div
        className={`h-4 w-4 rounded-full border-2 ${
          selected
            ? "border-blue-600 bg-blue-600"
            : "border-slate-300"
        }`}
      />

    </label>
  );
};

export default Checkout;