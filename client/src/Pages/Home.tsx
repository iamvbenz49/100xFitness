import React from "react";
import RoutineCard from "../Components/RoutineCard";
import Batman from "../assets/batma.jpg";
import Bateman from "../assets/bateman.jpg";
import Homelander from "../assets/homelander.jpg";
import Superman from "../assets/superman.jpg";
import Spidey from "../assets/spidey.jpg"
const routines = [
  { name: "Shoulder Biceps", imageUrl:Batman },
  { name: "Chest Triceps", imageUrl: Bateman },
  { name: "Lat Biceps", imageUrl: Homelander},
  { name: "Leg Abs", imageUrl: Superman },
  { name: "Cardio", imageUrl: Spidey },
];

// Profile Section
const ProfileSection: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg">Hello, Name</h2>
      <div className="w-40 h-40 bg-gray-300 rounded-lg flex items-center justify-center mt-2">
        Some Image
      </div>
    </div>
  );
};

// Routine Section
const RoutineSection: React.FC = () => {
  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {routines.map((routine, index) => (
        <RoutineCard key={index} name={routine.name} imageUrl={routine.imageUrl} />
      ))}
      <button className="p-4 bg-gray-300 rounded-lg">+ New Routine</button>
    </div>
  );
};

// Dashboard Component
const Dashboard: React.FC = () => {
  return (
    <div className="flex justify-between mt-4">
      <ProfileSection />
      <RoutineSection />
    </div>
  );
};

export default Dashboard;
