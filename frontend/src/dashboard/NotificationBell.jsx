import React, { useState, useEffect, useRef } from "react";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const token = localStorage.getItem("token");

    const fetchNotifications = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/notifications/", {
                headers: {
                    "Authorization": `Token ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setNotifications(data);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 10000); // Poll every 10 seconds
            return () => clearInterval(interval);
        }
    }, [token]);

    const markAsRead = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/notifications/${id}/read/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`
                }
            });
            if (response.ok) {
                setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
            }
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    const unreadCount = notifications.filter(n => !n.is_read).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shadow-sm active:scale-95"
            >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce-short">
                        {unreadCount}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Notifications</h3>
                        {unreadCount > 0 && (
                            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-bold">
                                {unreadCount} New
                            </span>
                        )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-slate-400 text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div 
                                    key={n.id}
                                    onClick={() => !n.is_read && markAsRead(n.id)}
                                    className={`p-4 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 ${!n.is_read ? 'bg-indigo-50/30' : ''}`}
                                >
                                    <p className={`text-sm ${!n.is_read ? 'text-slate-800 font-semibold' : 'text-slate-500'}`}>
                                        {n.message}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
                                        {new Date(n.created_at).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                            View all activity
                        </button>
                    </div>
                </div>
            )}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes bounce-short {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .animate-bounce-short {
                    animation: bounce-short 2s infinite;
                }
            ` }} />
        </div>
    );
};

export default NotificationBell;
