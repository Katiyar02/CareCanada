// src/App.jsx
// Main App Component - Handles Routing & Layout

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/components/nav";
import Footer from "./pages/components/footer";

// Importing Pages
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Appointments from "./pages/appointments";
import DoctorManagement from "./pages/doctormanagement";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Controls sidebar visibility

  return (
    <Router>

          <Navbar />
          {/* Page Content */}
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/doctors" element={<DoctorManagement />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          {/* Footer */}
          <Footer />
    </Router>
  );
};

export default App;
