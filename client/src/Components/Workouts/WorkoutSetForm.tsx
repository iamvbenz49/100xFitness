import { motion } from "framer-motion";
import { useState } from "react";
const WorkoutSetForm = ({
  index,
  weight,
  reps,
  onUpdateSet,
}: {
  index: number;
  weight: number;
  reps: number;
  onUpdateSet: (index: number, newSet: { weight: number; reps: number }) => void;
}) => {
  const [localWeight, setLocalWeight] = useState(weight);
  const [localReps, setLocalReps] = useState(reps);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLocalWeight(value);
    onUpdateSet(index, { weight: value, reps: localReps });
  };

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalReps(value);
    onUpdateSet(index, { weight: localWeight, reps: value });
  };

  return (
    <motion.div
      className="bg-gray-900 p-4 rounded-xl shadow-md border border-gray-700 flex flex-col space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="text-white text-sm">Weight (kg)</label>
      <input
        type="number"
        value={localWeight}
        onChange={handleWeightChange}
        placeholder="Weight (kg)"
        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="text-white text-sm">Reps</label>
      <input
        type="number"
        value={localReps}
        onChange={handleRepsChange}
        placeholder="Reps"
        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </motion.div>
  );
};

export default WorkoutSetForm;
