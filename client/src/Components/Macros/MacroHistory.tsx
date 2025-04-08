import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

type Macro = {
  protein: number;
  carbs: number;
  fats: number;
  createdAt: string;
};

const MacroHistory: React.FC = () => {
  const [macroData, setMacroData] = useState<Macro[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchMacros = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}macros`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      if (response.data) {
        setMacroData(response.data.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error fetching macros:", error.message);
      } else {
        console.error("Unexpected error fetching macros:", error);
      }
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchMacros();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 overflow-y-auto h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-xl border border-gray-700 text-white">
      <h2 className="text-2xl font-bold text-center mb-4 tracking-wide text-blue-400">
        🧬 Macro History
      </h2>

      {isDataLoading ? (
        <div className="flex justify-center mt-[20vh] items-center h-48">
            <motion.div className="flex items-center text-white text-2xl font-bold">
                <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
                <span className="ml-2 text-blue-300">Fetching data...</span>
            </motion.div>
      </div>
      
      ) : macroData.length === 0 ? (
        <p className="text-gray-400 text-center">No macro entries found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {macroData.map((entry, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-5 rounded-2xl border border-gray-700 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-3">
                <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="space-y-2 text-sm font-medium">
                <p>
                  🥩 <span className="text-pink-400">Protein:</span>{" "}
                  <span className="text-white">{entry.protein}g</span>
                </p>
                <p>
                  🍞 <span className="text-yellow-400">Carbs:</span>{" "}
                  <span className="text-white">{entry.carbs}g</span>
                </p>
                <p>
                  🧈 <span className="text-green-400">Fat:</span>{" "}
                  <span className="text-white">{entry.fats}g</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MacroHistory;
