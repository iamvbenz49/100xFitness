import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Workout } from "../interfaces/Workout";



const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const WorkoutHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([]);
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.data) {
          console.log(response.data.data);
          setWorkoutHistory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching workout history:", error);
      }
    };

    fetchWorkoutHistory();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-950 p-6">
      <h1 className="text-white text-3xl font-bold mb-6">Workout History</h1>

      <div className="w-full max-w-5xl h-3/4 overflow-y-auto p-5 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl">
        {workoutHistory.length > 0 ? (
          workoutHistory.map((workout) => (
            <motion.div
              key={workout.id}
              className="p-4 mb-5 rounded-lg bg-gray-900 border border-gray-700 text-white cursor-pointer shadow-md shadow-blue-500/10"
              whileHover={{ scale: 1.03 }}
              onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{workout.name}</h2>
                <span className="text-gray-400">{new Date(workout.createdAt).toLocaleDateString()}</span>
              </div>

              <AnimatePresence>
                {expandedWorkout === workout.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    {workout.exercises.map((exercise) => (
                      <div key={exercise.id} className="p-5 bg-gray-800 rounded-lg mt-4 shadow-lg shadow-blue-500/10">
                        <h3 className="text-xl font-semibold text-blue-400">{exercise.name}</h3>

                        <div className="grid grid-cols-3 gap-4 mt-3 text-gray-300">
                          {exercise.sets.map((set, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-700 rounded-lg flex flex-col items-center justify-center border border-gray-600 shadow-md"
                            >
                              <span className="text-sm text-gray-400">Set {index + 1}</span>
                              <span className="text-lg font-bold text-white">{set.weight} kg</span>
                              <span className="text-md font-semibold text-blue-400">{set.reps} reps</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No past workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutHistory;
