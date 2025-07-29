"use client";
import React, { useEffect, useState } from "react";
import AdminRouteGuard from "@/app/compontent/common/admin/AdminRouteGuard";
import axios from "axios";
import baseUrl from "@/config/api";

export default function UserActions() {
    // let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/backend/users/all-actions`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);

                if (error.response) {
                    console.error('Server error:', error.response.data);
                } else if (error.request) {
                    console.error('Network error:', error.request);
                } else {
                    console.error('Other error:', error.message);
                }
            }
        };

        fetchUsers();
    }, [baseUrl]);

    // Convert rejected user to approved
    const handleConvertToApproved = async (userId) => {
        try {
            setMessage("Converting user status...");

            const response = await axios.post(`${baseUrl}/api/backend/users/convert-rejected-to-approved/${userId}`);

            console.log('✅ User converted successfully!', response.data);

            // Refresh the users list
            const updatedResponse = await axios.get(`${baseUrl}/api/backend/users/all-actions`);
            setUsers(updatedResponse.data);

            setMessage("User successfully converted to approved!");
            setTimeout(() => setMessage(""), 3000);

        } catch (error) {
            console.error('❌ Error converting user:', error);

            if (error.response) {
                const errorMessage = error.response.data?.message || "Error converting user status";
                setMessage(errorMessage);
                console.error('Server error:', error.response.data);
            } else if (error.request) {
                setMessage("Network error. Please try again.");
                console.error('Network error:', error.request);
            } else {
                setMessage("Error converting user status. Please try again.");
                console.error('Other error:', error.message);
            }
        }
    };

    return (
        <AdminRouteGuard>
            <div className="min-h-screen bg-gray-50 p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">User Actions (Approved/Rejected)</h1>

                {message && (
                    <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">
                        {message}
                    </div>
                )}

                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Updated At</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                                <td className={`px-4 py-2 whitespace-nowrap font-bold ${user.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{new Date(user.updatedAt).toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    {user.status === 'rejected' && (
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                            onClick={() => handleConvertToApproved(user._id)}
                                        >
                                            Convert to Approved
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminRouteGuard>
    );
} 