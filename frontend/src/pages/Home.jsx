import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getCategories } from "../services/categoryService";
import { useAuth } from "../context/AuthContext";

function Home() {
const [products, setProducts] = useState([]);
///const [searchTerm, setSearchTerm] = useState("");
const [categories, setCategories] = useState([]);
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

  fetchProducts();
}, []);




return ( <div className="min-h-screen bg-slate-50"> <Navbar />

  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">
      Categories
    </h2>

    <div className="flex flex-wrap gap-3 mb-10">
      
     {categories.map((category) => (
  <button
    key={category.id}
    className="bg-white border rounded-full px-5 py-2 shadow-sm"
  >
     {category.name}
  </button>
))}
    </div>

      


    <h2 className="text-2xl font-bold mb-6">
      Latest Products
    </h2>
{products.length === 0 ? (
  <div className="text-center py-10">
    <h3 className="text-xl font-semibold">
      No products available.
    </h3>

    <p className="text-gray-500">
      Be the first to add one!
    </p>
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => {
  console.log("USER:", user, "PRODUCT SELLER:", product.sellerId);

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

