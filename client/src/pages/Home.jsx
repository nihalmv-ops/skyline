import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="hero-gradient">

      <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2">

        <div>

          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Fresh products • Fast delivery
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Everything you need,
            <span className="block text-green-600">
              in one place.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Shop groceries, beverages, snacks, dairy products
            and everyday essentials from SuperMart.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/products"
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
            >
              Shop Now
            </Link>

            <Link
              to="/categories"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold transition hover:border-green-500 hover:text-green-600"
            >
              Browse Categories
            </Link>

          </div>

        </div>

        <div className="hidden md:block">
          <div className="hero-card rounded-3xl border bg-white p-8 shadow-xl">

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-green-50 p-6">
                <div className="text-4xl">🥛</div>
                <p className="mt-3 font-semibold">
                  Dairy
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-6">
                <div className="text-4xl">🍎</div>
                <p className="mt-3 font-semibold">
                  Fruits
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-6">
                <div className="text-4xl">🍪</div>
                <p className="mt-3 font-semibold">
                  Snacks
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6">
                <div className="text-4xl">🥤</div>
                <p className="mt-3 font-semibold">
                  Beverages
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

export default Home;