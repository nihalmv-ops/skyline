import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  UserRound,
  ChevronDown,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <header className="absolute left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-5 lg:px-5">
      <div className="mx-auto max-w-[1180px]">

        {/* =========================
            DESKTOP NAVBAR
        ========================== */}
        <div className="hidden h-[57px] items-center rounded-[20px] bg-white px-5 shadow-[0_8px_30px_rgba(30,64,175,0.08)] lg:flex">

          {/* LOGO */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* NAVIGATION */}
          <nav className="ml-auto flex h-full items-center gap-7">

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative flex h-full items-center text-[12px] font-semibold transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-[#09245f] hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}

                    {isActive && (
                      <span className="absolute bottom-[7px] left-0 right-0 mx-auto h-[2px] rounded-full bg-blue-600" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

          </nav>

          {/* RIGHT SIDE */}
          <div className="ml-8 flex items-center gap-3">

            {/* SEARCH */}
            <div className="flex h-[34px] w-[235px] overflow-hidden rounded-full border border-slate-200 bg-white">

              <input
                type="text"
                placeholder="Search products..."
                className="min-w-0 flex-1 bg-transparent px-4 text-[10px] text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                className="flex w-[38px] items-center justify-center bg-blue-600 text-white transition hover:bg-blue-700"
                aria-label="Search"
              >
                <Search size={15} />
              </button>

            </div>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className="relative flex h-8 w-8 items-center justify-center rounded-full text-[#09245f] transition hover:bg-blue-50 hover:text-blue-600"
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.8} />
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              className="relative flex h-8 w-8 items-center justify-center rounded-full text-[#09245f] transition hover:bg-blue-50 hover:text-blue-600"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} strokeWidth={1.8} />

              <span className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-blue-600 px-1 text-[8px] font-bold text-white">
                3
              </span>
            </Link>

            {/* USER */}
            <Link
              to="/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#09245f] transition hover:bg-blue-50 hover:text-blue-600"
              aria-label="Profile"
            >
              <UserRound size={19} strokeWidth={1.8} />
            </Link>

            <ChevronDown
              size={13}
              className="-ml-2 text-[#09245f]"
            />

            {/* LOGIN */}
            <Link
              to="/login"
              className="ml-1 flex h-[32px] items-center justify-center rounded-lg border border-blue-600 px-5 text-[11px] font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Login
            </Link>

          </div>
        </div>

        {/* =========================
            MOBILE NAVBAR
        ========================== */}
        <div className="flex h-[58px] items-center justify-between rounded-[18px] bg-white px-4 shadow-[0_8px_30px_rgba(30,64,175,0.1)] lg:hidden">

          {/* MENU */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#09245f] hover:bg-blue-50"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

          {/* LOGO */}
          <Logo />

          {/* RIGHT */}
          <div className="flex items-center gap-1">

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#09245f]"
              aria-label="Wishlist"
            >
              <Heart size={19} />
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#09245f]"
              aria-label="Cart"
            >
              <ShoppingCart size={19} />

              <span className="absolute right-0 top-0 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-blue-600 px-1 text-[8px] font-bold text-white">
                3
              </span>
            </Link>

          </div>

        </div>

        {/* =========================
            MOBILE MENU
        ========================== */}
        {mobileMenuOpen && (
          <div className="mt-2 overflow-hidden rounded-[18px] bg-white p-4 shadow-xl lg:hidden">

            {/* SEARCH */}
            <div className="mb-3 flex h-10 overflow-hidden rounded-full border border-slate-200">

              <input
                type="text"
                placeholder="Search products..."
                className="min-w-0 flex-1 px-4 text-xs outline-none"
              />

              <button
                type="button"
                className="flex w-11 items-center justify-center bg-blue-600 text-white"
              >
                <Search size={16} />
              </button>

            </div>

            {/* LINKS */}
            <nav className="flex flex-col">

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-semibold ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-[#09245f] hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

            </nav>

            {/* MOBILE LOGIN */}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex h-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white"
            >
              Login
            </Link>

          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;