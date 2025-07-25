"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveLoginDetails } from '../slice/AdminSlice';
import { useRouter } from 'next/navigation';

export default function Login() {
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

    // Create specific admin user if not exists
    useEffect(() => {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const adminExists = registeredUsers.find(user => user._id === '6883a2e0a1a1ed7dd45f0eed');

        if (!adminExists) {
            const specificAdmin = {
                _id: '6883a2e0a1a1ed7dd45f0eed',
                adminName: 'admin',
                adminPassword: 'admin123',
                name: 'Admin User',
                email: 'admin@admin.com',
                password: 'admin123',
                role: 'admin',
                status: 'approved',
                createdAt: '2025-07-25T15:29:36.775+00:00',
                updatedAt: '2025-07-25T15:29:36.775+00:00',
                __v: 0
            };

            registeredUsers.push(specificAdmin);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            console.log('Specific admin user created:', specificAdmin.adminName);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Get registered users from localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            // Find admin user by adminName or email
            const adminUser = registeredUsers.find(u =>
                (u.adminName === username || u.email === username) && u.role === 'admin'
            );

            if (!adminUser) {
                setError("Admin user not found.");
                setLoading(false);
                return;
            }

            // Check password (try both adminPassword and password fields)
            const isPasswordValid = adminUser.adminPassword === password || adminUser.password === password;

            if (!isPasswordValid) {
                setError("Invalid password.");
                setLoading(false);
                return;
            }

            // Check if admin is approved
            if (adminUser.status !== 'approved') {
                setError("Admin account is not active.");
                setLoading(false);
                return;
            }

            // Login successful
            const adminWithRole = {
                ...adminUser,
                role: "admin"
            };

            console.log("Login - Admin data to store:", adminWithRole);

            // Clear any existing admin cookie first
            document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            dispatch(saveLoginDetails({ admin: adminWithRole }));
            console.log("Login - Redirecting to dashboard");
            router.push("/admin-panel/dashboard");

        } catch (err) {
            console.error('Admin login error:', err);
            setError("Login failed. Please try again.");
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
                    <p>Admin Credentials:</p>
                    <p>Username: admin</p>
                    <p>Password: admin123</p>
                </div>
            </form>
        </div>
    );
}
