// src/components/message/Message.jsx
import React, { useState } from "react";

const sampleMessages = [
  { id: 1, from: "Admin", text: "Welcome to the system!", time: "10:00 AM" },
  { id: 2, from: "System", text: "Your account has been configured.", time: "10:05 AM" },
];

function Message() {
  const [messages, setMessages] = useState(sampleMessages);
  const [text, setText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "You", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setText("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Messages</h2>
        <p className="text-slate-500 text-sm mt-1">Your inbox and conversations</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm flex flex-col" style={{ height: "480px" }}>
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-xs ${msg.from === "You" ? "ml-auto items-end" : "items-start"}`}
            >
              <p className="text-xs text-slate-400 mb-1">
                <span className="font-medium text-slate-600">{msg.from}</span> · {msg.time}
              </p>
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm ${msg.from === "You"
                    ? "bg-primary-600 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={sendMessage} className="border-t border-slate-100 p-4 flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Message;
