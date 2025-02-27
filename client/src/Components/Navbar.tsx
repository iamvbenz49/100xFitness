import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-400 p-3 rounded-lg flex justify-around mb-4">
      <Link to="/" className="font-bold underline">Home</Link>
      <Link to="/history">History</Link>
      <Link to="/weight-track">Weight & Track</Link>
      <Link to="/macros">Macros</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
};

export default Navbar;
