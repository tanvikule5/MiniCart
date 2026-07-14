import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiPlus,
  FiLogOut,
  FiGrid,
  
} from "react-icons/fi";




function Navbar({
  searchTerm,
  setSearchTerm,
}) {
  const { user,isAuthenticated, logout } =
    useContext(AuthContext);

    console.log("Navbar Auth:", isAuthenticated);

  const navigate = useNavigate();
const [isProfileOpen, setIsProfileOpen] = useState(false);
    const handleLogout = () => {
    logout();
    navigate("/login");
  };

return (
  <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-4">

      {/* Logo */}
      <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
        MiniCart
      </h1>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
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

      {/* Right Section */}
      <div className="flex items-center gap-4">

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
        className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <FiPlus size={18} />
        <span>Add Product</span>

      </Link>


      

    <Link
  to="/favorites"
  className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  <FiHeart size={20} />
</Link>

<div className="relative">
  <button
    onClick={() => setIsProfileOpen(!isProfileOpen)}
    className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    <FiUser size={20} />
  </button>

  {isProfileOpen && (
    <div className="absolute right-0 mt-3 w-60 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl overflow-hidden">

      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-white">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {user?.email}
        </p>
      </div>

      {/* My Profile */}
      <Link
        to="/profile"
        onClick={() => setIsProfileOpen(false)}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <FiUser size={18} />
        <span>My Profile</span>
      </Link>

      {/* My Listings */}
      <Link
        to="/my-listings"
        onClick={() => setIsProfileOpen(false)}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <FiGrid size={18} />
        <span>My Listings</span>
      </Link>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Logout */}
      <button
        onClick={() => {
          setIsProfileOpen(false);
          handleLogout();
        }}
        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
      >
        <FiLogOut size={18} />
        <span>Logout</span>
      </button>

    </div>
  )}
</div>
  
  </>

)}
</div>

</div>
    </nav>
  );
}

export default Navbar;