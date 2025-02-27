import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      navigate("/home");
    } catch (error) {
      setError("Failed to update workout goals.");
      console.error("Error updating workout goals:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-200">
      <form
        onSubmit={handleSubmit}
        className="bg-green-300 p-6 rounded-lg shadow-md w-80 flex flex-col gap-4"
      >
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          name="goal"
          placeholder="Goal (e.g., Muscle Gain, Fat Loss)"
          value={formData.goal}
          onChange={handleChange}
          required
          className="p-2 border border-green-500 rounded"
        />
        <input
          type="number"
          name="currentWeight"
          placeholder="Current Weight (kg)"
          value={formData.currentWeight}
          onChange={handleChange}
          required
          className="p-2 border border-green-500 rounded"
        />
        <input
          type="number"
          name="targetWeight"
          placeholder="Target Weight (kg)"
          value={formData.targetWeight}
          onChange={handleChange}
          required
          className="p-2 border border-green-500 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WorkoutGoalsForm;
