import React from "react";
import RoutineCardProps from "../interfaces/RoutineCardProps";
import { motion } from "framer-motion";

const RoutineCard: React.FC<RoutineCardProps> = ({ name, imageUrl }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 2px 6px rgba(59, 130, 246, 0.3)" }}
      className="max-w-[220px] md:max-w-[250px] w-full bg-gray-800 rounded-xl flex flex-col items-center justify-center p-4 shadow-md border border-gray-700 transition-transform"
    >
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover shadow-sm border border-blue-500"
      />
      
      <p className="mt-4 text-white font-bold text-center text-lg md:text-xl">{name}</p>
    </motion.div>
  );
};

export default RoutineCard;
