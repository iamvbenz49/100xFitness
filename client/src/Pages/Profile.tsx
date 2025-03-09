import { motion } from "framer-motion";
import {
  FaWeight,
  FaDumbbell,
  FaBullseye,
  FaUser,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import UserProfile from "../interfaces/UserProfile";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    height: "",
    currentWeight: "",
    targetWeight: "",
    Goal: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}user`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });
        console.log(response.data)
        setUserProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BACKEND_URL}user`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl font-bold"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-xl text-center">{error}</div>;
  }

  if (!userProfile) {
    return <div className="text-white text-xl text-center">User not found</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 items-center justify-center">
      <motion.div className="w-full max-w-2xl p-10 rounded-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md border border-gray-700 shadow-2xl text-center">
        <div className="flex flex-col items-center mb-6">
          <FaUser className="text-blue-400 text-6xl mb-4" />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-white text-4xl font-bold bg-gray-700 border border-gray-600 rounded p-2 text-center"
            />
          ) : (
            <h2 className="text-white text-4xl font-bold">{userProfile.name}</h2>
          )}
        </div>

        <div className="text-gray-300 text-lg mb-4 flex items-center justify-center">
          <FaEnvelope className="text-gray-400 mr-3" />
          <span><strong>Email:</strong> {userProfile.email}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 text-gray-300 text-lg">
          {[  
            { icon: <FaWeight className="text-green-400" />, label: "Current Weight", key: "currentWeight" },
            { icon: <FaBullseye className="text-yellow-400" />, label: "Target Weight", key: "targetWeight" },
            { icon: <FaDumbbell className="text-red-400" />, label: "Goal", key: "Goal" },
          ].map(({ icon, label, key }) => (
            <div key={key} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                {icon}
                <strong>{label}:</strong>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 rounded p-1 text-white text-right w-24"
                />
              ) : (
                <span>{userProfile[key as keyof UserProfile]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4  mt-6 justify-center"> 
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg flex items-center justify-center hover:bg-green-600 transition"
              >
                <FaSave className="mr-2" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg flex items-center justify-center hover:bg-gray-600 transition"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
            >
              <FaEdit className="mr-2" /> Update Profile
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
