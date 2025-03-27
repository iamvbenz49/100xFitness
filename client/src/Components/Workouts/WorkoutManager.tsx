import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import WorkoutTracker from "./WorkoutTracker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const WorkoutManager = () => {
  const user = useContext(AuthContext);
  
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState("");
  const [workouts, setWorkouts] = useState<{ id: string; name: string; sets: { weight: number; reps: number }[] }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableWorkouts, setAvailableWorkouts] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); 
    const { signal } = controller;
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || token === "guest") return;
        console.log("req made")
        const response = await axios.get(`${BACKEND_URL}workouts`, {
          headers: { Authorization: `Bearer ${token}` },
          signal, 
        });
  
        if (response.data.success) {
          setAvailableWorkouts(response.data.data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching workouts:", error);
        }
      }
    };

    if (!user?.isGuest) {  
      fetchWorkouts();
    }
  
    return () => controller.abort(); 
  }, [user?.isGuest]);
  

  const filteredWorkouts = availableWorkouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addWorkout = (workoutId: string, workoutName: string) => {
    if (!workoutName.trim()) return;
    if (workouts.some((workout) => workout.id === workoutId)) return;

    setWorkouts([...workouts, { id: workoutId, name: workoutName, sets: [] }]);
    setSearchQuery("");
  };

  const finishWorkout = async () => {
    if (!sessionName.trim()) {
      alert("Please enter a name for your workout session.");
      return;
    }

    setLoading(true); 

    try {
      const token = localStorage.getItem("token");
      if (!user?.isGuest) {
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
        return;
      }

      setSessionName("");
      setWorkouts([]);
      localStorage.removeItem("token");
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

      <input
        type="text"
        placeholder="Search or create a new workout..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-5xl p-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {searchQuery && (
        <div className="w-full max-w-5xl bg-gray-900 p-3 rounded-lg border border-gray-700 text-white">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <motion.div
                key={workout.id}
                onClick={() => addWorkout(workout.id, workout.name)}
                className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition"
                whileHover={{ scale: 1.05 }}
              >
                {workout.name}
              </motion.div>
            ))
          ) : (
            <motion.div
              onClick={() => addWorkout(crypto.randomUUID(), searchQuery)}
              className="p-2 text-blue-400 cursor-pointer hover:bg-gray-800 rounded-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              + Create "{searchQuery}"
            </motion.div>
          )}
        </div>
      )}

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

export default WorkoutManager;
