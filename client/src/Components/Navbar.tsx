import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, History, BarChart2, Users, User, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  
  const linkClasses = (path: string) =>
    `flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm sm:text-lg font-semibold transition duration-300 w-full sm:w-auto ${
      location.pathname === path
        ? "bg-blue-500 text-white shadow-md shadow-blue-500/50"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 sm:p-6 flex flex-col sm:flex-row justify-around items-center shadow-md w-full mx-auto gap-2 sm:gap-4">
      <Link to="/" className={linkClasses("/")}>
        <Home size={28} /> <span className="text-xs sm:text-base">Home</span>
      </Link>
      <Link to="/history" className={linkClasses("/history")}>
        <History size={28} /> <span className="text-xs sm:text-base">History</span>
      </Link>
      <Link to="/weight-track" className={linkClasses("/weight-track")}>
        <BarChart2 size={28} /> <span className="text-xs sm:text-base">Weight & Track</span>
      </Link>
      <Link to="/macros" className={linkClasses("/macros")}>
        <Users size={28} /> <span className="text-xs sm:text-base">Macros</span>
      </Link>
      <Link to="/profile" className={linkClasses("/profile")}>
        <User size={28} /> <span className="text-xs sm:text-base">Profile</span>
      </Link>
      {auth && auth.logout && (
        <button
          onClick={auth.logout}
          className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm sm:text-lg font-semibold text-gray-300 hover:text-white hover:bg-red-600 transition duration-300 w-full sm:w-auto"
        >
          <LogOut size={24} /> <span className="text-xs sm:text-base">Logout</span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
