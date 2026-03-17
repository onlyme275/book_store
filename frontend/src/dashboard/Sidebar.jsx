// src/dashboard/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";
import {
  LayoutDashboard,
  User,
  UserPlus,
  BookPlus,
  MessageSquare,
  BookOpen,
  LogOut,
} from "lucide-react";

const adminLinks = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "Add Student", path: "/dashboard/students", icon: UserPlus },
  { name: "Add Book", path: "/dashboard/books", icon: BookPlus },
  { name: "Customer", path: "/dashboard/customer", icon: User },
  { name: "Messages", path: "/dashboard/messages", icon: MessageSquare },
  { name: "Review", path: "/dashboard/review", icon: MessageSquare },
];

const studentLinks = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "View Books", path: "/dashboard/views", icon: BookOpen },
  { name: "Review", path: "/dashboard/review", icon: MessageSquare },
  { name: "Messages", path: "/dashboard/messages", icon: MessageSquare },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <BookOpen size={14} color="white" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-gray-900">
          BookStore
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-4">
        <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase px-2 mb-1.5">
          Menu
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm mb-0.5 transition-colors duration-150 ${isActive
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={15}
                    className={isActive ? "text-white" : "text-gray-400"}
                  />
                  {link.name}
                </>
              )}
            </NavLink>
          );
        })}
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
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
