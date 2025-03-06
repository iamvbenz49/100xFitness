import { motion } from "framer-motion";
import { FaWeight, FaDumbbell, FaBullseye, FaUser, FaEnvelope, FaRuler, FaEdit } from "react-icons/fa";
import { useState } from "react";

const initialProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  targetWeight: 75,
  currentWeight: 80,
  goal: "Lose fat and build muscle",
  height: "180 cm",
  age: 28,
};

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState(initialProfile);

  return (
    <div className="flex h-screen bg-gray-950 p-6 items-center justify-center">
      <motion.div className="w-full max-w-2xl bg-gray-800 p-10 rounded-lg border border-gray-700 shadow-2xl text-center">
        <div className="flex flex-col items-center mb-6">
          <FaUser className="text-blue-400 text-6xl mb-4" />
          <h2 className="text-white text-4xl font-bold">{userProfile.name}</h2>
        </div>
        <p className="text-gray-300 text-lg mb-4 flex items-center justify-center">
          <FaEnvelope className="text-gray-400 mr-3" />
          <strong>Email:</strong> {userProfile.email}
        </p>
        <p className="text-gray-300 text-lg mb-4 flex items-center justify-center">
          <FaRuler className="text-blue-400 mr-3" />
          <strong>Height:</strong> {userProfile.height}
        </p>
        <p className="text-gray-300 text-lg mb-4 flex items-center justify-center">
          <FaWeight className="text-green-400 mr-3" />
          <strong>Current Weight:</strong> {userProfile.currentWeight} kg
        </p>
        <p className="text-gray-300 text-lg mb-4 flex items-center justify-center">
          <FaBullseye className="text-yellow-400 mr-3" />
          <strong>Target Weight:</strong> {userProfile.targetWeight} kg
        </p>
        <p className="text-gray-300 text-lg mb-4 flex items-center justify-center">
          <FaDumbbell className="text-red-400 mr-3" />
          <strong>Goal:</strong> {userProfile.goal}
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
          <FaEdit className="mr-2" /> Update Profile
        </button>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
