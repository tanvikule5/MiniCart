import { Link, useNavigate } from "react-router-dom";
import { addFavorite } from "../services/favoriteService";
import { deleteProduct } from "../services/productService";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

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
      <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        
        <div className="relative">
        <img
          src={
    product.images?.[0]?.imageUrl ||
    "https://placehold.co/400x250"
  }
  alt={product.title}
  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
/>

 {!isOwner && !isFavorite && (
    <button
      onClick={handleFavorite}
      className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 dark:bg-gray-800 shadow-md flex items-center justify-center hover:scale-110 transition"
    >
      <FiHeart className="text-red-500" size={20} />
    </button>
  )}
</div>



        <div className="p-5 space-y-3">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {product.title}
          </h3>

          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
  ₹{product.sellingPrice || product.rentPrice}
</p>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
  <span>{product.category?.name}</span>
  <span>•</span>
  <span>{product.condition}</span>
</div>

          {isOwner ? (
            <div className="flex gap-2 mt-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/edit-product/${product.id}`);
                }}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-xl py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FiEdit2 size={16} />
<span>Edit</span>
              </button>

            <button
  onClick={handleDelete}
  className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 dark:border-red-700 dark:text-red-400 rounded-xl py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
>

 <FiTrash2 size={16} />
<span>Delete</span>
</button>
</div>


) : isFavorite ? (
  <button
    onClick={(e) => {
      e.preventDefault();
      onRemoveFavorite(product.id);
    }}
    className="mt-4 w-full border rounded-xl py-2.5 text-red-600 dark:text-red-400 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
  >
    Remove Favorite
  </button>
) : null

}
 
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;