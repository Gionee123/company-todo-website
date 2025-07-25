"use client";
import React, { useEffect, useState } from 'react';
import AdminRouteGuard from '@/app/compontent/common/admin/AdminRouteGuard';

export default function AdminTodos() {
  const [allTodos, setAllTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  // Function to clean up old tasks without proper user data
  const cleanupOldTasks = () => {
    const todos = JSON.parse(localStorage.getItem('Todolist')) || [];
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Debug info
    setDebugInfo(`Found ${todos.length} total tasks and ${registeredUsers.length} registered users`);

    // Filter out tasks that don't have proper user data
    const validTodos = todos.filter(todo => {
      // Keep tasks that have userId and userName
      if (todo.userId && todo.userName) {
        return true;
      }

      // Keep tasks that can be linked to a registered user by email
      if (todo.userEmail) {
        const user = registeredUsers.find(u => u.email === todo.userEmail);
        return user !== undefined;
      }

      // Remove tasks without proper user data
      return false;
    });

    // Update localStorage with only valid tasks
    localStorage.setItem('Todolist', JSON.stringify(validTodos));
    return validTodos;
  };

  useEffect(() => {
    // Clean up old tasks first
    const cleanedTodos = cleanupOldTasks();
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Clean up tasks that don't have proper user data
    const finalTodos = cleanedTodos.map(todo => {
      if (!todo.userId || !todo.userName) {
        // Try to find user by email if userId is missing
        const user = registeredUsers.find(u => u.email === todo.userEmail);
        if (user) {
          return {
            ...todo,
            userId: user._id,
            userName: user.name,
            userEmail: user.email
          };
        }
      }
      return todo;
    });

    setAllTodos(finalTodos);
    setUsers(registeredUsers);
    setLoading(false);
  }, []);

  // Calculate statistics
  const totalTasks = allTodos.length;
  const completedTasks = allTodos.filter(todo => todo.isCompleted).length;
  const incompleteTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get tasks by status
  const getTasksByStatus = (status) => {
    return allTodos.filter(todo => status === 'completed' ? todo.isCompleted : !todo.isCompleted);
  };

  // Get recent tasks
  const getRecentTasks = (count = 10) => {
    return allTodos
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, count);
  };

  // Group tasks by user with better user data handling
  const getTasksByUser = () => {
    const userTasks = {};

    allTodos.forEach(todo => {
      let userId = todo.userId;
      let userName = todo.userName;
      let userEmail = todo.userEmail;

      // If user data is missing, try to find it from registered users
      if (!userId || !userName) {
        const user = users.find(u => u.email === todo.userEmail || u._id === todo.userId);
        if (user) {
          userId = user._id;
          userName = user.name;
          userEmail = user.email;
        } else {
          // Skip tasks that can't be properly linked to a user
          return;
        }
      }

      if (!userTasks[userId]) {
        userTasks[userId] = {
          userName: userName,
          userEmail: userEmail,
          tasks: [],
          completed: 0,
          incomplete: 0
        };
      }

      userTasks[userId].tasks.push(todo);
      if (todo.isCompleted) {
        userTasks[userId].completed++;
      } else {
        userTasks[userId].incomplete++;
      }
    });

    return userTasks;
  };

  if (loading) {
    return (
      <AdminRouteGuard>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-xl">Loading task statistics...</div>
        </div>
      </AdminRouteGuard>
    );
  }

  const userTasks = getTasksByUser();

  return (
    <AdminRouteGuard>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Client Task Management</h1>

          {/* Debug Info */}
          {debugInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">{debugInfo}</p>
              <p className="text-blue-600 text-xs mt-1">
                Total tasks: {totalTasks} | Registered users: {users.length} | Client groups: {Object.keys(userTasks).length}
              </p>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Incomplete</p>
                  <p className="text-2xl font-bold text-yellow-600">{incompleteTasks}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{completionRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Overall Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{completedTasks} completed</span>
              <span>{incompleteTasks} remaining</span>
            </div>
          </div>

          {/* Tasks by User */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Tasks by Client</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Tasks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Incomplete
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(userTasks).map(([userId, userData]) => {
                    const userCompletionRate = userData.tasks.length > 0
                      ? Math.round((userData.completed / userData.tasks.length) * 100)
                      : 0;

                    return (
                      <tr key={userId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-indigo-600 font-semibold text-sm">
                                {userData.userName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{userData.userName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {userData.userEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {userData.tasks.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {userData.completed}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {userData.incomplete}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${userCompletionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{userCompletionRate}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {Object.keys(userTasks).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-2">No client tasks found</p>
                <p className="text-sm">Clients haven't created any tasks yet</p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    💡 To see client tasks: Register a user, login, and create some tasks
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Tasks</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getRecentTasks().map((todo, index) => {
                    // Get proper user name for display
                    let displayName = todo.userName;
                    let displayEmail = todo.userEmail;

                    if (!displayName) {
                      const user = users.find(u => u.email === todo.userEmail || u._id === todo.userId);
                      if (user) {
                        displayName = user.name;
                        displayEmail = user.email;
                      } else {
                        displayName = 'Unknown User';
                        displayEmail = todo.userEmail || 'unknown@email.com';
                      }
                    }

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                              <span className="text-indigo-600 font-semibold text-xs">
                                {displayName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">{displayName}</span>
                              <p className="text-xs text-gray-500">{displayEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${todo.isCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span className={`text-sm ${todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {todo.Todolist}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${todo.isCompleted
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {todo.isCompleted ? 'Completed' : 'Incomplete'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'Unknown'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {allTodos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-2">No tasks found</p>
                <p className="text-sm">Clients haven't created any tasks yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminRouteGuard>
  );
} 