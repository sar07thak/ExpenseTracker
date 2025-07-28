import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes, FaBars } from "react-icons/fa";// Assuming SideMenu.jsx is in the Components folder
import SideMenu from './SideMenu';
import { userDataContext } from '../Context/userContext';

// Main Navbar Component
const Navbar = () => {
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for side menu visibility



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-lg rounded-b-xl border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">

        {/* Left side: Burger Menu and Expense Tracker Heading */}
        <div className="flex items-center">
          {/* Burger Icon (now visible on all screens) */}
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none mr-4" // Removed md:hidden
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Expense Tracker Heading */}
          <Link to="/dashboard" className="text-gray-800 text-2xl font-bold tracking-wide cursor-pointer">
            Expense Tracker
          </Link>
        </div>
      </div>

      {/* Side Menu */}
      {/* SideMenu no longer needs userData and navigate props as it uses useContext and useNavigate internally */}
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-20 z-40 backdrop-blur-sm" // Removed md:hidden from overlay
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;