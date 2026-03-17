// src/components/Info/info.jsx
import React from "react";
import { useSelector } from "react-redux";

function Info() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Profile</h2>
        <p className="text-slate-500 text-sm mt-1">Your account information</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header banner */}
        <div className="h-24 bg-gradient-to-r from-primary-700 to-primary-500" />

        {/* Avatar + info */}
        <div className="px-8 pb-8">
          <div className="w-20 h-20 rounded-full bg-primary-500 border-4 border-white -mt-10 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mt-4">{user?.email}</h3>
          <span className="inline-block mt-1 px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-semibold">
            {user?.role}
          </span>

          {/* Details table */}
          <div className="mt-6 divide-y divide-slate-100">
            {[
              { label: "Email", value: user?.email },
              { label: "Role", value: user?.role },
              { label: "Status", value: "Active" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-3 text-sm">
                <span className="text-slate-500 font-medium">{row.label}</span>
                <span className="text-slate-800 font-semibold">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;