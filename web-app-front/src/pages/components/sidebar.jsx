// src/pages/components/sidebar.jsx
// Sidebar Component - Includes Navigation Links

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
      <h3 className="text-center">CareCanada Admin</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/doctors">
            <i className="fas fa-user-md"></i> Doctors
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/appointments">
            <i className="fas fa-calendar-check"></i> Appointments
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/profile">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/settings">
            <i className="fas fa-cog"></i> Settings
          </Link>
        </li>
      </ul>
      <hr />
      <div>
        <Link className="nav-link text-danger" to="/login">
          <i className="fas fa-sign-out-alt"></i> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
