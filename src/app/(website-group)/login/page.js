"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem('currentUser');
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

      console.log('🔄 Attempting login to:', `${baseUrl}/api/frontend/users/login`);
      console.log('📧 Email:', email);
      console.log('🔑 Password:', password ? '[HIDDEN]' : '[EMPTY]');

      // API call for login using axios - match the user's API structure
      const response = await axios.post(`${baseUrl}/api/frontend/users/login`, {
        email: email,
        password: password,
        role: 'user' // Add role parameter as required by the controller
      });

      console.log('✅ Login response:', response.data);

      // Check if login was successful based on user's API response structure
      if (response.data.status === false) {
        setError(response.data.message || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Login successful - store token and user data
      const token = response.data.token;
      const role = response.data.role;

      // Store user data in localStorage
      const userData = {
        _id: 'user-id', // You might want to decode JWT token to get user ID
        name: email, // You can get name from JWT token or make another API call
        email: email,
        role: role,
        status: 'approved',
        token: token
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));

      // Redirect based on role
      if (role === 'admin') {
        window.location.href = '/admin-panel/dashboard';
      } else {
        window.location.href = '/dashboard';
      }

    } catch (error) {
      console.error('💥 Login error:', error);

      // Fallback to demo user login if API fails (for testing purposes)
      if (email === 'demo@example.com' && password === 'demo123') {
        console.log('✅ Using fallback demo login');

        const fallbackUserData = {
          _id: 'demo-user-fallback',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'user',
          status: 'approved',
          token: 'demo-token'
        };

        localStorage.setItem('currentUser', JSON.stringify(fallbackUserData));
        window.location.href = '/dashboard';
        return;
      }

      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || "Login failed. Please check your credentials.";
        setError(errorMessage);
        console.error('❌ Server error:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection and try again.");
        console.error('❌ Network error:', error.request);
      } else {
        // Something else happened
        setError("Login failed. Please try again.");
        console.error('❌ Other error:', error.message);
      }
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    router.push('/admin-panel/login');
  };

  // Hide login form if already logged in
  if (isLoggedIn()) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">{error}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600 underline"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              disabled={loading}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded transition mb-3 ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
            }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Admin Login Option */}
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdminLogin}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition mb-3"
          disabled={loading}
        >
          Admin Panel Login
        </button>

        <div className="mt-4 text-center">
          <a href="/signup" className="text-blue-600 underline">Don't have an account? Signup</a>
          <div className="mt-2 text-xs text-gray-500">
            <p>Demo credentials: demo@example.com / demo123</p>
          </div>
        </div>
      </form>
    </div>
  );
} 