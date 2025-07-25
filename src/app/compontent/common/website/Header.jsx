"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("currentUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-2xl font-bold text-blue-800">Website</div>
      <nav className="flex gap-6">
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="text-blue-700 hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-blue-700 hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-blue-700 hover:underline"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
