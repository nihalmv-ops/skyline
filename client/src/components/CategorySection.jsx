import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import groceryImage from "../assets/categories/grocery.png";
import dairyImage from "../assets/categories/dairy.png";
import beveragesImage from "../assets/categories/beverages.png";
import snacksImage from "../assets/categories/snacks.png";
import fruitsImage from "../assets/categories/fruits.png";
import vegetablesImage from "../assets/categories/vegetables.png";

const categories = [
  {
    id: 1,
    name: "Grocery",
    items: "200+ items",
    slug: "grocery",
    image: groceryImage,
  },
  {
    id: 2,
    name: "Dairy",
    items: "100+ items",
    slug: "dairy",
    image: dairyImage,
  },
  {
    id: 3,
    name: "Beverages",
    items: "80+ items",
    slug: "beverages",
    image: beveragesImage,
  },
  {
    id: 4,
    name: "Snacks",
    items: "150+ items",
    slug: "snacks",
    image: snacksImage,
  },
  {
    id: 5,
    name: "Fruits",
    items: "120+ items",
    slug: "fruits",
    image: fruitsImage,
  },
  {
    id: 6,
    name: "Vegetables",
    items: "100+ items",
    slug: "vegetables",
    image: vegetablesImage,
  },
];

const CategorySection = () => {
  return (
    <section className="bg-sky-100 px-4 py-12 sm:px-6 md:py-16 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mb-7 text-center">

          <h2 className="text-2xl font-extrabold tracking-tight text-[#09245f] sm:text-3xl md:text-4xl">
            Shop by Category
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Find what you need from our wide range of categories
          </p>

        </div>

        {/* =========================
            CATEGORY GRID
        ========================== */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">

          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="category-card group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
            >

              {/* IMAGE */}
              <div className="category-image-wrapper relative flex h-[145px] items-center justify-center overflow-hidden bg-[#eef8ff] p-3 sm:h-[160px]">

                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />

              </div>

              {/* INFO */}
              <div className="flex items-center justify-between gap-2 bg-white p-3">

                <div className="min-w-0">

                  <h3 className="truncate text-sm font-bold text-[#09245f]">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {category.items}
                  </p>

                </div>

                {/* ARROW */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-blue-600 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">

                  <ArrowRight size={15} />

                </div>

              </div>

            </Link>
          ))}

        </div>

        {/* =========================
            VIEW ALL
        ========================== */}
        <div className="mt-7 flex justify-center">

          <Link
            to="/categories"
            className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
          >
            View All

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>

    </section>
  );
};

export default CategorySection;