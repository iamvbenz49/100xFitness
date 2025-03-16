import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WorkoutTracker from "./WorkoutTracker";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const WorkoutManagerSample = () => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState("");
  const [workouts, setWorkouts] = useState<{ id: string; name: string; sets: { weight: number; reps: number }[] }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSampleWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}sample`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setWorkouts(response.data.data.map((workout: any) => ({ ...workout, sets: [] })));
        }
      } catch (error) {
        console.error("Error fetching sample workouts:", error);
      }
    };

    fetchSampleWorkouts();
  }, []);

  const finishWorkout = async () => {
    if (!sessionName.trim()) {
      alert("Please enter a name for your workout session.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}workouts`,
        { sessionName, workouts },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSessionName("");
      setWorkouts([]);
      navigate("/");
    } catch (error) {
      console.error("Error saving workout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 overflow-hidden">
      <input
        type="text"
        placeholder="Enter workout session name..."
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        className="w-full max-w-5xl p-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl font-semibold"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl h-3/4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-4 border border-gray-700 rounded-xl">
        {workouts.map((workout) => (
          <WorkoutTracker
            key={workout.id}
            id={workout.id}
            name={workout.name}
            sets={workout.sets}
            onUpdateWorkout={(id, updatedWorkout) => {
              setWorkouts((prevWorkouts) =>
                prevWorkouts.map((w) => (w.id === id ? { ...w, ...updatedWorkout } : w))
              );
            }}
          />
        ))}
      </div>

      <motion.button
        onClick={finishWorkout}
        disabled={loading}
        className={`mt-4 py-2 px-4 rounded-lg shadow-md font-semibold transition-all ${
          loading ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:opacity-90 text-white"
        }`}
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
      >
        {loading ? "Saving..." : "Finish Workout"}
      </motion.button>
    </div>
  );
};

export default WorkoutManagerSample;
