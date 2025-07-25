"use client";
import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';

function isDueTodayOrPast(todo) {
  if (!todo.dueDate || todo.isCompleted) return false;
  const today = new Date();
  const due = new Date(todo.dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due <= today;
}

function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem('currentUser');
}

export default function TodosPage() {
  const router = useRouter();
  const [Todolist, setTodolist] = useState("");
  const [allDolist, setallDolist] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [dueAlert, setDueAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check authentication immediately
    const checkAuth = () => {
      if (!isLoggedIn()) {
        router.replace('/login');
        return;
      }
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    // Small delay to ensure localStorage is available
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const storedData = JSON.parse(localStorage.getItem("Todolist")) ?? [];
      // Filter tasks for current user
      const userTasks = storedData.filter(task => task.userId === currentUser._id);
      setallDolist(userTasks);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      // Get all tasks and update with current user's tasks
      const allTasks = JSON.parse(localStorage.getItem("Todolist")) ?? [];
      const otherUserTasks = allTasks.filter(task => task.userId !== currentUser._id);
      const updatedAllTasks = [...otherUserTasks, ...allDolist];

      localStorage.setItem("Todolist", JSON.stringify(updatedAllTasks));
      // Check for due todos
      setDueAlert(allDolist.some(isDueTodayOrPast));
    }
  }, [allDolist, isAuthenticated, currentUser]);

  const addTodo = (event) => {
    event.preventDefault();
    if (!Todolist.trim() || !currentUser) return;
    const obj = {
      Todolist,
      isCompleted: false,
      dueDate: "",
      createdAt: new Date().toISOString(),
      userId: currentUser._id,
      userName: currentUser.name,
      userEmail: currentUser.email
    };
    const copyData = [...allDolist, obj];
    setallDolist(copyData);
    setTodolist("");
  };

  const deltelistdata = (index) => {
    const allItems = [...allDolist];
    allItems.splice(index, 1);
    setallDolist(allItems);
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue("");
    }
  };

  const changeStatus = (index) => {
    const allItems = [...allDolist];
    allItems[index]["isCompleted"] = !allItems[index]["isCompleted"];
    setallDolist(allItems);
  };

  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const saveEdit = (index) => {
    if (!editValue.trim()) return;
    const allItems = [...allDolist];
    allItems[index]["Todolist"] = editValue;
    setallDolist(allItems);
    setEditIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleDueDateChange = (index, value) => {
    const allItems = [...allDolist];
    allItems[index]["dueDate"] = value;
    setallDolist(allItems);
  };

  const filteredTodos = allDolist.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "incomplete") return !todo.isCompleted;
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
        <h1 className="text-3xl font-bold text-indigo-600">My Todos</h1>
        {currentUser && (
          <p className="text-gray-600 mt-2">Welcome, {currentUser.name}!</p>
        )}
      </div>
      {dueAlert && (
        <div className="max-w-[500px] mx-auto mb-4 p-3 bg-red-100 text-red-700 rounded shadow text-center font-semibold">
          You have tasks due today or overdue!
        </div>
      )}
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
      <div className="container mx-auto max-w-md p-4 pb-0 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Total: {allDolist.length} | Completed: {allDolist.filter(todo => todo.isCompleted).length}
        </div>
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
              className={`p-4 border-b border-gray-200 flex items-center ${v.isCompleted
                ? "bg-green-50 border-green-200"
                : "hover:bg-gray-50"
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
                    <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${v.isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300'
                      }`}>
                      {v.isCompleted && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`${v.isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}>
                      {v.Todolist}
                    </span>
                  </div>
                  <input
                    type="date"
                    className="ml-2 border rounded px-2 py-1 text-sm"
                    value={v.dueDate || ""}
                    onChange={e => handleDueDateChange(allDolist.indexOf(v), e.target.value)}
                  />
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
                <MdDelete className="text-red-500" />
              </button>
            </div>
          ))
          : <div className="p-4 text-center text-gray-500">No tasks found</div>}
      </div>
    </div>
  );
} 