"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveLoginDetails } from '../slice/AdminSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000";
    console.log("baseUrl login page", baseUrl);


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    let loginData = useSelector((myAllState) => {
        return myAllState.loginStore.adminDetails;
    });

    // No need to create admin user in localStorage since we're using API now

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log('🔄 Attempting admin login to:', `${baseUrl}/api/backend/adminAuth/login`);
            console.log('👤 Username:', username);
            console.log('🔑 Password:', password ? '[HIDDEN]' : '[EMPTY]');
            console.log('📤 Request payload:', { adminName: username, adminPassword: password });

            // API call for admin login
            const response = await axios.post(`${baseUrl}/api/backend/adminAuth/login`, {
                adminName: username,
                adminPassword: password
            });

            console.log('✅ Admin login response:', response.data);
            console.log('📊 Response status:', response.status);
            console.log('📋 Response headers:', response.headers);

            // Check if login was successful
            if (response.data.success === false) {
                setError(response.data.message || "Login failed. Please check your credentials.");
                setLoading(false);
                return;
            }

            // Login successful
            const adminData = {
                _id: response.data.admin._id,
                adminName: response.data.admin.adminName,
                name: 'Admin User',
                email: 'admin@admin.com',
                role: "admin",
                status: 'approved'
            };

            console.log("Login - Admin data to store:", adminData);

            // Clear any existing admin cookie first
            document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            dispatch(saveLoginDetails({ admin: adminData }));
            console.log("Login - Redirecting to dashboard");
            router.push("/admin-panel/dashboard");

        } catch (error) {
            console.error('❌ Admin login error:', error);

            if (error.response) {
                let errorMessage;

                if (error.response.status === 401) {
                    errorMessage = "Invalid username or password. Please check your credentials.";
                } else if (error.response.status === 400) {
                    errorMessage = "Please provide both username and password.";
                } else {
                    errorMessage = error.response.data?.message || "Login failed. Please try again.";
                }

                setError(errorMessage);
                console.error('Server error:', error.response.data);
            } else if (error.request) {
                setError("Network error. Please check your connection and try again.");
                console.error('Network error:', error.request);
            } else {
                setError("Login failed. Please try again.");
                console.error('Other error:', error.message);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsClient(true);

        // Clear any old admin data that doesn't have role
        const adminData = document.cookie.split('; ').find(row => row.startsWith('admin='));
        if (adminData) {
            try {
                const admin = JSON.parse(decodeURIComponent(adminData.split('=')[1]));
                if (!admin.role) {
                    console.log("Clearing old admin data without role");
                    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }
            } catch (error) {
                console.log("Error parsing admin data, clearing cookie");
                document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
        }
    }, []);

    useEffect(() => {
        if (isClient && loginData) {
            // router.push("/admin-panel/dashboard");
        }
    }, [isClient, loginData, router]);

    // Don't render until client-side hydration is complete
    if (!isClient) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-6"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Panel Login</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                        autoComplete="username"
                        disabled={loading}
                        placeholder="admin"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                            autoComplete="current-password"
                            disabled={loading}
                            placeholder="admin123"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full text-white py-2 rounded transition ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <p className="font-semibold mb-2">Admin Credentials:</p>
                    <p>Username: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin</span></p>
                    <p>Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin123</span></p>
                    <p className="text-xs text-gray-500 mt-2">✅ Auto-created in database</p>
                </div>

                <Link href="/login">

                    <button

                        className={`w-full my-[5px] mx-auto text-white py-2 rounded transition ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-black hover:bg-gray-800'
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "website login"}
                    </button>


                </Link>


            </form>

        </div>
    );
}
