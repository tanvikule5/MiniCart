import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const { isAuthenticated, logout } =
    useContext(AuthContext);

    console.log("Navbar Auth:", isAuthenticated);

  const navigate = useNavigate();

    const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-col gap-3 p-4 border-b md:flex-row md:justify-between md:items-center">
      <h2 className="text-2xl font-bold text-indigo-700">
        MiniCart
      </h2>

      <input
        type="text"
        placeholder="Search products..."
        className="border rounded-lg px-4 py-2 w-full md:w-80"
      />

      <div className="flex gap-4 items-center">


{!isAuthenticated ? (
    <>
      <Link
        to="/login"
        className="border px-4 py-2 rounded-lg"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="border px-4 py-2 rounded-lg"
      >
        Register
      </Link>
    </>
  ) : (
    <>
      <Link
        to="/add-product"
        className="border px-4 py-2 rounded-lg"
      >
        ➕ Add Product
      </Link>


      <Link
  to="/my-listings"
  className="border px-4 py-2 rounded-lg"
>
  📦 My Listings
</Link>

    <Link
  to="/favorites"
  className="border px-4 py-2 rounded-lg"
>
  ❤️
</Link>

      <Link
        to="/profile"
        className="border px-4 py-2 rounded-lg"
      >
        👤
      </Link>

      <button
        onClick={handleLogout}
        className="border px-4 py-2 rounded-lg"
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