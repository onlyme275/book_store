// src/components/Info/info.jsx
import React from "react";
import { useSelector } from "react-redux";

function Info() {
  const { user } = useSelector((state) => state.auth);

  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  const rows = [
    { label: "Email",  value: user?.email  },
    { label: "Role",   value: user?.role   },
    { label: "Status", value: "Active"     },
  ];

  return (
    <div className="max-w-xl mx-auto py-4 space-y-5">

      {/* Page heading */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Profile</h2>
        <p className="text-xs text-gray-400 mt-0.5">Your account information</p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

        {/* Header row */}
        <div className="flex items-start gap-4 px-6 py-5 border-b border-gray-100">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-lg font-medium text-gray-500 flex-shrink-0">
            {initial}
          </div>

          {/* Name + badge */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email}
              </p>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Member since 2024</p>
          </div>

          {/* Status dot */}
          <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-xs text-gray-400">Active</span>
          </div>
        </div>

        {/* Info rows */}
        <div className="px-6 divide-y divide-gray-50">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between items-center py-3.5">
              <span className="text-xs text-gray-400">{row.label}</span>
              <span className="text-xs font-medium text-gray-800">{row.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Info;
