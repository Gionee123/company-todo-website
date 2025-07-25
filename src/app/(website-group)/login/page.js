"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Find user by email
      const user = registeredUsers.find(u => u.email === email);

      if (!user) {
        setError("User not found. Please signup first.");
        setLoading(false);
        return;
      }

      // Check password
      if (user.password !== password) {
        setError("Invalid password.");
        setLoading(false);
        return;
      }

      // Check user status
      if (user.status === 'pending') {
        setError("Your account is pending approval. Please wait for admin approval.");
        setLoading(false);
        return;
      }

      if (user.status === 'rejected') {
        setError("Your account has been rejected. Please contact admin.");
        setLoading(false);
        return;
      }

      if (user.status === 'approved') {
        // Login successful
        const userData = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        // Redirect based on role
        if (user.role === 'admin') {
          window.location.href = '/admin-panel/dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        setError("Account status is invalid. Please contact admin.");
        setLoading(false);
      }

    } catch (error) {
      console.error('Login error:', error);
      setError("Login failed. Please try again.");
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
        </div>
      </form>
    </div>
  );
} 