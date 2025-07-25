"use client";
import React, { useEffect, useState } from "react";
import AdminRouteGuard from "@/app/compontent/common/admin/AdminRouteGuard";

export default function UserActions() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/backend/users/all-actions")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <AdminRouteGuard>
            <div className="min-h-screen bg-gray-50 p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">User Actions (Approved/Rejected)</h1>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Updated At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                                <td className={`px-4 py-2 whitespace-nowrap font-bold ${user.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{new Date(user.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminRouteGuard>
    );
} 