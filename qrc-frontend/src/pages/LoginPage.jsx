import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

function LoginPage() {

  const navigate = useNavigate();

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

      const res = await loginUser(formData);

      // save JWT token
      localStorage.setItem("token", res.token);

      // navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-[90%] max-w-md shadow-lg border border-gray-700"
      >

        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Login to QR Connect
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />

        {/* Login Button */}
        <button
        toast="Logging in successfully..."
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded text-white font-medium"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default LoginPage;