import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Function to toggle navbar visibility
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("user"); // ✅ Clear user session
    alert("Logged out successfully!");
    navigate("/login"); // ✅ Redirect to login page
  };

  // Fetch user data & Redirect if not logged in (except for login/signup pages)
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

    if (!loggedInUser && location.pathname !== "/login" && location.pathname !== "/signup") {
      navigate("/login"); // ✅ Redirect non-logged-in users to login
    } else if (loggedInUser) {
      // ✅ Ensure is_admin is treated as a number
      loggedInUser.is_admin = Number(loggedInUser.is_admin);
      setUser(loggedInUser);
    }
  }, [navigate, location]);

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
            
            {/* Show Only If User is Logged In */}
            {user ? (
              <>
                {/* ✅ Patient-Specific Pages */}
                {user.is_admin === 0 && (
                  <>
                    <li className="nav-item"><Link className="nav-link text-white" to="/" onClick={toggleNavbar}>Home</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white" to="/appointments" onClick={toggleNavbar}>Appointments</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white" to="/profile" onClick={toggleNavbar}>Profile</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white" to="/settings" onClick={toggleNavbar}>Settings</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white" to="/firstaid" onClick={toggleNavbar}>First Aid</Link></li>
                  </>
                )}

                {/* ✅ Admin-Specific Pages */}
                {user.is_admin === 1 && (
                  <>
                    <li className="nav-item"><Link className="nav-link text-white" to="/dashboard" onClick={toggleNavbar}>Admin Dashboard</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white" to="/doctors" onClick={toggleNavbar}>Doctor Management</Link></li>
                  </>
                )}

                {/* 🔥 Logout Button with Icon */}
                <li className="nav-item">
                  <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* If Not Logged In, Show Login & Signup */}
                <li className="nav-item"><Link className="nav-link text-white" to="/login" onClick={toggleNavbar}>Login</Link></li>
                <li className="nav-item"><Link className="btn btn-light text-danger ms-2" to="/signup" onClick={toggleNavbar}>Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
