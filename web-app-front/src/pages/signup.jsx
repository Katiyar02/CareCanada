// web-app-front/src/pages/signup.jsx
import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("User Signed Up:", formData);
    alert("Signup Successful!");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h3 className="text-center mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="fullName" placeholder="Enter your full name" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your email" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Enter your password" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm your password" required onChange={handleChange} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="agreed" required onChange={handleChange} />
            <label className="form-check-label">I agree to the <a href="#">terms & conditions</a></label>
          </div>
          <button type="submit" className="btn signup-btn w-100 btn-danger">Sign Up</button>
          <p className="text-center mt-3 text-center">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
