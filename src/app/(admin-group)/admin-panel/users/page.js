"use client";
import React, { useEffect, useState } from 'react';
import AdminRouteGuard from '@/app/compontent/common/admin/AdminRouteGuard';
import axios from 'axios';
import baseUrl from "@/config/api";

export default function AdminUsers() {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load pending users from API
  useEffect(() => {
    const loadPendingUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/backend/users/pending-users`);
        console.log('Pending users response:', response.data);
        setPendingUsers(response.data);
      } catch (error) {
        console.error('Error loading pending users:', error);

        if (error.response) {
          console.error('Server error:', error.response.data);
        } else if (error.request) {
          console.error('Network error:', error.request);
        } else {
          console.error('Other error:', error.message);
        }
        setPendingUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadPendingUsers();
  }, [baseUrl]);

  // Approve or reject user
  const handleAction = async (id, action) => {
    try {
      setMessage(`Processing ${action}...`);

      let response;
      if (action === 'approve') {
        response = await axios.post(`${baseUrl}/api/backend/users/approve-user/${id}`);
      } else if (action === 'reject') {
        response = await axios.post(`${baseUrl}/api/backend/users/reject-user/${id}`);
      }

      console.log(`✅ User ${action}d successfully!`, response.data);

      // Update local state - remove the user from pending list
      setPendingUsers(prevUsers => prevUsers.filter(user => user._id !== id));

      setMessage(`User ${action}d successfully!`);
      setTimeout(() => setMessage(""), 3000);

    } catch (error) {
      console.error(`❌ Error ${action}ing user:`, error);

      if (error.response) {
        const errorMessage = error.response.data?.message || `Error ${action}ing user`;
        setMessage(errorMessage);
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        setMessage("Network error. Please try again.");
        console.error('Network error:', error.request);
      } else {
        setMessage(`Error ${action}ing user. Please try again.`);
        console.error('Other error:', error.message);
      }
    }
  };

  if (loading) {
    return (
      <AdminRouteGuard>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-xl">Loading pending users...</div>
        </div>
      </AdminRouteGuard>
    );
  }

  return (
    <AdminRouteGuard>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Pending Users</h1>
            <div className="text-sm text-gray-600">
              Pending: {pendingUsers.length}
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
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()} {new Date(user.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          onClick={() => handleAction(user._id, 'approve')}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          onClick={() => handleAction(user._id, 'reject')}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pendingUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-2">No pending users found</p>
                <p className="text-sm">New registrations will appear here for admin approval</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminRouteGuard>
  );
} 