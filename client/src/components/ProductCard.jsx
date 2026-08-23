import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Wishlist */}
      <button
        type="button"
        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#09245f] shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600"
        aria-label={`Add ${product.name} to wishlist`}
      >
        <Heart
          size={17}
          strokeWidth={1.8}
        />
      </button>

      {/* Product Image */}
      <div className="product-image-container flex h-[190px] items-center justify-center overflow-hidden bg-white p-5 sm:h-[205px]">

        <img
          src={product.image}
          alt={product.name}
          className="product-image h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

      </div>

      {/* Product Details */}
      <div className="p-4">

        {/* Product Name */}
        <h3 className="truncate text-sm font-bold text-[#09245f]">
          {product.name}
        </h3>

        {/* Quantity */}
        <p className="mt-1 text-xs text-slate-500">
          {product.quantity}
        </p>

        {/* Rating */}
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

        {/* Price + Cart */}
        <div className="mt-3 flex items-center justify-between gap-2">

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

          <button
            type="button"
            onClick={() => onAddToCart(product)}
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