// web-app-front/src/pages/login.jsx

import React, { useState, useEffect } from "react";

const Login = () => {
  const [waitTime, setWaitTime] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTime(Math.floor(Math.random() * 15) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find a Doctor Near You</h1>
          <p className="lead">Check wait times and book appointments instantly.</p>
          <form className="row g-2 justify-content-center">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Enter location (e.g., Toronto, ON)" />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Enter specialty (e.g., Cardiologist)" />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">Search</button>
            </div>
          </form>
          <p className="mt-3 wait-time">Current Wait Time: <span>{waitTime}</span> patients ahead</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="login-container">
        <h3 className="mb-4">Login to CareCanada</h3>
        
        <button className="btn social-btn google-btn">
          <i className="fab fa-google"></i> Continue with Google
        </button>

        <div className="divider"><span>or</span></div>

        <form>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Remember me</label>
          </div>
          <button type="submit" className="btn login-btn w-100">Login</button>
          <p className="mt-3">
            <a href="#">Forgot Password?</a> | <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
