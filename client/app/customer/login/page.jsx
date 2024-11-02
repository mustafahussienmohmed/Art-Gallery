"use client";

import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md transition ${
              loading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
            } text-white`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex justify-between items-center my-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="mx-4 text-gray-500">Or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            <FaFacebook className="mr-2" />
            Login with Facebook
          </button>
          <button className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
            <FaGoogle className="mr-2" />
            Login with Google
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/customer/signup" className="text-yellow-500">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
