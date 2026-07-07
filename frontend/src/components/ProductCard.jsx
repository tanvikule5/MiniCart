import { Link } from "react-router-dom";
function ProductCard({ product , isOwner,onDelete})  {
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
    <button className="flex-1 border rounded-lg px-3 py-2 text-blue-600">
      ✏️ Edit
    </button>
<button
  onClick={(e) => {
    e.preventDefault();
    onDelete(product.id);
  }}
  className="flex-1 border rounded-lg px-3 py-2 text-red-600"
>
  🗑️ Delete
</button>
  </div>
) : (
  <button className="mt-3 border rounded-lg px-3 py-2">
    ❤️ Favorite
  </button>
)}
      </div>
    </div>
    </Link>
  );
}

export default ProductCard;