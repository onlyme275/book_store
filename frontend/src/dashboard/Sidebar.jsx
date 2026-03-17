// src/dashboard/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLinks = [
    { name: "Overview", path: "/dashboard", icon: "🏠" },
    { name: "Profile", path: "/dashboard/profile", icon: "👤" },
    { name: "Add Student", path: "/dashboard/students", icon: "🎓" },
    { name: "Messages", path: "/dashboard/messages", icon: "💬" },
  ];

  const guestLinks = [
    { name: "Overview", path: "/dashboard", icon: "🏠" },
    { name: "Profile", path: "/dashboard/profile", icon: "👤" },
    { name: "Add Book", path: "/dashboard/books", icon: "📚" },
  ];

  const links = user?.role === "Admin" ? adminLinks : guestLinks;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const initials = user?.email ? user.email[0].toUpperCase() : "U";

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-primary-900 text-white shadow-2xl shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-primary-700">
        <div className="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center text-lg font-bold shadow">
          📖
        </div>
        <span className="text-lg font-bold tracking-wide">BookStore</span>
      </div>

      {/* User badge */}
      <div className="flex items-center gap-3 px-6 py-4 mx-4 mt-4 rounded-xl bg-primary-800">
        <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center font-bold text-sm shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-primary-200 truncate">{user?.email}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary-600 text-primary-100 text-xs font-medium">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 mb-2 text-xs font-semibold text-primary-400 uppercase tracking-widest">
          Navigation
        </p>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                ? "bg-primary-500 text-white shadow-md"
                : "text-primary-200 hover:bg-primary-700 hover:text-white"
              }`
            }
          >
            <span>{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-primary-200 hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
