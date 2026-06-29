function Navbar() {
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

      <div className="flex gap-4">
        <button className="border px-4 py-2 rounded-lg">
          ❤️
        </button>

        <button className="border px-4 py-2 rounded-lg">
          👤
        </button>
      </div>
    </nav>
  );
}

export default Navbar;