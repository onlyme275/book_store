// src/dashboard/DashboardHome.jsx
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const StatCard = ({ icon, label, value, color }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${color} flex items-center gap-4`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-sm text-slate-500 font-medium">{label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
        </div>
    </div>
);

const QuickLink = ({ to, icon, label, desc }) => (
    <NavLink
        to={to}
        className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary-300 border border-transparent transition-all duration-200 flex flex-col gap-2"
    >
        <span className="text-2xl">{icon}</span>
        <p className="font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
    </NavLink>
);

const DashboardHome = () => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user?.role === "Admin";

    return (
        <div className="space-y-8">
            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-500 rounded-2xl p-8 text-white shadow-lg">
                <p className="text-primary-200 text-sm font-medium mb-1">Welcome back 👋</p>
                <h2 className="text-3xl font-bold">{user?.email}</h2>
                <p className="mt-2 text-primary-100 text-sm">
                    You're logged in as{" "}
                    <span className="inline-block px-2 py-0.5 bg-white/20 rounded-full font-semibold">
                        {user?.role}
                    </span>
                </p>
            </div>

            {/* Stats */}
            <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isAdmin ? (
                        <>
                            <StatCard icon="🎓" label="Total Students" value="—" color="border-primary-500" />
                            <StatCard icon="📚" label="Total Books" value="—" color="border-emerald-500" />
                            <StatCard icon="💬" label="Messages" value="—" color="border-violet-500" />
                        </>
                    ) : (
                        <>
                            <StatCard icon="📚" label="Books Listed" value="—" color="border-primary-500" />
                            <StatCard icon="👤" label="Your Profile" value="Active" color="border-emerald-500" />
                        </>
                    )}
                </div>
            </div>

            {/* Quick actions */}
            <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickLink to="/dashboard/profile" icon="👤" label="View Profile" desc="See your account details" />
                    {isAdmin && (
                        <QuickLink to="/dashboard/students" icon="🎓" label="Add Student" desc="Register a new student" />
                    )}
                    {isAdmin && (
                        <QuickLink to="/dashboard/messages" icon="💬" label="Messages" desc="View and send messages" />
                    )}
                    <QuickLink to="/dashboard/books" icon="📚" label={isAdmin ? "Manage Books" : "Add a Book"} desc="Browse or add books" />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
