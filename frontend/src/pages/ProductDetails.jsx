import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  if (!product) {
    return <h1 className="p-6 text-xl">Loading...</h1>;
  }

  return (
    <div className="p-6">
      <img
        src={
          product.images?.[0]?.imageUrl ||
          "https://placehold.co/400x250"
        }
        alt={product.title}
        className="w-80 rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-4">
        {product.title}
      </h1>

      <p className="text-xl text-indigo-700 mt-2">
        ₹{product.sellingPrice || product.rentPrice}
      </p>

      <p className="mt-2">
        <b>Condition:</b> {product.condition}
      </p>

      <p className="mt-2">
        {product.description}
      </p>
    </div>
  );
}

export default ProductDetails;