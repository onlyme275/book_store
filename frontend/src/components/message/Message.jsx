import React, { useState, useEffect, useRef } from "react";

const Message = ({ user }) => {
  const [messages, setMessages] = useState([
    { sender: "ai", content: `Welcome back, ${user?.name || "Explorer"}! ✨ I'm your AI assistant, ready to help you find your next great read. How can I assist you today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "ai", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { sender: "ai", content: `⚠️ Error: ${data.error || "I encountered a minor glitch. Please try again."}` }
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev, 
        { sender: "ai", content: "📡 Connection lost. Please check your server status." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] max-w-3xl mx-auto my-12 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-white/20">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/20 rounded-full -ml-12 -mb-12 blur-2xl"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-inner border border-white/30">
                ✨
              </span>
              AI Concierge
            </h2>
            <p className="text-blue-100/80 mt-2 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online & Ready to Assist
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs uppercase tracking-widest opacity-60 font-bold">Powered BY</div>
            <div className="text-sm font-semibold">OpenAI & LangChain</div>
          </div>
        </div>
      </div>

      {/* Modern Chat Canvas */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 overflow-y-auto bg-[#f8fafc] space-y-6 scrollbar-hide"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
          >
            <div
              className={`max-w-[85%] p-5 rounded-[1.5rem] transition-all duration-300 ${
                msg.sender === "user"
                  ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-lg shadow-blue-200"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm hover:shadow-md"
              }`}
            >
              <p className="text-[15px] leading-relaxed font-medium">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white border border-gray-100 p-5 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-2 items-center">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Input Dock */}
      <div className="p-6 bg-white border-t border-gray-50">
        <form onSubmit={handleSend} className="relative group">
          <input
            type="text"
            placeholder="Ask me anything about your favorite books..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 pr-32 rounded-2xl focus:ring-0 focus:border-indigo-500/30 focus:bg-white transition-all outline-none text-gray-700 font-medium placeholder:text-gray-400 shadow-inner"
          />
          <div className="absolute right-2 top-2 bottom-2 flex gap-2">
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:bg-gray-200 disabled:scale-100 text-white px-8 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">
          Intelligent Response System v2.0
        </p>
      </div>
    </div>
  );
};

export default Message;