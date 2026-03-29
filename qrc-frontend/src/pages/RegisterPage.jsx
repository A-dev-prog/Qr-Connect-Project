import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await registerUser(formData);

      // save JWT token
      localStorage.setItem("token", res.token);

      // redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-[90%] max-w-md border border-gray-800"
      >

        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Create Account
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded text-white font-medium"
        >
          Register
        </button>

        {/* Login link */}
        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default RegisterPage;