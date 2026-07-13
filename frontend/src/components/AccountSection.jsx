function AccountSection({ setActiveDrawer }) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">

      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-white">
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings.
        </p>
      </div>

      <button
      type="button"
        onClick={() => setActiveDrawer("password")}
        className="w-full flex justify-between items-center p-5 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition"
      >
        <span>🔒 Change Password</span>
        <span>›</span>
      </button>

      <div className="border-t dark:border-gray-700"></div>

      <button
      type="button"
        onClick={() => setActiveDrawer("delete")}
        className="w-full flex justify-between items-center p-5 hover:bg-red-50 dark:hover:bg-red-900/30 transition text-red-600 dark:text-red-400"
      >
        <span>🗑 Delete Account</span>
        <span>›</span>
      </button>

      <div className="border-t dark:border-gray-700"></div>

      <button
      type="button"
        onClick={() => setActiveDrawer("theme")}
        className="w-full flex justify-between items-center p-5 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition"
      >
        <span>🎨 Theme</span>
        <span>›</span>
      </button>

    </div>
  );
}

export default AccountSection;