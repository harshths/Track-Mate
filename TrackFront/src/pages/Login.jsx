import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", loginData);
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div>
          <h2 className="text-center text-3xl font-bold text-indigo-700">Welcome Back 👋</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              🚀 Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
