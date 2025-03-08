import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faCalendarAlt, faMapMarkerAlt, faLock, faVenusMars, faMapPin, faUserShield } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+1 ",
    dob: "",
    gender: "",
    address: "",
    postalCode: "",
    emergencyContact: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: {
      appointment: true,
      promotions: true,
      news: false,
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("Settings Updated Successfully!");
  };

  return (
    <div className="settings-container">
      <div className="content">
        <div className="container">
          <h1 className="mb-4 text-center">⚙️ Account Settings</h1>

          {/* Personal Info */}
          <Card className="settings-card shadow">
            <Card.Body>
              <h4 className="mb-3 text-primary">👤 Personal Information</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faUser} /> Full Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., John Doe" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email Address</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., john.doe@example.com" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faPhone} /> Phone Number</Form.Label>
                  <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth</Form.Label>
                  <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faVenusMars} /> Gender</Form.Label>
                  <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt} /> Address</Form.Label>
                  <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, Some City, ABC 12345" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faMapPin} /> Postal Code</Form.Label>
                  <Form.Control type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="ABC 12345" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faUserShield} /> Emergency Contact</Form.Label>
                  <Form.Control type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="e.g., (987) 654-3210" required />
                </Form.Group>
                <Button type="submit" className="btn-custom">Update Information</Button>
              </Form>
            </Card.Body>
          </Card>

          <br />

          {/* Change Password */}
          <Card className="settings-card shadow">
            <Card.Body>
              <h4 className="mb-3 text-primary">🔒 Change Password</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faLock} /> Current Password</Form.Label>
                  <Form.Control type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faLock} /> New Password</Form.Label>
                  <Form.Control type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FontAwesomeIcon icon={faLock} /> Confirm New Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" className="btn-custom">Change Password</Button>
              </Form>
            </Card.Body>
          </Card>

          <br />

          {/* Notification Preferences */}
          <Card className="settings-card shadow">
            <Card.Body>
              <h4 className="mb-3 text-primary">🔔 Notification Preferences</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Check type="checkbox" id="appointment-notifications" name="appointment" label="Appointment Reminders" checked={formData.notifications.appointment} onChange={handleChange} />
                <Form.Check type="checkbox" id="promotions-notifications" name="promotions" label="Promotions & Offers" checked={formData.notifications.promotions} onChange={handleChange} />
                <Form.Check type="checkbox" id="news-notifications" name="news" label="Healthcare News" checked={formData.notifications.news} onChange={handleChange} />
                <Button type="submit" className="btn-custom">Save Preferences</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
