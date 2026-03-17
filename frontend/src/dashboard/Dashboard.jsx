// src/pages/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <p className="mt-2 text-gray-600">Role: {user?.role}</p>
      </div>
    </div>
  );
};

export default Dashboard;