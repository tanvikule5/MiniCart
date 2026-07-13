import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

import {
  getMyProducts,
  deleteProduct
} from "../services/productService";
function MyListings() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await getMyProducts(token);

        console.log(response.data);

        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await deleteProduct(id, token);

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );

    toast.success("Product deleted successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete product");
  }
};
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          My Listings
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
  You haven't added any products yet.
</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
              key={product.id}
              product={product}
              isOwner={true}
                onDelete={handleDelete}
            />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyListings;