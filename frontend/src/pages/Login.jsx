import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {
const [formData, setFormData] = useState({
email: "",
password: ""
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const response = await loginUser(formData);

  console.log(response.data);

  localStorage.setItem(
    "token",
    response.data.token
  );

  alert("Login successful!");
} catch (error) {
  console.log(error);
  alert("Login failed!");
}

};

return ( <div className="min-h-screen flex items-center justify-center bg-slate-50"> <form
     onSubmit={handleSubmit}
     className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
   > <h1 className="text-3xl font-bold text-center">
Login </h1>


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

    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-3 rounded-lg"
    >
      Login
    </button>
  </form>
</div>


);
}

export default Login;
