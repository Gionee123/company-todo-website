"use client";
import React, { useEffect, useState } from "react";
import AdminRouteGuard from "@/app/compontent/common/admin/AdminRouteGuard";

export default function UserActions() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Load real users from localStorage
        const loadUsers = () => {
            try {
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                // Filter to show only approved and rejected users
                const filteredUsers = registeredUsers.filter(user =>
                    user.status === 'approved' || user.status === 'rejected'
                );
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error loading users:', error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();

        // Listen for storage changes (when new users register)
        const handleStorageChange = () => {
            loadUsers();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleConvertToApproved = async (userId) => {
        try {
            setMessage("Converting user status...");

            // Update in localStorage
            const allUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const updatedUsers = allUsers.map(user =>
                user._id === userId
                    ? { ...user, status: 'approved', updatedAt: new Date().toISOString() }
                    : user
            );

            localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

            // Update local state
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId
                        ? { ...user, status: 'approved', updatedAt: new Date().toISOString() }
                        : user
                )
            );

            setMessage("User successfully converted to approved!");
            setTimeout(() => setMessage(""), 3000);

        } catch (error) {
            setMessage("Error converting user status");
            console.error(error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-600 bg-green-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <AdminRouteGuard>
                <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                    <div className="text-xl">Loading users...</div>
                </div>
            </AdminRouteGuard>
        );
    }

    return (
        <AdminRouteGuard>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">User Actions Management</h1>
                        <div className="text-sm text-gray-600">
                            Total Users: {users.length}
                        </div>
                    </div>

                    {message && (
                        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">
                            {message}
                        </div>
                    )}

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User Info
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registration Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Updated
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.updatedAt).toLocaleDateString()} {new Date(user.updatedAt).toLocaleTimeString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {user.status === 'rejected' && (
                                                <button
                                                    onClick={() => handleConvertToApproved(user._id)}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                >
                                                    Convert to Approved
                                                </button>
                                            )}
                                            {user.status === 'approved' && (
                                                <span className="text-green-600 text-sm">✓ Already Approved</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {users.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p className="text-lg mb-2">No approved or rejected users found</p>
                                <p className="text-sm">Users will appear here after they are approved or rejected by admin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminRouteGuard>
    );
} 