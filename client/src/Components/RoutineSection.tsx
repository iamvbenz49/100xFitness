import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RoutineCard from "./RoutineCard";
import Spidey from "../assets/spidey.jpg";
import React from "react";

const routines = [
  { name: "Shoulder & Biceps", imageUrl: Spidey },
  { name: "Chest & Triceps", imageUrl: Spidey },
  { name: "Lat & Biceps", imageUrl: Spidey },
  { name: "Legs & Abs", imageUrl: Spidey },
  { name: "Cardio", imageUrl: Spidey },
];


const RoutineSection: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-10 md:p-14 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-3xl shadow-xl border border-gray-700 w-full max-w-5xl"
      >
        <motion.h3 
          className="text-4xl md:text-5xl font-bold mb-8 text-blue-400 text-center md:text-left"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sample Routines
        </motion.h3>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {routines.map((routine, index) => (
            <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="hover:shadow-blue-500/30 rounded-xl transition duration-300"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            onClick={() => navigate(`/sample`)} 
          >
            <RoutineCard name={routine.name} imageUrl={routine.imageUrl} />
          </motion.div>
          
          ))}
          <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0px 2px 6px rgba(59, 130, 246, 0.3)" }}
    className="max-w-[220px] md:max-w-[250px] w-full bg-gray-800 rounded-xl flex items-center justify-center p-4 shadow-md border border-gray-700 transition-transform"
    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
  >
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "#1E40AF" }}
      whileTap={{ scale: 0.95 }}
      className="text-white font-bold text-lg md:text-xl w-full h-full flex items-center justify-center"
      onClick={() => navigate("/routine")}
    >
      + New Routine
    </motion.button>
  </motion.div>
  
        </motion.div>
      </motion.div>
    );
};

export default RoutineSection;