import React, { useState } from "react";
import { motion } from "framer-motion";
import DietSelector from "../Components/Macros/DietSelector";
import PieChartComponent from "../Components/Macros/PieChartComponent";
import MacroInput from "../Components/Macros/MacroInput";
import MacroHistory from "../Components/Macros/MacroHistory";
import MacroAI from "../Components/Macros/MacroAI";


const DietTracker: React.FC = () => {
  const [selectedDiet, setDietType] = useState<string>("AI");
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="flex items-start justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6"
    >
      <div className="flex w-full max-w-6xl space-x-6">

        <div className="flex flex-col p-8 rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md shadow-lg text-white w-[150vh] h-[80vh] mx-auto">

          <DietSelector setDietType={setDietType} selectedDiet={selectedDiet} />
          
          {selectedDiet === "AI" && <MacroAI />}

          {selectedDiet === "Normal" && (
            <>
              <MacroInput />
              <div className="overflow-y-auto flex-grow p-6 border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
                <PieChartComponent />
              </div>
            </>
          )}
          {selectedDiet === "Macro" && (
              <MacroHistory />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DietTracker;
<div className="overflow-y-auto flex-grow p-6 border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
                <PieChartComponent />
              </div>