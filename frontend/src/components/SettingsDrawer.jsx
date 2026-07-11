import { useState } from "react";
import { changePassword } from "../services/authService";
import toast from "react-hot-toast";

function SettingsDrawer({
  activeDrawer,
  setActiveDrawer,
}) {

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");


const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    toast.error("Please fill all fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await changePassword(
      {
        currentPassword,
        newPassword,
      },
      token
    );

    toast.success("Password changed successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setActiveDrawer(null);

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};
  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          activeDrawer ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setActiveDrawer(null)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform duration-300 z-50 ${
          activeDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-4 border-b p-5">

          <button
          type="button"
            onClick={() => setActiveDrawer(null)}
            className="text-2xl hover:text-indigo-600"
          >
            ←
          </button>

          <h2 className="text-xl font-semibold">
            Settings
          </h2>

        </div>

        {/* Content */}

        <div className="p-6">

             {activeDrawer === "password" && (
  <div className="space-y-5">

    <div>
      <h3 className="text-2xl font-bold">
        Change Password
      </h3>

      <p className="text-gray-500 mt-1">
        Update your password to keep your account secure.
      </p>
    </div>

    <input
      type="password"
      placeholder="Current Password"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      className="w-full border rounded-xl p-3"
    />

    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      className="w-full border rounded-xl p-3"
    />

    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full border rounded-xl p-3"
    />

    <button
    type="button"
  onClick={handleChangePassword}
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 transition"
>
  Save Password
</button>

  </div>
)}


          {activeDrawer === "delete" && (
            <h3 className="text-lg font-semibold text-red-600">
              Delete Account
            </h3>
          )}

          {activeDrawer === "theme" && (
            <h3 className="text-lg font-semibold">
              Theme
            </h3>
          )}

        </div>

      </div>
    </>
  );
}

export default SettingsDrawer;