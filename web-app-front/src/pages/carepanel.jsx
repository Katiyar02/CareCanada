// src/pages/carepanel.jsx
// Care Panel Page - Admin Dashboard

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/footer";

const CarePanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Content (No Sidebar) */}
        <div className="col-md-12 main-content">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Dashboard Overview</h2>
          </div>

          {/* Active Tab Content */}
          {activeTab === "dashboard" && <p>Welcome to the Admin Dashboard</p>}
          {activeTab === "hospitals" && <p>Manage Hospitals</p>}
          {activeTab === "patients" && <p>Manage Patients</p>}
          {activeTab === "wait-times" && <p>Monitor Wait Times</p>}
          {activeTab === "departments" && <p>Department Overview</p>}

          {/* Stats Cards */}
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="card stat-card primary">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Total Hospitals</h6>
                    <h3 className="mb-0">247</h3>
                  </div>
                  <div className="stat-icon text-primary">
                    <i className="fas fa-hospital"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card stat-card secondary">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Registered Patients</h6>
                    <h3 className="mb-0">15,842</h3>
                  </div>
                  <div className="stat-icon text-secondary">
                    <i className="fas fa-user-injured"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card stat-card success">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Active Queue</h6>
                    <h3 className="mb-0">428</h3>
                  </div>
                  <div className="stat-icon text-success">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card stat-card warning">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Avg. Wait Time</h6>
                    <h3 className="mb-0">43 min</h3>
                  </div>
                  <div className="stat-icon text-warning">
                    <i className="fas fa-clock"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CarePanel;
