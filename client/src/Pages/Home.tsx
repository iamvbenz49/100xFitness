import React from "react";
import { motion } from "framer-motion";
import RoutineCard from "../Components/RoutineCard";
import Batman from "../assets/batma.jpg";
import Bateman from "../assets/bateman.jpg";
import Homelander from "../assets/homelander.jpg";
import Superman from "../assets/superman.jpg";
import Spidey from "../assets/spidey.jpg";

const routines = [
  { name: "Shoulder & Biceps", imageUrl: Batman },
  { name: "Chest & Triceps", imageUrl: Bateman },
  { name: "Lat & Biceps", imageUrl: Homelander },
  { name: "Legs & Abs", imageUrl: Superman },
  { name: "Cardio", imageUrl: Spidey },
];

const ProfileSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-12 md:p-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl flex flex-col items-center text-white transform hover:scale-105 transition duration-300 w-full max-w-2xl"
    >
      <img 
        src={Homelander}
        alt="Profile" 
        className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-blue-500 shadow-lg shadow-blue-500/50"
      />
      <h2 className="text-3xl md:text-5xl font-bold mt-8">
        Hello, <span className="text-blue-400">Dude</span>
      </h2>
    </motion.div>
  );
};

const RoutineSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-10 md:p-14 bg-gray-900 text-white rounded-3xl shadow-2xl w-full max-w-5xl"
    >
      <h3 className="text-3xl md:text-5xl font-semibold mb-10 text-blue-400">Your Routines</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-14">
        {routines.map((routine, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.3 }}
          >
            <RoutineCard 
              name={routine.name} 
              imageUrl={routine.imageUrl} 
            />
          </motion.div>
        ))}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="p-6 md:p-8 bg-blue-600 text-white text-2xl font-semibold rounded-2xl hover:bg-blue-700 transition w-full"
        >
          + New Routine
        </motion.button>
      </div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-16 p-8 md:p-16 bg-gray-950 min-h-screen">
      <ProfileSection />
      <RoutineSection />
    </div>
  );
};

export default Dashboard;
