import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faUserInjured, faUsers, faClock, faFilter, faPlus, faEdit, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios"; // To send API requests

const Dashboard = () => {
  // State for Modal
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
  
  
  
  



  // Handle Form Submit - Send Data to Backend
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/hospitals", newHospital);
    
      alert("✅ Hospital added successfully!");
      setShow(false);
      window.location.reload(); // Refresh the page to show the new hospital
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
        <Form.Control type="text" name="name" placeholder="e.g. Toronto General Hospital" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="address" placeholder="Enter address" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" name="city" placeholder="e.g. Toronto" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Province</Form.Label>
        <Form.Control type="text" name="province" placeholder="e.g. Ontario" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control type="text" name="postal_code" placeholder="e.g. M5G 2C4" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="phone" placeholder="e.g. +1 416-123-4567" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
  <Form.Label>Has Emergency?</Form.Label>
  <Form.Select name="has_emergency" value={newHospital.has_emergency} onChange={handleChange}>
    <option value="1">Yes</option>  {/* ✅ Sends 1 */}
    <option value="0">No</option>   {/* ✅ Sends 0 */}
  </Form.Select>
</Form.Group>





      <Form.Group className="mb-2">
        <Form.Label>Type</Form.Label>
        <Form.Control type="text" name="type" placeholder="e.g. General, Specialized" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" placeholder="e.g. hospital@example.com" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Website</Form.Label>
        <Form.Control type="text" name="website" placeholder="e.g. www.hospital.com" onChange={handleChange} />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleSubmit}>Add Hospital</Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default Dashboard;
