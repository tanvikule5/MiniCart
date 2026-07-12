import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getFavorites } from "../services/favoriteService";
import { removeFavorite } from "../services/favoriteService";
import toast from "react-hot-toast";
function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await getFavorites(token);

      setFavorites(response.data.favorites);
    } catch (error) {
      console.log(error);
    }
  };

const handleRemoveFavorite = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    await removeFavorite(productId, token);

    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (favorite) => favorite.product.id !== productId
      )
    );

    toast.success("Removed from favorites ❤️");
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to remove favorite"
    );
  }
};


  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          ❤️ My Favorites
        </h1>

        {favorites.length === 0 ? (
          <p className="text-gray-500">
            No favorite products yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {favorites.map((favorite) => (
            <ProductCard
            key={favorite.id}
            product={favorite.product}
            isFavorite={true}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;