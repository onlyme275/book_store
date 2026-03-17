// src/dashboard/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";

const icons = {
  overview: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  profile: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  students: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 5.5h4M12 3.5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  messages: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3.5h12M2 8h8M2 12.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  books: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="2" width="7" height="12" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 4h2a1 1 0 011 1v8a1 1 0 01-1 1h-2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  logout: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 2H2.5A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H5M9 10l3-3-3-3M13 7H5"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const adminLinks = [
  { name: "Overview", path: "/dashboard", icon: icons.overview },
  { name: "Profile",  path: "/dashboard/profile",  icon: icons.profile  },
  { name: "Add Student", path: "/dashboard/students", icon: icons.students },
  { name: "Messages", path: "/dashboard/messages", icon: icons.messages },
];

const studentLinks = [
  { name: "Overview", path: "/dashboard", icon: icons.overview },
  { name: "Profile",  path: "/dashboard/profile", icon: icons.profile },
  { name: "Add Book", path: "/dashboard/books",   icon: icons.books   },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  const links = user?.role === "Admin" ? adminLinks : studentLinks;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-white border-r border-gray-100">

      {/* Brand */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100">
        <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="7" rx="1" fill="white" />
            <rect x="9" y="7" width="5" height="7" rx="1" fill="white" />
            <rect x="2" y="11" width="5" height="3" rx="1" fill="white" opacity="0.5" />
            <rect x="9" y="2" width="5" height="3" rx="1" fill="white" opacity="0.5" />
          </svg>
        </div>
        <span className="text-3xl font-bold tracking-tighter  text-gray-900">BookStore</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-4">
        <p className="text-[20px] font-semibold tracking-widest text-gray-700 uppercase px-2 mb-1.5">
          Menu
        </p>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm mb-0.5 transition-colors duration-150 ${
                isActive
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-800 text-5xl font-medium hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? "text-white" : "text-gray-400"}>
                  {link.icon}
                </span>
                {link.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-500 flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate leading-tight">
              {user?.name ?? "User"}
            </p>
            <p className="text-[10px] text-gray-400 truncate leading-tight">
              {user?.email ?? user?.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-150"
        >
          {icons.logout}
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
