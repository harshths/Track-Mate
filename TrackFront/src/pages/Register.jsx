import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ 
      ...user, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", user);
      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-200 to-pink-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-700">Create your account 🎉</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-pink-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={user.username}
              onChange={handleChange}
              placeholder="john_doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={user.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
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
              autoComplete="new-password"
              required
              value={user.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              ✍️ Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
