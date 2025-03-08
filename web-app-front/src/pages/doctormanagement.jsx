import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye, faPlus, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  const [newDoctor, setNewDoctor] = useState({
    hospital_id: "",
    name: "",
    speciality: "",
    gender: "",
    experience: "",
    status: "Active",
    identification: "",
    phone: "",
    email: "",
    wait_time: "",
  });

  // Fetch Hospital List
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hospitals/important");
        setHospitals(response.data.hospitals);
      } catch (error) {
        console.error("❌ Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  // Fetch Doctors List
  // Fetch Doctors List
useEffect(() => {
  const fetchDoctors = async () => {
      try {
          console.log("🔍 Fetching doctors...");
          const response = await axios.get("http://localhost:5000/api/doctors");

          if (response.data.success) {
              console.log("✅ Doctors received:", response.data.doctors);
              setDoctors(response.data.doctors);
          } else {
              console.warn("⚠ No doctors found.");
          }
      } catch (error) {
          console.error("❌ Error fetching doctors:", error.response ? error.response.data : error.message);
      }
  };
  fetchDoctors();
}, []);


  // Handle Input Change
  const handleChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };


  function calculateWaitTime(wait_time, patient_count) {
    
    return wait_time * patient_count;
}

const handleEditChange = (e) => {
  setCurrentDoctor({ ...currentDoctor, [e.target.name]: e.target.value });
};// Handle Form Submit

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/doctors", newDoctor);
      alert("✅ Doctor added successfully!");
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.error("❌ Error adding doctor:", error);
      alert("❌ Failed to add doctor.");
    }
  };

  // ✅ Handle Edit Doctor Details (Update)
  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${currentDoctor.doctor_id}`, currentDoctor);
      alert("✅ Doctor updated successfully!");
      setEditShow(false);
      window.location.reload();
    } catch (error) {
      console.error("❌ Error updating doctor:", error);
      alert("❌ Failed to update doctor.");
    }
  };

  // Open Edit Modal
  const openEditModal = (doctor) => {
    setCurrentDoctor(doctor);
    setEditShow(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 main-content">
          <h2 className="page-title text-center my-4">Doctor Management</h2>

          {/* Doctor List Card */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Doctor List</h5>
              <button className="btn btn-danger" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faPlus} /> Add New Doctor
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Speciality</th>
                      <th>Hospital</th>
                      <th>Current Wait Time </th>
                      <th>Gender</th>
                      <th>Experience</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Wait Time</th>
                      

                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>

                    {doctors.map((doctor, index) => (
                      <tr key={index}>
                     
                        <td>{doctor.name}</td>
                        <td>{doctor.speciality}</td>
                        <td>{doctor.hospital_name}</td>
                        <td>{calculateWaitTime(doctor.wait_time,doctor.patient_count)}</td>
                        <td>{doctor.gender}</td>
                        <td>{doctor.experience} years</td>
                        <td>{doctor.identification}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.wait_time} min</td>
                        
                        <td>
                          <span className={`status-badge status-${doctor.status.toLowerCase()}`}>
                            {doctor.status}
                          </span>
                        </td>
                        <td className="action-btns">
                          <button className="btn btn-sm btn-primary me-2 mb-1">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="btn btn-sm btn-danger me-2 mb-1">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <button className="btn btn-sm btn-info me-2 mb-1">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>

          {/* EDIT DOCTOR MODAL */}
<Modal show={editShow} onHide={() => setEditShow(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Edit Doctor Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      {/* Doctor Name */}
      <Form.Group className="mb-2">
        <Form.Label>Doctor Name</Form.Label>
        <Form.Control 
          type="text" 
          name="name" 
          value={currentDoctor?.name || ""} 
          onChange={handleEditChange} 
          required 
        />
      </Form.Group>

      {/* Speciality */}
      <Form.Group className="mb-2">
        <Form.Label>Speciality</Form.Label>
        <Form.Control 
          type="text" 
          name="speciality" 
          value={currentDoctor?.speciality || ""} 
          onChange={handleEditChange} 
          required 
        />
      </Form.Group>

      {/* Gender */}
      <Form.Group className="mb-2">
        <Form.Label>Gender</Form.Label>
        <Form.Select 
          name="gender" 
          value={currentDoctor?.gender || ""} 
          onChange={handleEditChange} 
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>

      {/* Experience */}
      <Form.Group className="mb-2">
        <Form.Label>Experience (Years)</Form.Label>
        <Form.Control 
          type="number" 
          name="experience" 
          value={currentDoctor?.experience || ""} 
          onChange={handleEditChange} 
          required 
        />
      </Form.Group>

      {/* Status Toggle */}
      <Form.Group className="mb-2">
        <Form.Label>Status</Form.Label>
        <Form.Select 
          name="status" 
          value={currentDoctor?.status || "Active"} 
          onChange={handleEditChange} 
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
      </Form.Group>

      {/* Identification */}
      <Form.Group className="mb-2">
        <Form.Label>Identification</Form.Label>
        <Form.Control 
          type="text" 
          name="identification" 
          value={currentDoctor?.identification || ""} 
          onChange={handleEditChange} 
          required 
        />
      </Form.Group>

      {/* Phone */}
      <Form.Group className="mb-2">
        <Form.Label>Phone</Form.Label>
        <Form.Control 
          type="text" 
          name="phone" 
          value={currentDoctor?.phone || ""} 
          onChange={handleEditChange} 
          required 
        />
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          name="email" 
          value={currentDoctor?.email || ""} 
          onChange={handleEditChange} 
          required 
        />
      </Form.Group>

      {/* Wait Time */}
      <Form.Group className="mb-2">
        <Form.Label>Wait Time (mins)</Form.Label>
        <Form.Control 
          type="number" 
          name="wait_time" 
          value={currentDoctor?.wait_time || ""} 
          onChange={handleEditChange} 
          required 
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setEditShow(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
  </Modal.Footer>
</Modal>
{/* ADD DOCTOR MODAL */}
<Modal show={show} onHide={() => setShow(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Add Doctor</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-2">
        <Form.Label>Doctor Name</Form.Label>
        <Form.Control type="text" name="name" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Speciality</Form.Label>
        <Form.Control type="text" name="speciality" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Hospital</Form.Label>
        <Form.Select name="hospital_id" onChange={handleChange} required>
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.hospital_id} value={hospital.hospital_id}>{hospital.name}</option>
          ))}
        </Form.Select>
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
        <Form.Label>Experience (years)</Form.Label>
        <Form.Control type="number" name="experience" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Status</Form.Label>
        <Form.Select name="status" onChange={handleChange} required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Identification</Form.Label>
        <Form.Control type="text" name="identification" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="phone" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Wait Time (minutes)</Form.Label>
        <Form.Control type="number" name="wait_time" onChange={handleChange} required />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleSubmit}>Add Doctor</Button>
  </Modal.Footer>
</Modal>


        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;