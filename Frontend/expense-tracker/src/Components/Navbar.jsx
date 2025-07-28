import React, { useContext, useState } from 'react';
import { userDataContext } from '../Context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import SideMenu from "../Components/SideMenu.jsx"

// Main Navbar Component
const Navbar = () => {
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for side menu visibility

  // Function to get the user's first letter (only from name)
  const getUserInitial = () => {
    // Access userData.user.name as per the provided structure
    if (userData && userData?.name) {
      return userData?.name.charAt(0).toUpperCase();
    }
    return 'U'; // Default initial if no user data or name found
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-lg rounded-b-xl border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Burger Menu for small screens, Heading for larger screens */}
        <div className="flex items-center">
          {/* Burger Icon (visible on small screens) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none mr-4"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Expense Tracker Heading */}
          <Link to="/dashboard" className="text-gray-800 text-2xl font-bold tracking-wide cursor-pointer">
            Expense Tracker
          </Link>
        </div>


        {/* Right side: User's First Letter */}
        {userData ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-600 flex items-center justify-center rounded-full shadow-md border-2 border-white text-white font-bold text-xl">
              {getUserInitial()}
            </div>
          </div>
        ) : (
          // Show a login button if user is not logged in, and navigate on click
          <button
            onClick={() => navigate("/login")} // Use navigate for programmatic routing
            className="px-4 py-2 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition duration-300"
          >
            Login
          </button>
        )}
      </div>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} userData={userData} navigate={navigate}  />

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-20 z-40 md:hidden backdrop-blur-sm" // Changed background and added backdrop-blur
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;

