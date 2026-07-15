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

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-6">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
    Browse Categories
  </h2>

  <p className="text-gray-500 dark:text-gray-400 mt-1">
    Find products by category.
  </p>
</div>

        <div className="flex flex-wrap gap-3 mb-10">
          {/* All Button */}
         <button
  onClick={() => setSelectedCategory("")}
  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
    selectedCategory === ""
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
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
          :" bg-white border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-indigo-500"
      }`}
    >
      {category.name}
    </button>
  ))}
        </div>

        <div className="flex items-end justify-between mt-12 mb-8">
  <div>
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
      Latest Products
    </h2>

    <p className="text-gray-500 dark:text-gray-400 mt-1">
      Discover recently added products.
    </p>
  </div>

  <span className="text-sm text-gray-500 dark:text-gray-400">
    {filteredProducts.length} Products
  </span>
</div>

        {filteredProducts.length === 0 ? (
       <div className="flex flex-col items-center justify-center py-20">
  <div className="text-6xl mb-4">📦</div>

  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
    No products found
  </h3>

  <p className="mt-2 text-gray-500 dark:text-gray-400">
    Try changing your search or category.
  </p>
</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
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
