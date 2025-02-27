import React from "react";
import RoutineCardProps from "../interfaces/RoutineCardProps";

const RoutineCard: React.FC<RoutineCardProps> = ({ name, imageUrl }) => {
  return (
    <div className="w-40 h-40 bg-green-300 rounded-lg flex flex-col items-center justify-center p-2 shadow-lg">
      {/* Make image square */}
      <img src={imageUrl} alt={name} className="w-20 h-20 rounded-md object-cover" />
      <p className="mt-2 text-black font-semibold text-center">{name}</p>
    </div>
  );
};

export default RoutineCard;
