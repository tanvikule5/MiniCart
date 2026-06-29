import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
const [products, setProducts] = useState([]);

const categories = [
"Books",
"Notes",
"Uniforms",
"Electronics",
"Others"
];

useEffect(() => {
getProducts();
}, []);

const getProducts = async () => {
try {
const response = await api.get("/products");
setProducts(response.data.products);
} catch (error) {
console.log(error);
}
};

return ( <div className="min-h-screen bg-slate-50"> <Navbar />

  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">
      Categories
    </h2>

    <div className="flex flex-wrap gap-3 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          className="bg-white border rounded-full px-5 py-2 shadow-sm"
        >
          {category}
        </button>
      ))}
    </div>

    <h2 className="text-2xl font-bold mb-6">
      Latest Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
        key={product.id}
        id={product.id}
        title={product.title}
        price={product.sellingPrice || product.rentPrice}
        condition={product.condition}
        image={product.images?.[0]?.imageUrl}
        />
      ))}
    </div>
  </div>
</div>


);
}

export default Home;
