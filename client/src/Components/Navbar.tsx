import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, History, BarChart, Utensils, User } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `flex flex-col sm:flex-row items-center gap-3 px-5 py-4 rounded-lg text-lg font-semibold transition duration-300 ${
      location.pathname === path
        ? "bg-blue-500 text-white shadow-md shadow-blue-500/50"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 flex flex-wrap justify-around items-center shadow-md w-full mx-auto ">
      <Link to="/" className={linkClasses("/")}>
        <Home size={44} /> <span className="hidden sm:inline text-xl">Home</span>
      </Link>
      <Link to="/history" className={linkClasses("/history")}>
        <History size={44} /> <span className="hidden sm:inline text-xl">History</span>
      </Link>
      <Link to="/weight-track" className={linkClasses("/weight-track")}>
        <BarChart size={44} /> <span className="hidden sm:inline text-xl">Weight & Track</span>
      </Link>
      <Link to="/macros" className={linkClasses("/macros")}>
        <Utensils size={44} /> <span className="hidden sm:inline text-xl">Macros</span>
      </Link>
      <Link to="/profile" className={linkClasses("/profile")}>
        <User size={44} /> <span className="hidden sm:inline text-xl">Profile</span>
      </Link>
    </nav>
  );
};

export default Navbar;
