import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faUserInjured, faUsers, faClock, faFilter, faPlus, faEdit, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios"; // To send API requests
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Dashboard = () => {
  // State for Modal
  const [address, setAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    phone: "",
    has_emergency: 0, // Default to No
    type: "",
    email: "",
    website: "",
    latitude: "", // Add latitude
    longitude: "", // Add longitude
  });

  // Open & Close Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHospital((prev) => ({
      ...prev,
    [name]: name === "has_emergency" ? (value === "1" ? 1 : 0) : value, // ✅ Ensures Number (1 or 0)
    }));
  };

  // Handle Address Selection
  const handleAddressSelect = (selected) => {
    if (!selected) return;

    // Update the address in the newHospital state
    setNewHospital((prev) => ({
      ...prev,
      address: selected.label,
    }));
    setAddress(selected);

    // Use the Google Places API to get more details
    const placeId = selected.value.place_id;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let updatedHospital = { ...newHospital, address: selected.label };

        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            updatedHospital.postal_code = component.long_name;
          }
          if (component.types.includes("locality")) {
            updatedHospital.city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            updatedHospital.province = component.long_name;
          }
        });

        // Add latitude and longitude
        if (place.geometry && place.geometry.location) {
          console.log(place.geometry.location.lat(), place.geometry.location.lng())
          updatedHospital.latitude = place.geometry.location.lat();
          updatedHospital.longitude = place.geometry.location.lng();
        }

        setNewHospital(updatedHospital);
      }
    });
  };

  // Handle Form Submit - Send Data to Backend
  const handleSubmit = async () => {
    try {
      // Send hospital data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/hospitals",
        newHospital
      );

      if (response.data.success) {
        alert("✅ Hospital added successfully!");

        // Trigger email with hospital address link
        const googleMapsLink = `https://www.google.com/maps?q=${newHospital.latitude},${newHospital.longitude}`;
        await axios.post("http://localhost:5000/api/send-email", {
          to: "0509gunjan@gmail.com",
          subject: "New Hospital Added",
          text: `A new hospital has been added. Address: ${newHospital.address}. Google Maps Link: ${googleMapsLink}`,
        });

        setShow(false);
        window.location.reload(); // Refresh the page to show the new hospital
      } else {
        alert("❌ Failed to add hospital.");
      }
    } catch (error) {
      console.error("❌ Error adding hospital:", error);
      alert("❌ Failed to add hospital.");
    }
  };
  
  
  
  
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 main-content">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Dashboard Overview</h2>
            <div>
              <button className="btn btn-light me-2">
                <FontAwesomeIcon icon={faFilter} /> Filter
              </button>
              <button className="btn btn-danger" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Add Hospital
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row">
            {[
              { title: "Total Hospitals", value: "247", icon: faHospital, color: "primary" },
              { title: "Registered Patients", value: "15,842", icon: faUserInjured, color: "secondary" },
              { title: "Active Queue", value: "428", icon: faUsers, color: "success" },
              { title: "Avg. Wait Time", value: "43 min", icon: faClock, color: "warning" }
            ].map((stat, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className={`card stat-card ${stat.color}`}>
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-1">{stat.title}</h6>
                      <h3 className="mb-0">{stat.value}</h3>
                    </div>
                    <div className={`stat-icon text-${stat.color}`}>
                      <FontAwesomeIcon icon={stat.icon} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hospital Management */}
          <div className="mt-4">
            <h4>Hospital Management</h4>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div>
                  <button className="btn btn-outline-danger">All Hospitals</button>
                  <button className="btn btn-outline-secondary mx-2">Emergency Services</button>
                  <button className="btn btn-outline-primary">High Volume</button>
                </div>
                <button className="btn btn-danger" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} /> Add New Hospital
                </button>
              </div>
            </div>
          </div>

          {/* Patient Queue Management */}
          <div className="mt-4">
            <h4>Patient Queue Management</h4>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div>
                  <select className="form-select d-inline-block w-auto me-2">
                    <option>All Hospitals</option>
                  </select>
                  <select className="form-select d-inline-block w-auto">
                    <option>All Departments</option>
                  </select>
                </div>
                <div>
                  <button className="btn btn-outline-secondary me-2">Export</button>
                  <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faPlus} /> Add Patient
                  </button>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Token</th>
                      <th>Patient Name</th>
                      <th>Hospital</th>
                      <th>Service</th>
                      <th>Check-in Time</th>
                      <th>Est. Wait</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { token: "A-123", name: "John Smith", hospital: "Toronto General", service: "Emergency", checkIn: "10:32 AM", wait: "15 min", status: "Waiting" },
                      { token: "A-124", name: "Sarah Johnson", hospital: "Toronto General", service: "X-Ray", checkIn: "10:45 AM", wait: "25 min", status: "Waiting" },
                      { token: "A-125", name: "Michael Brown", hospital: "Toronto General", service: "Emergency", checkIn: "10:50 AM", wait: "5 min", status: "In Progress" },
                    ].map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.token}</td>
                        <td>{patient.name}</td>
                        <td>{patient.hospital}</td>
                        <td>{patient.service}</td>
                        <td>{patient.checkIn}</td>
                        <td>{patient.wait}</td>
                        <td><span className={`status-badge status-${patient.status.toLowerCase().replace(" ", "-")}`}>{patient.status}</span></td>
                        <td>
                          <button className="btn btn-primary btn-sm me-1"><FontAwesomeIcon icon={faEdit} /></button>
                          <button className="btn btn-success btn-sm me-1"><FontAwesomeIcon icon={faCheck} /></button>
                          <button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTimes} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ADD HOSPITAL MODAL */}
      {/* Modal for Adding a New Hospital */}
<Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Hospital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="e.g. Toronto General Hospital"
                value={newHospital.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyA6ZNmqlQ4BLOK3nDlpbQGNAU4TlmqEXuY"
                selectProps={{
                  value: address,
                  onChange: handleAddressSelect,
                  placeholder: "Enter your address...",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={newHospital.city}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Province</Form.Label>
              <Form.Control
                type="text"
                name="province"
                value={newHospital.province}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postal_code"
                value={newHospital.postal_code}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            {/* Hidden fields for latitude and longitude */}
            <Form.Control
              type="hidden"
              name="latitude"
              value={newHospital.latitude}
            />
            <Form.Control
              type="hidden"
              name="longitude"
              value={newHospital.longitude}
            />
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="e.g. +1 416-123-4567"
                value={newHospital.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Has Emergency?</Form.Label>
              <Form.Select
                name="has_emergency"
                value={newHospital.has_emergency}
                onChange={handleChange}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                placeholder="e.g. General, Specialized"
                value={newHospital.type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="e.g. hospital@example.com"
                value={newHospital.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                placeholder="e.g. www.hospital.com"
                value={newHospital.website}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Add Hospital
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;