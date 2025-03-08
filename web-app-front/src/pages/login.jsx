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
     

      {/* Login Form */}
      <div className="login-container">
        <h3 className="mb-4 text-center">Login to CareCanada</h3>
        
  


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
          <button type="submit" className="btn login-btn btn-danger w-100">Login</button>
          <p className="mt-3 text-center">
            <a href="#">Forgot Password?</a> | <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
