import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaWeight } from "react-icons/fa";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

interface WeightLog {
  id: string;
  weight: number;
  createdAt: string;
}

const WeightHistory = () => {
  const [weightData, setWeightData] = useState<WeightLog[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWeightLogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}weight`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Format createdAt for better display
        const formattedData = response.data.map((log: WeightLog) => ({
          ...log,
          createdAt: new Date(log.createdAt).toISOString().split("T")[0], // YYYY-MM-DD format
        }));

        setWeightData(formattedData);
      } catch (error) {
        console.error("Error fetching weight logs:", error);
      }
    };
    fetchWeightLogs();
  }, [token]);

  const handleAddWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;

    setIsLoading(true); // Start loading

    const newEntry = { weight: parseFloat(newWeight) };

    try {
      const response = await axios.post(`${BACKEND_URL}weight`, newEntry, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      const formattedEntry = {
        ...response.data,
        createdAt: new Date(response.data.createdAt).toISOString().split("T")[0],
      };

      setWeightData([...weightData, formattedEntry]);
      setNewWeight("");
    } catch (error) {
      console.error("Error adding weight log:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-950 p-6">
      <motion.form
        onSubmit={handleAddWeight}
        className="flex gap-4 items-center bg-gray-800/60 backdrop-blur-md p-5 rounded-xl border border-gray-700 shadow-xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <FaWeight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            step="0.1"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Enter weight (kg)"
            className="pl-10 pr-4 py-2 bg-gray-900/80 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
            disabled={isLoading} 
          />
        </div>
        <motion.button
          type="submit"
          className={`px-5 py-2 rounded-lg font-medium shadow-lg transition-all focus:ring-2 focus:ring-blue-500 ${
            isLoading
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/50"
          }`}
          whileHover={!isLoading ? { scale: 1.08 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
          disabled={isLoading}
        >
          {isLoading ? "⏳ Adding..." : "➕ Add"}
        </motion.button>
      </motion.form>

      <motion.div
        className="w-full max-w-5xl h-3/4 p-6 border border-gray-700 rounded-xl bg-gray-900/80 mt-6 shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {weightData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <XAxis
                dataKey="createdAt"
                tickFormatter={(date) => {
                  return new Date(date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  }); // Example: "05 Mar"
                }}
                stroke="#CBD5E0"
              />
              <YAxis stroke="#CBD5E0" />
              <Tooltip
                labelFormatter={(label) =>
                  new Date(label).toLocaleDateString("en-US", { day: "2-digit", month: "short" })
                }
                contentStyle={{ backgroundColor: "#1F2937", color: "#F9FAFB" }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#60A5FA" }}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400 text-center">No weight data available.</p>
        )}
      </motion.div>
    </div>
  );
};

export default WeightHistory;
