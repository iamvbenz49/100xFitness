import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import WorkoutSetForm from "./WorkoutSetForm";

const WorkoutTracker = ({
  id,
  name,
  sets,
  onUpdateWorkout,
}: {
  id: string;
  name: string;
  sets: { weight: number; reps: number }[];
  onUpdateWorkout: (id: string, updatedWorkout: { name: string; sets: { weight: number; reps: number }[] }) => void;
}) => {
  const [workoutSets, setWorkoutSets] = useState(sets);
  const [previousBest, setPreviousBest] = useState<{ weight: number; reps: number } | null>(null);

  useEffect(() => {
    if (sets.length > 0) {
      const bestSet = sets.reduce((best, set) => (set.weight > best.weight ? set : best), { weight: 0, reps: 0 });
      setPreviousBest(bestSet);
    }
  }, [sets]);

  const updateSet = (index: number, newSet: { weight: number; reps: number }) => {
    const updatedSets = workoutSets.map((set, i) => (i === index ? newSet : set));
    setWorkoutSets(updatedSets);
    onUpdateWorkout(id, { name, sets: updatedSets });

    if (newSet.weight > (previousBest?.weight || 0)) {
      setPreviousBest(newSet);
    }
  };

  const addNewSet = () => {
    const newSet = { weight: 0, reps: 0 };
    const updatedSets = [...workoutSets, newSet];
    setWorkoutSets(updatedSets);
    onUpdateWorkout(id, { name, sets: updatedSets });
  };

  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 w-full max-w-md text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-center">{name}</h3>

      {previousBest && (
        <div className="mb-4 p-3 bg-gray-800 rounded-lg text-center">
          <p className="text-sm text-gray-400">Previous Best</p>
          <p className="font-semibold text-lg">
            {previousBest.weight} kg × {previousBest.reps} reps
          </p>
        </div>
      )}

      <div className="mt-4 space-y-4">
        {workoutSets.length > 0 ? (
          workoutSets.map((set, index) => (
            <WorkoutSetForm key={index} index={index} weight={set.weight} reps={set.reps} onUpdateSet={updateSet} />
          ))
        ) : (
          <p className="text-gray-400 text-center">No sets added yet.</p>
        )}
      </div>

      <motion.button
        onClick={addNewSet}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:opacity-90 shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add New Set
      </motion.button>
    </motion.div>
  );
};

export default WorkoutTracker;
