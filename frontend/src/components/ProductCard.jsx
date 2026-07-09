import { Link, useNavigate } from "react-router-dom";
import { addFavorite } from "../services/favoriteService";
import { deleteProduct } from "../services/productService";
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
        alert("Please login first.");
        return;
      }

      await addFavorite(product.id, token);

      alert("Added to favorites ❤️");
    } catch (error) {
      console.log(error);

      alert(
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

    alert("Product deleted successfully");

    window.location.reload();
  } catch (error) {
    console.log(error.response?.data);
    console.log(error);
    alert("Delete failed");
  }
};

console.log("isOwner:", isOwner);
console.log("isFavorite:", isFavorite);

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300">
        <img
          src={
            product.images?.[0]?.imageUrl ||
            "https://placehold.co/400x250"
          }
          alt={product.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg">
            {product.title}
          </h3>

          <p className="text-indigo-700 font-bold mt-2">
            ₹{product.sellingPrice || product.rentPrice}
          </p>

          <p className="text-gray-500 mt-1">
            {product.condition}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            {product.category?.name}
          </p>

          {isOwner ? (
            <div className="flex gap-2 mt-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/edit-product/${product.id}`);
                }}
                className="flex-1 border rounded-lg px-3 py-2 text-blue-600"
              >
                ✏️ Edit
              </button>

            <button
  onClick={handleDelete}
  className="bg-red-500 text-white px-4 py-2 rounded-xl"
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
    className="mt-3 w-full border rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
  >
    🗑 Remove Favorite
  </button>
) : (
  <button
    onClick={handleFavorite}
    className="mt-3 w-full border rounded-lg px-3 py-2 hover:bg-red-50 transition"
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