import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      product.category?.name === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Categories
        </h2>

        <div className="flex flex-wrap gap-3 mb-10">
          {/* All Button */}
         <button
  onClick={() => setSelectedCategory("")}
  className={`px-5 py-2 rounded-full transition ${
    selectedCategory === ""
      ? "bg-indigo-600 text-white"
      : "bg-white border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
  }`}
>
  All
</button>

          {/* Categories */}
          {[...categories]
  .sort((a, b) => {
    if (a.name === "Others") return 1;
    if (b.name === "Others") return -1;
    return a.name.localeCompare(b.name);
  })
  .map((category) => (
    <button
      key={category.id}
      onClick={() => setSelectedCategory(category.name)}
      className={`px-5 py-2 rounded-full transition ${
        selectedCategory === category.name
          ? "bg-indigo-600 text-white"
          : "bg-white border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      }`}
    >
      {category.name}
    </button>
  ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">
          Latest Products
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold">
              No products found.
            </h3>

            <p className="text-gray-500 dark:text-gray-400">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
 
  return (
    <ProductCard
      key={product.id}
      product={product}
      isOwner={user?.id === product.sellerId}
    />
  );
})}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
