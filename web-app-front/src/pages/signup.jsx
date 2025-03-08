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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Create an Account</h3>
          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                <Form.Control type="text" name="fullName" placeholder="e.g., John Doe" required onChange={handleChange} />
              </InputGroup>
            </Form.Group>

            {/* Date of Birth */}
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faBirthdayCake} /></InputGroup.Text>
                <Form.Control type="date" name="dob" required onChange={handleChange} />
              </InputGroup>
            </Form.Group>

            {/* Gender */}
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" required onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            {/* Phone Number */}
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faPhone} /></InputGroup.Text>
                <Form.Control type="tel" name="phone" placeholder="e.g., +1 234 567 8901" required onChange={handleChange} />
              </InputGroup>
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                <Form.Control type="email" name="email" placeholder="e.g., johndoe@example.com" required onChange={handleChange} />
              </InputGroup>
            </Form.Group>

            {/* Address */}
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faMapMarkerAlt} /></InputGroup.Text>
                <Form.Control type="text" name="address" placeholder="e.g., 123 Main St, New York, NY" required onChange={handleChange} />
              </InputGroup>
            </Form.Group>

            {/* Emergency Contact Name */}
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact Name</Form.Label>
              <Form.Control type="text" name="emergencyName" placeholder="e.g., Jane Doe" required onChange={handleChange} />
            </Form.Group>

            {/* Emergency Contact Number */}
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control type="tel" name="emergencyContact" placeholder="e.g., +1 987 654 3210" required onChange={handleChange} />
            </Form.Group>

            {/* Emergency Relationship */}
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact Relationship</Form.Label>
              <Form.Control type="text" name="emergencyRelation" placeholder="e.g., Spouse, Parent, Friend" required onChange={handleChange} />
            </Form.Group>

            {/* Postal Code */}
            <Form.Group className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control type="text" name="postalCode" placeholder="e.g., 10001" required onChange={handleChange} />
            </Form.Group>

            {/* Role Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="is_admin" onChange={handleChange}>
                <option value="0">Patient</option>
                <option value="1">Admin</option>
              </Form.Select>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                <Form.Control type="password" name="password" placeholder="Choose a secure password" required onChange={handleChange} />
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" placeholder="Re-enter your password" required onChange={handleChange} />
            </Form.Group>

            {/* Agree to Terms */}
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" name="agreed" required onChange={handleChange} label="I agree to the terms & conditions" />
            </Form.Group>

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="w-100">Sign Up</Button>

            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
