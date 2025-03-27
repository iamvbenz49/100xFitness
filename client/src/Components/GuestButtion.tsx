import { motion } from "framer-motion";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const GuestButton: React.FC = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const handleGuestLogin = async () => {
        if (auth) {
          try {
            auth.guestLogin();
            navigate("/");
          } catch (error: unknown) {
            alert(`Guest login failed. Please try again. ${error}`);
          } 
        }
    };
    return (
        <motion.button
          onClick={handleGuestLogin}
          className="w-full mt-4 py-4 rounded-xl shadow-md font-semibold text-lg bg-gray-700 text-white hover:bg-gray-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {"Login as Guest"}
        </motion.button>
    )
}

export default GuestButton;