import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]); // ✅ Fetch hospital list
  const [show, setShow] = useState(false);
  
  const [newDoctor, setNewDoctor] = useState({
    hospital_id: "",
    name: "",
    speciality: "",
    gender: "",
    experience: "",
    status: "Active", // Default status
    identification: "", // ✅ Added Identification field
    phone: "",
    email: "",
    wait_time: "",
  });

  // ✅ Fetch Hospital List from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hospitals");
        setHospitals(response.data.hospitals);
      } catch (error) {
        console.error("❌ Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  // ✅ Fetch Doctors List (Dummy Data for Now)
  useEffect(() => {
    setDoctors([
      { id: "DOC-001", name: "Dr. John Smith", speciality: "Cardiologist", hospital: "Toronto General", phone: "+1 234 567 890", email: "john.smith@example.com", status: "Active" },
      { id: "DOC-002", name: "Dr. Sarah Johnson", speciality: "Neurologist", hospital: "Montreal General", phone: "+1 987 654 321", email: "sarah.johnson@example.com", status: "Active" }
    ]);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submit (POST New Doctor)
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/doctors", newDoctor);
      alert("✅ Doctor added successfully!");
      setShow(false);
      window.location.reload(); // Refresh page
    } catch (error) {
      console.error("❌ Error adding doctor:", error);
      alert("❌ Failed to add doctor.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 main-content">
          <h2 className="page-title">Doctor Management</h2>

          {/* Doctor List Card */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Doctor List</h5>
              <button className="btn btn-primary" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faPlus} /> Add New Doctor
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Speciality</th>
                      <th>Hospital</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor, index) => (
                      <tr key={index}>
                        <td><img src="https://via.placeholder.com/40" alt={doctor.name} className="doctor-img" /></td>
                        <td>{doctor.name}</td>
                        <td>{doctor.speciality}</td>
                        <td>{doctor.hospital}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.email}</td>
                        <td><span className={`status-badge status-${doctor.status.toLowerCase()}`}>{doctor.status}</span></td>
                        <td className="action-btns">
                          <button className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faEdit} /></button>
                          <button className="btn btn-sm btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                          <button className="btn btn-sm btn-info"><FontAwesomeIcon icon={faEye} /></button>
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

      {/* ADD DOCTOR MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Hospital</Form.Label>
              <Form.Select name="hospital_id" onChange={handleChange} required>
                <option value="">Select Hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.hospital_id} value={hospital.hospital_id}>
                    {hospital.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter doctor's name" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Speciality</Form.Label>
              <Form.Control type="text" name="speciality" placeholder="E.g. Cardiologist, Neurologist" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Experience (Years)</Form.Label>
              <Form.Control type="number" name="experience" placeholder="Enter years of experience" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Identification</Form.Label>
              <Form.Control type="text" name="identification" placeholder="Enter identification details" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" placeholder="Enter phone number" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Wait Time (mins)</Form.Label>
              <Form.Control type="number" name="wait_time" placeholder="Estimated wait time" onChange={handleChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Add Doctor</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorManagement;
