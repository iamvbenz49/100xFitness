import React from "react";
import { motion } from "framer-motion";

// import Batman from "../assets/batma.jpg";
// import Bateman from "../assets/bateman.jpg";
import RoutineSection from "../Components/RoutineSection";
import ProfileSection from "../Components/ProfileSection";
// import Superman from "../assets/superman.jpg";





const Dashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row justify-center items-center gap-14 p-10 md:p-20 bg-gray-950 min-h-screen"
    >
      <ProfileSection />
      <RoutineSection />
    </motion.div>
  );
};

export default Dashboard;
