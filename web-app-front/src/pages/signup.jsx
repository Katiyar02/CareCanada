import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faPhone, faMapMarkerAlt, faBirthdayCake } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    emergencyName: "",
    emergencyRelation: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
    is_admin: 0, // 0 = Patient, 1 = Admin
    agreed: false,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergency_contact: formData.emergencyContact,
        emergency_name: formData.emergencyName,
        emergency_relation: formData.emergencyRelation,
        postal_code: formData.postalCode,
        password: formData.password,
        is_admin: formData.is_admin,
      });

      if (response.data.success) {
        alert("Signup Successful!");
        window.location.href = "/login";
      } else {
        alert("Signup Failed!");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Error signing up.");
    }
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
