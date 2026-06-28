import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <>
      <Navbar />

      <h1>Home Page</h1>

      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </>
  );
}

export default Home;