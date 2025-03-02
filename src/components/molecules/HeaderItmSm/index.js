import Icons from "@/components/atoms/Icons";
import { logout } from "@/services/authService";
import Link from "next/link";
import React from "react";

const HeaderItemSm = ({ isOpen, authStatus, username, isAdmin }) => {
  return (
    <>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="flex flex-col items-center space-y-4 py-4">
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

            {authStatus ? (
              <>
                <Link href={`/todolist/profile/${username}`} className="hover:text-blue-500 transition-colors">
                  Profile
                </Link>
                <button onClick={logout} className="hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-md">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:text-blue-500 transition-colors">
                <div className="flex">
                  <Icons.Login /> Login
                </div>
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default HeaderItemSm;
