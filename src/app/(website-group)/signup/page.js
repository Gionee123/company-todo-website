"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // 👈 जरूरी field
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log('🔄 Processing registration...');

      // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const baseUrl = "https://ipage-api.onrender.com" || "http://localhost:5000";
      console.log('🔄 Attempting registration to:', `${baseUrl}/api/frontend/users/register`);
      console.log('📝 Form data:', { ...formData, password: '[HIDDEN]' });

      // API call for registration using axios - match the user's API structure
      const response = await axios.post(`${baseUrl}/api/frontend/users/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      console.log('✅ Registration response:', response.data);

      // Check if registration was successful
      if (response.data.status === false) {
        setError(response.data.message || "Registration failed. Please try again.");
        return;
      }

      setSuccess("Signup successful! Please wait for admin approval.");

      // Clear form after successful registration
      setFormData({ name: "", email: "", password: "", role: "user" });

    } catch (error) {
      console.error('💥 Registration error:', error);

      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || "Registration failed. Please try again.";
        setError(errorMessage);
        console.error('❌ Server error:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection and try again.");
        console.error('❌ Network error:', error.request);
      } else {
        // Something else happened
        setError("Registration failed. Please try again.");
        console.error('❌ Other error:', error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h1>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-600 text-sm text-center">{success}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded px-3 py-2"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600 underline"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-600 underline">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
} 