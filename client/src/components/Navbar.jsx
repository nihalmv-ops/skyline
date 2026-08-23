import { useState } from "react";

import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  UserRound,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

import Logo from "./Logo";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">

      {/* Main Navbar */}
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

        </nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-2 lg:flex">

          {/* Search */}
          <button
            type="button"
            className="rounded-xl p-2.5 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="rounded-xl p-2.5 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />

            {/* Cart Count */}
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
              0
            </span>
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="ml-2 flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <UserRound size={17} />

            <span>Login</span>
          </Link>

        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 lg:hidden">

          {/* Mobile Cart */}
          <Link
            to="/cart"
            className="relative rounded-xl p-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={21} />

            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
              0
            </span>
          </Link>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="rounded-xl p-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            aria-label={
              mobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
          >
            {mobileMenuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">

          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

            {/* Search */}
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col">

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

            </nav>

            {/* Mobile Extra Links */}
            <div className="mt-3 border-t border-slate-100 pt-3">

              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Heart size={18} />
                Wishlist
              </Link>

              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <UserRound size={18} />
                Login
              </Link>

            </div>

          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;