import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faUserInjured, faUsers, faClock, faFilter, faPlus, faEdit, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";


const Dashboard = () => {
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
              <button className="btn btn-danger">
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
                <button className="btn btn-danger">
                  <FontAwesomeIcon icon={faPlus} /> Add New Hospital
                </button>
              </div>
              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Wait Time</th>
                      <th>Patients</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Toronto General Hospital", location: "Toronto, ON", status: "Active", wait: "35 min", patients: 42, color: "green" },
                      { name: "Montreal General Hospital", location: "Montreal, QC", status: "Active", wait: "65 min", patients: 78, color: "red" },
                      { name: "Vancouver General Hospital", location: "Vancouver, BC", status: "Active", wait: "15 min", patients: 23, color: "green" },
                      { name: "Calgary Foothills Hospital", location: "Calgary, AB", status: "Active", wait: "40 min", patients: 37, color: "yellow" },
                      { name: "Ottawa Civic Hospital", location: "Ottawa, ON", status: "Maintenance", wait: "45 min", patients: 31, color: "yellow" }
                    ].map((hospital, index) => (
                      <tr key={index}>
                        <td>{hospital.name}</td>
                        <td>{hospital.location}</td>
                        <td><span className={`status-badge status-${hospital.status.toLowerCase()}`}>{hospital.status}</span></td>
                        <td><span className={`wait-time wait-${hospital.color}`}>{hospital.wait}</span></td>
                        <td>{hospital.patients}</td>
                        <td>
                          <button className="btn btn-primary btn-sm me-1"><FontAwesomeIcon icon={faEdit} /></button>
                          <button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
    </div>
  );
};

export default Dashboard;
