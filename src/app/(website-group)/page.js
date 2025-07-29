"use client";
import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';

function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem('currentUser');
}

export default function Home() {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";


  const router = useRouter();
  const [Todolist, setTodolist] = useState("");
  const [allDolist, setallDolist] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");
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

  // Load data from localStorage only after authentication
  useEffect(() => {
    if (isAuthenticated) {
      const storedData = JSON.parse(localStorage.getItem("Todolist")) ?? [];
      setallDolist(storedData);
    }
  }, [isAuthenticated]);

  // Save to localStorage every time allDolist updates
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("Todolist", JSON.stringify(allDolist));
    }
  }, [allDolist, isAuthenticated]);

  // Add new task
  const addTodo = (event) => {
    event.preventDefault();
    if (!Todolist.trim()) return;

    const obj = {
      Todolist,
      isStatus: false,
    };

    const copyData = [...allDolist, obj];
    setallDolist(copyData);
    setTodolist("");
  };

  // Delete a task
  const deltelistdata = (index) => {
    const allItems = [...allDolist];
    allItems.splice(index, 1);
    setallDolist(allItems);
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue("");
    }
  };

  // Toggle task status
  const changeStatus = (index) => {
    const allItems = [...allDolist];
    allItems[index]["isStatus"] = !allItems[index]["isStatus"];
    setallDolist(allItems);
  };

  // Start editing
  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  // Save edit
  const saveEdit = (index) => {
    if (!editValue.trim()) return;
    const allItems = [...allDolist];
    allItems[index]["Todolist"] = editValue;
    setallDolist(allItems);
    setEditIndex(null);
    setEditValue("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  // Filtered todos
  const filteredTodos = allDolist.filter((todo) => {
    if (filter === "completed") return todo.isStatus;
    if (filter === "incomplete") return !todo.isStatus;
    return true;
  });

  // Show loading while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="text-center mb-2 pt-[20px]">
        <h1 className="text-3xl font-bold text-indigo-600">TO-DO-LIST</h1>
      </div>

      <form className="container mx-auto max-w-md p-4" onSubmit={addTodo}>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={Todolist}
            onChange={(e) => setTodolist(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">
            Add
          </button>
        </div>
      </form>

      {/* Filter Dropdown */}
      <div className="container mx-auto max-w-md p-4 pb-0 flex justify-end">
        <select
          className="border rounded px-3 py-2"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <div className="max-w-[500px] mx-auto bg-white rounded-lg shadow overflow-hidden">
        {filteredTodos.length > 0
          ? filteredTodos.map((v, i) => (
            <div
              key={i}
              className={`p-4 border-b border-gray-200 flex items-center ${v.isStatus ? "line-through text-[red]" : ""
                }`}
            >
              {editIndex === allDolist.indexOf(v) ? (
                <>
                  <input
                    className="flex-grow px-2 py-1 border rounded mr-2"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                    onClick={() => saveEdit(allDolist.indexOf(v))}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="flex items-center cursor-pointer flex-grow"
                    onClick={() => changeStatus(allDolist.indexOf(v))}
                  >
                    <span>{allDolist.indexOf(v) + 1}</span>
                    <span className="ml-3 text-gray-500">{v.Todolist}</span>
                  </div>
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={() => startEdit(allDolist.indexOf(v), v.Todolist)}
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                className="ml-auto text-gray-400 hover:text-red-500"
                onClick={() => deltelistdata(allDolist.indexOf(v))}
              >
                <MdDelete className="text-[red]" />
              </button>
            </div>
          ))
          : <div className="p-4 text-center text-gray-500">No data</div>}
      </div>
    </div>
  );
}
