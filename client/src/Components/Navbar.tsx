import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiClock, FiBarChart2, FiUsers, FiUser, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const linkClasses = (path: string) =>
    `flex flex-col sm:flex-row items-center gap-3 px-5 py-4 rounded-lg text-lg font-semibold transition duration-300 ${
      location.pathname === path
        ? "bg-blue-500 text-white shadow-md shadow-blue-500/50"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 flex flex-wrap justify-around items-center shadow-md w-full mx-auto">
      <Link to="/" className={linkClasses("/")}>
        <FiHome size={44} /> <span className="hidden sm:inline text-xl">Home</span>
      </Link>
      <Link to="/history" className={linkClasses("/history")}>
        <FiClock size={44} /> <span className="hidden sm:inline text-xl">History</span>
      </Link>
      <Link to="/weight-track" className={linkClasses("/weight-track")}>
        <FiBarChart2 size={44} /> <span className="hidden sm:inline text-xl">Weight & Track</span>
      </Link>
      <Link to="/macros" className={linkClasses("/macros")}>
        <FiUsers size={44} /> <span className="hidden sm:inline text-xl">Macros</span>
      </Link>
      <Link to="/profile" className={linkClasses("/profile")}>
        <FiUser size={44} /> <span className="hidden sm:inline text-xl">Profile</span>
      </Link>
      {auth && auth.logout && (
        <button
          onClick={auth.logout}
          className="flex flex-col sm:flex-row items-center gap-3 px-5 py-4 rounded-xl text-lg font-semibold text-gray-300 hover:text-white hover:bg-red-600 transition duration-300"
        >
          <FiLogOut size={28} /> <span className="hidden sm:inline text-lg">Logout</span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
