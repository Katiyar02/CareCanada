import React, { useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";

const Profile = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    dob: "1980-01-01",
    gender: "male",
    address: "123 Main St, Some City, ABC 12345",
    emergencyContact: "(987) 654-3210",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Profile:", formData);
    alert("Profile Updated Successfully!");
    handleClose();
  };

  return (
    <div>
          <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to your Profile</h1>
          <p className="lead">
            Check wait times and book appointments instantly.
          </p>
        </div>
      </div>
       <div className="profile-container d-flex justify-content-center">
      <div className="content">

        {/* Profile Card */}
        <Card className="profile-card">
          <Card.Header className="text-center bg-danger text-white">
            <h4>Profile Information</h4>
          </Card.Header>
          <Card.Body>
            <div className="profile-info">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Date of Birth:</strong> {formData.dob}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Emergency Contact:</strong> {formData.emergencyContact}</p>
            </div>
            <div className="text-center">
              <Button className="btn-custom" onClick={handleShow}>Edit Profile</Button>
            </div>
          </Card.Body>
        </Card>

        {/* Edit Profile Modal */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Emergency Contact</Form.Label>
                <Form.Control type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button className="btn-custom" onClick={handleSave}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    </div>
   
  );
};

export default Profile;
