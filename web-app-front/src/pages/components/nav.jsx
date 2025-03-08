// src/pages/components/nav.jsx
// Navigation Bar with Sidebar Toggle

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
  <div className="container-fluid"> {/* Changed from container to container-fluid */}
    {/* Sidebar Toggle Button */}
    <button className="btn btn-light me-3" onClick={toggleSidebar}>
      <i className="fas fa-bars"></i>
    </button>

    {/* Brand */}
    <Link className="navbar-brand" to="/">CareCanada</Link>

    {/* Navbar Toggle Button for Small Screens */}
    <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navbar Links */}
    <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><Link className="nav-link" to="/" onClick={toggleNavbar}>Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/appointments" onClick={toggleNavbar}>Appointments</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/profile" onClick={toggleNavbar}>Profile</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/settings" onClick={toggleNavbar}>Settings</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/login" onClick={toggleNavbar}>Login</Link></li>
        <li className="nav-item"><Link className="btn btn-light text-danger ms-2" to="/signup" onClick={toggleNavbar}>Sign Up</Link></li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
