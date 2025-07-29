"use client";
import React, { useEffect, useState } from 'react';
import AdminRouteGuard from '@/app/compontent/common/admin/AdminRouteGuard';
import axios from 'axios';
import baseUrl from "@/config/api";

export default function Dashboard() {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    totalTodos: 0,
    completionPercent: 0
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch pending users
      const pendingUsersResponse = await axios.get(`${baseUrl}/api/backend/users/pending-users`);
      const pendingUsers = pendingUsersResponse.data || [];

      // Fetch all users (approved, rejected, pending)
      const allUsersResponse = await axios.get(`${baseUrl}/api/backend/users/all-actions`);
      const allUsers = allUsersResponse.data || [];

      // Get todos from localStorage (since there's no todos API endpoint)
      const todos = JSON.parse(localStorage.getItem('Todolist') || '[]');

      // Calculate stats
      const totalUsers = allUsers.length;
      const pendingUsersCount = pendingUsers.length;
      const totalTodos = todos.length;
      const completedTodos = todos.filter(todo => todo.isStatus).length;
      const completionPercent = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

      setStats({
        totalUsers,
        pendingUsers: pendingUsersCount,
        totalTodos,
        completionPercent
      });

      // Generate recent activities
      const activities = [];

      // Add recent user registrations
      const recentUsers = allUsers.slice(0, 3);
      recentUsers.forEach(user => {
        activities.push({
          type: 'user_registration',
          message: `New user registered: ${user.name}`,
          time: new Date(user.createdAt || Date.now()).toLocaleString(),
          status: user.status
        });
      });

      // Add recent todo completions
      const recentTodos = todos.filter(todo => todo.isStatus).slice(0, 3);
      recentTodos.forEach(todo => {
        activities.push({
          type: 'todo_completed',
          message: `Todo completed: ${todo.Todolist}`,
          time: new Date().toLocaleString(),
          status: 'completed'
        });
      });

      setRecentActivities(activities.slice(0, 5));
      setLastUpdated(new Date().toLocaleString());

      console.log('✅ Dashboard data loaded:', {
        totalUsers,
        pendingUsers: pendingUsersCount,
        totalTodos,
        completionPercent
      });

    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);

      // Fallback to localStorage data if API fails
      const todos = JSON.parse(localStorage.getItem('Todolist') || '[]');
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      const totalUsers = users.length;
      const pendingUsers = users.filter(u => u.status === 'pending').length;
      const totalTodos = todos.length;
      const completedTodos = todos.filter(t => t.isStatus).length;
      const completionPercent = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

      setStats({ totalUsers, pendingUsers, totalTodos, completionPercent });
      setLastUpdated(new Date().toLocaleString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [baseUrl]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'admin_notification') {
        const data = JSON.parse(e.newValue);
        if (data && data.type === 'todo_completed') {
          setNotification(`User completed a todo: ${data.todo.Todolist || data.todo.title}`);
          setTimeout(() => setNotification(null), 5000);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (loading) {
    return (
      <AdminRouteGuard>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </AdminRouteGuard>
    );
  }

  return (
    <AdminRouteGuard>
      <div className="min-h-screen bg-gray-50 p-6">
        {notification && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded shadow">
            {notification}
          </div>
        )}

        {/* Header with refresh button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-sm text-gray-500">
                Last updated: {lastUpdated}
              </span>
            )}
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
            <span className="text-2xl font-semibold text-blue-600">{stats.totalUsers}</span>
            <span className="text-gray-500">Total Users</span>
          </div>
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
            <span className="text-2xl font-semibold text-yellow-600">{stats.pendingUsers}</span>
            <span className="text-gray-500">Pending Users</span>
          </div>
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
            <span className="text-2xl font-semibold text-green-600">{stats.totalTodos}</span>
            <span className="text-gray-500">Total Todos</span>
          </div>
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
            <span className="text-2xl font-semibold text-purple-600">{stats.completionPercent}%</span>
            <span className="text-gray-500">Completion %</span>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          {recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.status === 'approved' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' :
                        activity.status === 'rejected' ? 'bg-red-500' :
                          'bg-blue-500'
                      }`}></div>
                    <span className="text-gray-700">{activity.message}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No recent activities</p>
            </div>
          )}
        </div>
      </div>
    </AdminRouteGuard>
  );
}
