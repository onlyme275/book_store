// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  // Define links based on role
  const links = user?.role === "Admin"
    ? [
        { name: "Profile", path: "/info" },
        { name: "Add Student", path: "/students" },
        { name: "Messages", path: "/messages" },
      ]
    : [
        { name: "Profile", path: "/Info" },
        { name: "AddBook", path: "/AddBook" },
      ];

  return (
    <div className="w-60 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-6">{user?.role} Dashboard</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path} className="mb-3">
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
