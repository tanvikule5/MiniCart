import { Link, useNavigate } from "react-router-dom";
import { addFavorite } from "../services/favoriteService";
import { deleteProduct } from "../services/productService";
import toast from "react-hot-toast";

function ProductCard({
  product,
  isOwner,
  onDelete,
  isFavorite,
  onRemoveFavorite,
}) {
  const navigate = useNavigate();
  //favorite
  const handleFavorite = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.success("Please login first.");
        return;
      }

      await addFavorite(product.id, token);

      toast.success("Added to favorites ❤️");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add favorite"
      );
    }
  };
  
  const handleDelete = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await deleteProduct(product.id, token);

    toast.success("Product deleted successfully");

    window.location.reload();
  } catch (error) {
    console.log(error.response?.data);
    console.log(error);
    toast.error("Delete failed");
  }
};

console.log("isOwner:", isOwner);
console.log("isFavorite:", isFavorite);

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 border dark:border-gray-700">
        <img
          src={
            product.images?.[0]?.imageUrl ||
            "https://placehold.co/400x250"
          }
          alt={product.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {product.title}
          </h3>

          <p className="text-indigo-700 dark:text-indigo-400 font-bold mt-2">
            ₹{product.sellingPrice || product.rentPrice}
          </p>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {product.condition}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {product.category?.name}
          </p>

          {isOwner ? (
            <div className="flex gap-2 mt-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/edit-product/${product.id}`);
                }}
                className="flex-1 border rounded-lg px-3 py-2 text-blue-600 dark:text-blue-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                ✏️ Edit
              </button>

            <button
  onClick={handleDelete}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
>
  Delete
</button>
            </div>


  ) : isFavorite ? (
  <button
    onClick={(e) => {
      e.preventDefault();
      onRemoveFavorite(product.id);
    }}
    className="mt-3 w-full border rounded-lg px-3 py-2 text-red-600 dark:text-red-400 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
    >🗑 Remove Favorite
  </button>
) : (
  <button
    onClick={handleFavorite}
    className="mt-3 w-full border rounded-lg px-3 py-2 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
  >
    ❤️ Favorite
  </button>
)}
 
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;