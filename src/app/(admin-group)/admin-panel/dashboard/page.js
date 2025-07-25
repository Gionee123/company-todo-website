"use client";
import React, { useEffect, useState } from 'react';
import AdminRouteGuard from '@/app/compontent/common/admin/AdminRouteGuard';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, pendingUsers: 0, totalTodos: 0, completionPercent: 0 });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Initialize mock data if not present
    let users = JSON.parse(localStorage.getItem('users'));
    let todos = JSON.parse(localStorage.getItem('todos'));
    if (!users) {
      users = [
        { id: 1, name: 'Amit Kumar', email: 'amit@example.com', status: 'pending', role: 'user' },
        { id: 2, name: 'Priya Singh', email: 'priya@example.com', status: 'approved', role: 'user' },
        { id: 3, name: 'Rahul Verma', email: 'rahul@example.com', status: 'approved', role: 'user' },
        { id: 4, name: 'Sneha Patel', email: 'sneha@example.com', status: 'pending', role: 'user' },
        { id: 5, name: 'Vikas Sharma', email: 'vikas@example.com', status: 'approved', role: 'user' },
      ];
      localStorage.setItem('users', JSON.stringify(users));
    }
    if (!todos) {
      todos = [
        { id: 1, userId: 2, title: 'Finish report', completed: true },
        { id: 2, userId: 3, title: 'Update website', completed: false },
        { id: 3, userId: 3, title: 'Team meeting', completed: true },
        { id: 4, userId: 4, title: 'Fix bug #123', completed: false },
        { id: 5, userId: 5, title: 'Design logo', completed: true },
      ];
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    const totalUsers = users.length;
    const pendingUsers = users.filter(u => u.status === 'pending').length;
    const totalTodos = todos.length;
    const completedTodos = todos.filter(t => t.completed).length;
    const completionPercent = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0;
    setStats({ totalUsers, pendingUsers, totalTodos, completionPercent });
  }, []);

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

  return (
    <AdminRouteGuard>
      <div className="min-h-screen bg-gray-50 p-6">
        {notification && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded shadow">
            {notification}
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
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
      </div>
    </AdminRouteGuard>
  );
}
