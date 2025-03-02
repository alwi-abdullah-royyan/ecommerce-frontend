import Icons from "@/components/atoms/Icons";
import { logout } from "@/services/authService";
import Link from "next/link";
import React from "react";

const HeaderItemLg = ({ authStatus, username, isAdmin }) => {
  return (
    <>
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-500">
        ToDoList
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-blue-500 transition-colors">
          Home
        </Link>
        {isAdmin && (
          <Link href="/todolist/dashboard" className="hover:text-blue-500 transition-colors">
            Dashboard
          </Link>
        )}
        <Link href="/todolist/category" className="hover:text-blue-500 transition-colors">
          Category
        </Link>
        <Link href="/todolist/trash" className="hover:text-blue-500 transition-colors">
          Trash
        </Link>
      </nav>

      {/* Profile / Login */}
      {authStatus ? (
        <div className="hidden md:flex space-x-4">
          <Link
            href={`/todolist/profile/${username}`}
            className="hover:bg-blue-800 transition-colors text-white px-4 py-2 rounded-md"
          >
            Profile
          </Link>
          <button onClick={logout} className="hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="hidden md:block hover:bg-blue-800 transition-colors text-white px-4 py-2 rounded-md"
        >
          <div className="flex">
            <Icons.Login /> Login
          </div>
        </Link>
      )}
    </>
  );
};

export default HeaderItemLg;
