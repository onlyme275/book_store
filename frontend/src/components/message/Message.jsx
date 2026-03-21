import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/slice/messageSlice";

let socket;

const Message = ({ user }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const [text, setText] = useState("");

  useEffect(() => {
    // Connect to WebSocket
    socket = new WebSocket("ws://127.0.0.1:8000/ws/messages/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Only show student's own messages or admin messages
      if (
        user.is_staff || // admin sees all
        data.sender_id === user.id ||
        data.sender_role === "admin"
      ) {
        dispatch(addMessage(data));
      }
    };

    return () => socket.close();
  }, [dispatch, user]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const messageData = {
      content: text,
      sender_role: user.is_staff ? "admin" : "student",
      sender_id: user.id,
    };

    socket.send(JSON.stringify(messageData));
    setText("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl mb-4">Messages</h2>
      <div className="border rounded p-3 mb-3 h-80 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded ${
              msg.sender_role === "admin"
                ? "bg-blue-100 text-blue-800 ml-auto"
                : "bg-green-100 text-green-800"
            }`}
          >
            <strong>{msg.sender_role === "admin" ? "Admin" : "You"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Message;