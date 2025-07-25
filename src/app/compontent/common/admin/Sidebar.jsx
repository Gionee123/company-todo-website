"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/app/(admin-group)/admin-panel/slice/AdminSlice";

const links = [
  { href: "/admin-panel/dashboard", label: "Dashboard" },
  { href: "/admin-panel/users", label: "Users" },
  { href: "/admin-panel/todos", label: "Todos" },
  { href: "/admin-panel/user-actions", label: "User Actions" }, // New page link
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  let loginData = useSelector((myAllState) => {
    return myAllState.loginStore.adminDetails;
  });

  let router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && loginData == null) {
      router.push("/admin-panel/login");
    }
  }, [isClient, loginData, router]);

  const handleLogout = () => {
    // Clear admin data from Redux and cookies
    dispatch(logOut());

    // Clear any remaining cookies manually
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to admin login page
    router.push("/admin-panel/login");
  };

  return (
    <aside className="h-screen w-56 bg-white shadow-lg flex flex-col justify-between fixed left-0 top-0 z-20">
      <div>
        <div className="p-6 text-2xl font-bold text-indigo-700 border-b">
          Admin Panel
        </div>
        <nav className="flex flex-col mt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-6 py-3 text-lg hover:bg-indigo-50 transition font-medium ${
                pathname === link.href
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      {!isClient ? (
        // Show loading state during hydration
        <div className="m-6 mt-0 px-4 py-2 bg-gray-300 text-gray-600 rounded animate-pulse">
          Loading...
        </div>
      ) : loginData == null ? (
        <Link
          href="/admin-panel/login"
          className="m-6 mt-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-center"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="m-6 mt-0 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </aside>
  );
}
