import { Link } from "react-router-dom";
function ProductCard({
  id,
  title,
  price,
  condition,
  image
}) {
  return (
     <Link to={`/product/${id}`}>
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={
          image ||
          "https://placehold.co/400x250"
        }
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <p className="text-indigo-700 font-bold mt-2">
          ₹{price}
        </p>

        <p className="text-gray-500 mt-1">
          {condition}
        </p>

        <button className="mt-3 border rounded-lg px-3 py-2">
          ❤️ Favorite
        </button>
      </div>
    </div>
    </Link>
  );
}

export default ProductCard;