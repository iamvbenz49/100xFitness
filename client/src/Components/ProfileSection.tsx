import { motion } from "framer-motion";
import Homelander from "../assets/batma.jpg";

const ProfileSection: React.FC = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-10 md:p-14 bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-md rounded-3xl shadow-xl border border-gray-700 flex flex-col items-center text-white w-full max-w-2xl"
      >
        <motion.img 
          src={Homelander}
          alt="Profile" 
          className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-blue-500 shadow-md shadow-blue-500/50 hover:shadow-blue-400/80 transition duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
        />
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome, <span className="text-blue-400">Dude</span>
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Your fitness journey starts now!
        </motion.p>
      </motion.div>
    );
  };

export default ProfileSection;
