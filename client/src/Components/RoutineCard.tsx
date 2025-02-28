import React from "react";
import RoutineCardProps from "../interfaces/RoutineCardProps";

const RoutineCard: React.FC<RoutineCardProps> = ({ name, imageUrl }) => {
  return (
    <div className="max-w-[220px] md:max-w-[250px] w-full bg-green-400 rounded-xl flex flex-col items-center justify-center p-4 shadow-xl transition-transform transform hover:scale-105">

      {/* Larger Image for Better Visibility */}
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover shadow-md"
      />
      
      {/* Bigger Text for Better Readability */}
      <p className="mt-4 text-black font-bold text-center text-lg md:text-xl">{name}</p>
    </div>
  );
};

export default RoutineCard;
