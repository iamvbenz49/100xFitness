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
          console.log(response.data)
          setWorkoutHistory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching workout history:", error);
      }
    };
    
    fetchWorkoutHistory();
    console.log("Exercises:", workoutHistory[0]?.exercises);

  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6"
    >
      <motion.h1 
        className="text-white text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Workout History
      </motion.h1>

      <motion.div 
        className="w-full max-w-5xl h-[70vh] overflow-y-auto p-5 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {workoutHistory.length > 0 ? (
          workoutHistory.map((workout) => (
            <motion.div
              key={workout.id}
              className="p-4 mb-5 rounded-lg bg-gray-900 border border-gray-700 text-white cursor-pointer shadow-md shadow-blue-500/10"
              whileHover={{ scale: 1.03, boxShadow: "0px 4px 10px rgba(59, 130, 246, 0.3)" }}
              onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
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
                      <motion.div 
                        key={exercise.id} 
                        className="p-5 bg-gray-800 rounded-lg mt-4 shadow-lg shadow-blue-500/10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold text-blue-400">{`${exercise.exercise.name}`}</h3>

                        <div className="grid grid-cols-3 gap-4 mt-3 text-gray-300">
                        {exercise.exercise.SetLog && exercise.exercise.SetLog.length > 0 ? (
                            exercise.exercise.SetLog.map((set: any, index: any) => (
                              <motion.div
                                key={index}
                                className="p-4 bg-gray-700 rounded-lg flex flex-col items-center justify-center border border-gray-600 shadow-md"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <span className="text-sm text-gray-400">Set {index + 1}</span>
                                <span className="text-lg font-bold text-white">{set.weight} kg</span>
                                <span className="text-md font-semibold text-blue-400">{set.reps} reps</span>
                              </motion.div>
                            ))
                          ) : (
                            <span className="text-gray-500">No sets logged </span> 
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <motion.p 
            className="text-gray-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No past workouts found.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default WorkoutHistory;
