import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, History, BarChart2, Pizza, User, LogOut, Newspaper } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  
  const linkClasses = (path: string) =>
    `flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-sm sm:text-lg font-semibold transition duration-300 w-full sm:w-auto justify-center sm:justify-start ${
      location.pathname === path
        ? "bg-blue-500 text-white shadow-md shadow-blue-500/50"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 sm:p-6 flex flex sm:flex-row justify-around items-center shadow-md w-full mx-auto gap-2 sm:gap-4">
      <Link to="/" className={linkClasses("/")}>
        <Home size={28} /> <span className="hidden sm:inline">Home</span>
      </Link>
      <Link to="/history" className={linkClasses("/history")}>
        <History size={28} /> <span className="hidden sm:inline">History</span>
      </Link>
      <Link to="/weight-track" className={linkClasses("/weight-track")}>
        <BarChart2 size={28} /> <span className="hidden sm:inline">Weight & Track</span>
      </Link>
      <Link to="/macros" className={linkClasses("/macros")}>
        <Pizza size={28} /> <span className="hidden sm:inline">Macros</span>
      </Link>
      <Link to="/feed" className={linkClasses("/feed")}>
        <Newspaper size={28} /> <span className="hidden sm:inline">Feed</span>
      </Link>
      <Link to="/profile" className={linkClasses("/profile")}>
        <User size={28} /> <span className="hidden sm:inline">Profile</span>
      </Link>
      {auth && auth.logout && (
        <button
          onClick={auth.logout}
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-sm sm:text-lg font-semibold text-gray-300 hover:text-white hover:bg-red-600 transition duration-300 w-full sm:w-auto justify-center sm:justify-start"
        >
          <LogOut size={24} /> <span className="hidden sm:inline">Logout</span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
