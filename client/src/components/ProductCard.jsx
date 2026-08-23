import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const {
  toggleWishlist,
  isInWishlist,
} = useWishlist();

const wishlisted = isInWishlist(product.id);

  return (
    <div className="product-card group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <button
  type="button"
  onClick={() => toggleWishlist(product)}
  className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:scale-105"
  aria-label={
    wishlisted
      ? "Remove from wishlist"
      : "Add to wishlist"
  }
>
  <Heart
    size={17}
    className={
      wishlisted
        ? "fill-red-500 text-red-500"
        : "text-[#09245f]"
    }
  />
</button>

      {/* =========================
          PRODUCT IMAGE
      ========================== */}
      <div className="product-image-container flex h-[190px] items-center justify-center overflow-hidden bg-white p-5 sm:h-[205px]">

        <Link
          to={`/products/${product.id}`}
          className="flex h-full w-full items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-image h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

      </div>

      {/* =========================
          PRODUCT DETAILS
      ========================== */}
      <div className="p-4">

        {/* Product Name */}
        <Link
          to={`/products/${product.id}`}
          className="block truncate text-sm font-bold text-[#09245f] transition-colors hover:text-blue-600"
        >
          {product.name}
        </Link>

        {/* Quantity */}
        <p className="mt-1 text-xs text-slate-500">
          {product.quantity}
        </p>

        {/* =========================
            RATING
        ========================== */}
        <div className="mt-2 flex items-center gap-1">

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                className={
                  star <= Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-200"
                }
              />
            ))}
          </div>

          <span className="text-[10px] text-slate-400">
            ({product.reviews})
          </span>

        </div>

        {/* =========================
            PRICE + CART
        ========================== */}
        <div className="mt-3 flex items-center justify-between gap-2">

          {/* Price */}
          <div>
            <p className="text-lg font-extrabold text-[#09245f]">
              ₹{product.price}
            </p>

            {product.oldPrice && (
              <p className="text-[10px] text-slate-400 line-through">
                ₹{product.oldPrice}
              </p>
            )}
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex h-9 items-center gap-1.5 rounded-full bg-blue-600 px-3.5 text-[11px] font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;