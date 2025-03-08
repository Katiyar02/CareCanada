import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";


const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    { id: "DOC-001", name: "Dr. John Smith", specialty: "Cardiologist", department: "Cardiology", contact: "+1 234 567 890", email: "john.smith@example.com", status: "Active" },
    { id: "DOC-002", name: "Dr. Sarah Johnson", specialty: "Neurologist", department: "Neurology", contact: "+1 987 654 321", email: "sarah.johnson@example.com", status: "Active" },
    { id: "DOC-003", name: "Dr. Robert Chen", specialty: "Pediatrician", department: "Pediatrics", contact: "+1 567 890 123", email: "robert.chen@example.com", status: "On Leave" },
    { id: "DOC-004", name: "Dr. Emily Davis", specialty: "Dermatologist", department: "Dermatology", contact: "+1 321 654 987", email: "emily.davis@example.com", status: "Active" },
    { id: "DOC-005", name: "Dr. Michael Brown", specialty: "Orthopedic Surgeon", department: "Orthopedics", contact: "+1 890 123 456", email: "michael.brown@example.com", status: "Inactive" },
  ]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 main-content">
          <h2 className="page-title">Doctor Management</h2>

          {/* Doctor List Card */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Doctor List</h5>
              <button className="btn btn-primary">
                <i className="fas fa-plus me-1"></i> Add New Doctor
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-header">
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Specialty</th>
                      <th>Department</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>
                          <img src="https://via.placeholder.com/40" alt={doctor.name} className="doctor-img" />
                        </td>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialty}</td>
                        <td>{doctor.department}</td>
                        <td>{doctor.contact}</td>
                        <td>{doctor.email}</td>
                        <td>
                          <span className={`status-badge status-${doctor.status.toLowerCase().replace(" ", "-")}`}>
                            {doctor.status}
                          </span>
                        </td>
                        <td className="action-btns">
                            <button className="btn btn-sm btn-primary">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-sm btn-danger">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button className="btn btn-sm btn-info">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                            </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-light">Previous</button>
              <div>
                <button className="btn btn-primary active">1</button>
                <button className="btn btn-light">2</button>
                <button className="btn btn-light">3</button>
              </div>
              <button className="btn btn-light">Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;
