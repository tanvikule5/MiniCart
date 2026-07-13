import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
function Navbar({
  searchTerm,
  setSearchTerm,
}) {
  const { isAuthenticated, logout } =
    useContext(AuthContext);

    console.log("Navbar Auth:", isAuthenticated);

  const navigate = useNavigate();

    const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-col gap-3 p-4 border-b bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white dark:border-gray-700 md:flex-row md:justify-between md:items-center">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
        MiniCart
      </h2>

    <div className="relative w-full md:w-80">
  <FiSearch
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
    size={18}
  />

  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full border rounded-xl pl-10 pr-4 py-2 bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
  />
</div>

<div className="flex gap-4 items-center">
{!isAuthenticated ? (
    <>
      <Link
        to="/login"
        className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        Register
      </Link>
    </>
  ) : (
    <>
      <Link
        to="/add-product"
        className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        ➕ Add Product
      </Link>


      <Link
  to="/my-listings"
  className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  📦 My Listings
</Link>

    <Link
  to="/favorites"
  className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  ❤️
</Link>

      <Link
        to="/profile"
        className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        👤
      </Link>

      <button
        onClick={handleLogout}
        className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        Logout
      </button>
    </>
  )}
</div>
    </nav>
  );
}

export default Navbar;