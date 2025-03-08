import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaDrumstickBite, FaBreadSlice, FaTint, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import dayjs from "dayjs"; 

interface MacroEntry {
  id: string;
  protein: number;
  carbs: number;
  fats: number;
  createdAt: string;
}

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const MacronutrientTracker: React.FC = () => {
  const [macroData, setMacroData] = useState<MacroEntry[]>([]);
  const [newMacros, setNewMacros] = useState({ protein: "", carbs: "", fats: "" });
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMacros();
  }, []);

  const fetchMacros = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}macros`, {
        headers: { Authorization: `Bearer ${token}`, timeout: 10000 },
      });
      if (response.data) {
        setMacroData(response.data.data);
        setIsDataLoading(false);
      }
    } catch (error: any) {
      console.log(error.message)
      console.error("Error fetching macros:", error);
    }
  };

  const handleAddMacros = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMacros.protein || !newMacros.carbs || !newMacros.fats) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const newEntry = {
        protein: parseFloat(newMacros.protein),
        carbs: parseFloat(newMacros.carbs),
        fats: parseFloat(newMacros.fats),
        createdAt: selectedDate,
      };

      await axios.post(`${BACKEND_URL}macros`, newEntry, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchMacros();
      setNewMacros({ protein: "", carbs: "", fats: "" });
    } catch (error) {
      setError("Failed to add macros. Please try again.");
      console.error("Error adding macros:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMacros = macroData.find((macro) => macro.createdAt === selectedDate);
  const chartData = filteredMacros
    ? [
        { name: "Protein", value: filteredMacros.protein },
        { name: "Carbs", value: filteredMacros.carbs },
        { name: "Fats", value: filteredMacros.fats },
      ]
    : [];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
      <div className="flex flex-col items-center w-3/4">
        <motion.div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-md">
          <FaCalendarAlt className="text-blue-400 text-lg" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-white border-none outline-none cursor-pointer w-full"
          />
        </motion.div>

        {error && <p className="text-red-500 mt-2">{error}</p>}


        <motion.form
          onSubmit={handleAddMacros}
          className="w-full max-w-lg border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md border border-gray-700 p-6 rounded-lg shadow-xl mt-6 space-y-4"
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "protein", icon: <FaDrumstickBite className="text-blue-400" /> },
              { name: "carbs", icon: <FaBreadSlice className="text-yellow-400" /> },
              { name: "fats", icon: <FaTint className="text-red-400" /> },
            ].map((macro) => (
              <div key={macro.name} className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">{macro.icon}</div>
                <input
                  type="number"
                  value={newMacros[macro.name as keyof typeof newMacros]}
                  onChange={(e) => setNewMacros({ ...newMacros, [macro.name]: e.target.value })}
                  placeholder={`${macro.name.charAt(0).toUpperCase() + macro.name.slice(1)} (g)`}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg text-center"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
    <motion.button
        type="submit"
        className={`px-5 py-2 rounded-lg font-medium shadow-lg transition-all focus:ring-2 focus:ring-blue-500 ${
            loading
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/50"
        }`}
        whileHover={!loading ? { scale: 1.08 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        disabled={loading}
    >
    {loading ? "⏳ Adding..." : "➕ Add"}
  </motion.button>
</div>

        </motion.form>
        <motion.div className="w-full max-w-lg h-80 p-6 border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md border border-gray-700 rounded-xl  mt-6 shadow-2xl flex items-center justify-center">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {chartData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#F9FAFB" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center">No data available for this date.</p>
          )}
        </motion.div>
      </div>

      <motion.div className="w-1/4 flex-row p-4 border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md border border-gray-700 rounded-lg shadow-xl overflow-y-auto max-h-full ml-6">
  <h3 className="text-white text-lg font-semibold mb-3">📅 Daily Macro History</h3>
  {macroData.length > 0 ? (
    <ul className="text-gray-300 space-y-2">
      {macroData.slice().reverse().map((entry) => (
        <li key={entry.id} className="flex justify-between border-b border-gray-700 pb-2">
          <span>{dayjs(entry.createdAt).format("MMM D, YYYY")}</span>
          <span className="text-blue-400">{entry.protein}P</span>
          <span className="text-yellow-400">{entry.carbs}C</span>
          <span className="text-red-400">{entry.fats}F</span>
        </li>
      ))}
    </ul>
  ) : (
    isDataLoading ? (
      <motion.div className="flex justify-center items-center h-full">
        <p className="text-white text-2xl font-bold">Loading...</p>
      </motion.div>
    ) : (
      <p className="text-gray-400 text-center">No records found.</p>
    )
  )}
</motion.div>

    </div>
  );
};

export default MacronutrientTracker;