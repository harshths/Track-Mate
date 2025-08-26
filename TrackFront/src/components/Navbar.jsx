import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 shadow-md sticky top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white text-2xl md:text-3xl font-bold tracking-wide">
              <span className="text-yellow-200">Track</span>Mate
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:bg-white hover:text-pink-600 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button (non-functional for now) */}
          <div className="md:hidden">
            <button className="text-white hover:text-gray-200 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
