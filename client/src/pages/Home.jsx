import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import PopularProducts from "../components/PopularProducts";


const Home = () => {
  return (
    <>
      <Hero />
      <CategorySection />
        <PopularProducts />
    </>
  );
};

export default Home;