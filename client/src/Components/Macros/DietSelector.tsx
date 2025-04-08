import React from "react";
import { DietSelectorProps } from "../../types/DietSelectorProps";
import { Bot, Utensils, History } from "lucide-react";

const DietSelector: React.FC<DietSelectorProps> = ({ setDietType, selectedDiet }) => {
  const getButtonClasses = (diet: string) =>
    `flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-lg transition ${
      selectedDiet === diet ? "bg-blue-700 text-white" : "bg-gray-600 text-white hover:bg-gray-700"
    }`;

  return (
    <div className="p-4 text-center flex justify-center space-x-4">
      <button className={getButtonClasses("AI")} onClick={() => setDietType("AI")}>
        <Bot size={18} />
        <span className="hidden min-[680px]:inline">AI Diet</span>
      </button>

      <button className={getButtonClasses("Normal")} onClick={() => setDietType("Normal")}>
        <Utensils size={18} />
        <span className="hidden min-[680px]:inline">Normal Diet</span>
      </button>

      <button className={getButtonClasses("Macro")} onClick={() => setDietType("Macro")}>
        <History size={18} />
        <span className="hidden min-[680px]:inline">Macro History</span>
      </button>
    </div>
  );
};

export default DietSelector;
