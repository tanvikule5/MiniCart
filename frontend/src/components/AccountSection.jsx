function AccountSection({ setActiveDrawer }) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">

      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">
          Account
        </h2>

        <p className="text-gray-500 mt-1">
          Manage your account settings.
        </p>
      </div>

      <button
      type="button"
        onClick={() => setActiveDrawer("password")}
        className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition"
      >
        <span>🔒 Change Password</span>
        <span>›</span>
      </button>

      <div className="border-t"></div>

      <button
      type="button"
        onClick={() => setActiveDrawer("delete")}
        className="w-full flex justify-between items-center p-5 hover:bg-red-50 transition text-red-600"
      >
        <span>🗑 Delete Account</span>
        <span>›</span>
      </button>

      <div className="border-t"></div>

      <button
      type="button"
        onClick={() => setActiveDrawer("theme")}
        className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition"
      >
        <span>🎨 Theme</span>
        <span>›</span>
      </button>

    </div>
  );
}

export default AccountSection;