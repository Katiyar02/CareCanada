import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [waitTime, setWaitTime] = useState(10);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Simulate dynamic wait time for UI effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTime(Math.floor(Math.random() * 15) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);

      if (response.data.success) {
        alert("Login successful!");

        // ✅ Store user data in Session Storage
        sessionStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect based on user role
        if (response.data.user.is_admin === 1) {
          window.location.href = "/dashboard"; // Admin dashboard
        } else {
          window.location.href = "/"; // Patient dashboard
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

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

          {/* Login Form */}
          <div className="login-container p-4 border rounded shadow-sm">
            <h3 className="text-center mb-3">Login to CareCanada</h3>

            {/* Display Error Message */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>

              {/* Remember Me */}
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              {/* Login Button */}
              <Button type="submit" variant="primary" className="w-100">Login</Button>

              {/* Additional Links */}
              <p className="text-center mt-3">
                <a href="#">Forgot Password?</a> | <a href="/signup">Sign Up</a>
              </p>
            </Form>
          </div>

          {/* Logout Button (for testing) */}
          <div className="text-center mt-3">
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
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
