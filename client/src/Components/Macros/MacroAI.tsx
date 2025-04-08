import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

const MacroAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        text: `AI: Your diet advice for "${input}"`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="w-full h-full p-6 border rounded-xl border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md shadow-2xl mt-6 flex flex-col overflow-hidden">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto border-b border-gray-700 p-2 mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded-lg ${
                msg.role === "user" ? "bg-blue-600" : "bg-gray-600"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex">
        <input
          className="flex-1 p-2 bg-gray-700 rounded-lg focus:outline-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI about your diet..."
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MacroAI;
