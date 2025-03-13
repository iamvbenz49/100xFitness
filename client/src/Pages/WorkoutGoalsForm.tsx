import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WorkoutGoalsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    goal: "",
    targetWeight: "",
    currentWeight: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.goal || !formData.targetWeight || !formData.currentWeight) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}target`,
        {
          goal: formData.goal,
          targetWeight: parseFloat(formData.targetWeight),
          currentWeight: parseFloat(formData.currentWeight),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      navigate("/");
    } catch (error) {
      setError("Failed to update workout goals.");
      console.error("Error updating workout goals:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl p-5 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h1
          className="text-white text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Set Your Workout Goals
        </motion.h1>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="text"
          name="goal"
          placeholder="Goal (e.g., Muscle Gain, Fat Loss)"
          value={formData.goal}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="number"
          name="currentWeight"
          placeholder="Current Weight (kg)"
          value={formData.currentWeight}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="targetWeight"
          placeholder="Target Weight (kg)"
          value={formData.targetWeight}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </motion.form>
    </motion.div>
  );
};

export default WorkoutGoalsForm;
