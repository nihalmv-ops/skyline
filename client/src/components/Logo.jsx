import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2"
      aria-label="SuperMart Home"
    >
      {/* Logo Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 transition duration-300 group-hover:bg-blue-700">
        <ShoppingBasket size={22} strokeWidth={2.2} />
      </div>

      {/* Logo Text */}
      <div className="leading-none">
        <h1 className="text-xl font-extrabold tracking-tight text-blue-700">
          Skyline<span className="text-slate-900">Supermarket</span>
        </h1>

        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Fresh • Fast • Reliable
        </p>
      </div>
    </Link>
  );
};

export default Logo;