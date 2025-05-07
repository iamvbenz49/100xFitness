import axios from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai";
  text: string;
};

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const MacroAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    const token = localStorage.getItem("token");
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true); 

    try {
      
      const prompt = `respond only if it is related to fitness and diet, here is the text "${input}"`
      const response = await axios.post(
        `${BACKEND_URL}diet`,
        { query: prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiMessage: Message = {
        role: "ai",
        text: response.data.data || "No response from AI 🤖",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Error reaching the backend." },
      ]);
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full h-full p-6 border rounded-xl border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md shadow-2xl mt-6 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto border-b border-gray-700 p-2 mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-xl whitespace-pre-wrap max-w-[90%] ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.role === "ai" ? (
                <div className="prose prose-invert max-w-full">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}


        {loading && (
          <div className="text-left mb-4">
            <div className="inline-block px-4 py-2 rounded-xl bg-gray-700 text-white animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        <input
          className="flex-1 p-2 bg-gray-700 rounded-lg focus:outline-none text-white disabled:opacity-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI about your diet..."
          disabled={loading} 
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition disabled:opacity-50"
          onClick={handleSend}
          disabled={loading} 
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default MacroAI;
