import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle navbar visibility
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">CareCanada</Link>

        {/* Navbar Toggle Button for Small Screens */}
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link text-white" to="/" onClick={toggleNavbar}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/appointments" onClick={toggleNavbar}>Appointments</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/profile" onClick={toggleNavbar}>Profile</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/settings" onClick={toggleNavbar}>Settings</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/carecanadaprompt" onClick={toggleNavbar}>AI Diagnosis</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/carepanel" onClick={toggleNavbar}>Admin Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/dashboard" onClick={toggleNavbar}>Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/doctors" onClick={toggleNavbar}>Doctor Management</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/first-aid" onClick={toggleNavbar}>First Aid</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/login" onClick={toggleNavbar}>Login</Link></li>
            <li className="nav-item"><Link className="btn btn-light text-danger ms-2" to="/signup" onClick={toggleNavbar}>Sign Up</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
