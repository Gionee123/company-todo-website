"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem('currentUser');
}

export default function DashboardPage() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication immediately
    const checkAuth = () => {
      if (!isLoggedIn()) {
        router.replace('/login');
        return;
      }
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    // Small delay to ensure localStorage is available
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      const stored = JSON.parse(localStorage.getItem("Todolist")) ?? [];
      setTodos(stored);
    }
  }, [isAuthenticated]);

  const total = todos.length;
  const completed = todos.filter(t => t.isStatus).length;
  const incomplete = total - completed;

  const notifyAdmin = (todo) => {
    // Trigger a localStorage event for admin notification
    localStorage.setItem('admin_notification', JSON.stringify({
      type: 'todo_completed',
      todo,
      timestamp: Date.now(),
    }));
  };

  const changeStatus = (index) => {
    const allItems = [...todos];
    allItems[index]["isStatus"] = !allItems[index]["isStatus"];
    setTodos(allItems);
    // If completed, notify admin
    if (allItems[index]["isStatus"]) {
      notifyAdmin(allItems[index]);
    }
  };

  // Show loading while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <span className="text-2xl font-semibold text-blue-600">{total}</span>
          <span className="text-gray-500">Total Todos</span>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <span className="text-2xl font-semibold text-green-600">{completed}</span>
          <span className="text-gray-500">Completed</span>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <span className="text-2xl font-semibold text-yellow-600">{incomplete}</span>
          <span className="text-gray-500">Incomplete</span>
        </div>
      </div>
      <Link href="/todos" className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700 transition">Go to Todo List</Link>
    </div>
  );
} 