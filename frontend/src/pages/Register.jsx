import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
phoneNumber: "",
department: "",
year: ""
});
console.log(req.body);
const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const response = await registerUser(formData);

  console.log(response.data);
  alert("Registration successful!");

  setFormData({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    department: "",
    year: ""
  });
} catch (error) {
  console.log(error);

  return res.status(500).json({
    success: false,
    message: error.message
  });
}

};

return ( <div className="min-h-screen flex items-center justify-center bg-slate-50"> <form
     onSubmit={handleSubmit}
     className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
   > <h1 className="text-3xl font-bold text-center">
Register </h1>


    <input
      type="text"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg"
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg"
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg"
    />

    <input
      type="text"
      name="phoneNumber"
      placeholder="Phone Number"
      value={formData.phoneNumber}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg"
    />

    <input
      type="text"
      name="department"
      placeholder="Department"
      value={formData.department}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg"
    />

    <input
      type="number"
      name="year"
      placeholder="Year"
      value={formData.year}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg"
    />

    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-3 rounded-lg"
    >
      Register
    </button>
  </form>
</div>

);
}

export default Register;
