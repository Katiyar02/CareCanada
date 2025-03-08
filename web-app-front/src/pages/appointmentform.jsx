import React, { useState } from 'react';

const AppointmentPage = () => {
  // State to manage form fields
  const [patientName, setPatientName] = useState('');
  const [healthCard, setHealthCard] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [status, setStatus] = useState('Pending');  // Status: Pending, Confirmed, etc.

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create appointment object
    const appointmentDetails = {
      patientName,
      healthCard,
      appointmentDate,
      doctorName,
      hospitalName,
      waitTime,
      status,
    };

    // Handle the form submission (For example, sending the data to an API)
    console.log('Appointment Details:', appointmentDetails);

    // Reset form (optional)
    setPatientName('');
    setHealthCard('');
    setAppointmentDate('');
    setDoctorName('');
    setHospitalName('');
    setWaitTime('');
    setStatus('Pending');
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-danger mb-4">Book an Appointment</h2>

      {/* Appointment Form */}
      <form onSubmit={handleSubmit}>
        {/* Patient Name */}
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">Patient Name</label>
          <input
            type="text"
            className="form-control"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        {/* Ontario Health Card */}
        <div className="mb-3">
          <label htmlFor="healthCard" className="form-label">Ontario Health Card Number</label>
          <input
            type="text"
            className="form-control"
            id="healthCard"
            value={healthCard}
            onChange={(e) => setHealthCard(e.target.value)}
            required
          />
        </div>

        {/* Appointment Date */}
        <div className="mb-3">
          <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        {/* Doctor Name */}
        <div className="mb-3">
          <label htmlFor="doctorName" className="form-label">Doctor Name</label>
          <input
            type="text"
            className="form-control"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>

        {/* Hospital Name */}
        <div className="mb-3">
          <label htmlFor="hospitalName" className="form-label">Hospital Name</label>
          <input
            type="text"
            className="form-control"
            id="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
          />
        </div>

        {/* Wait Time */}
        <div className="mb-3">
          <label htmlFor="waitTime" className="form-label">Wait Time (in minutes)</label>
          <input
            type="number"
            className="form-control"
            id="waitTime"
            value={waitTime}
            onChange={(e) => setWaitTime(e.target.value)}
            required
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Appointment Status</label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-danger w-50">Book Appointment</button>
        </div>
      </form>

      {/* Confirmation or Error Messages */}
      <div className="mt-4">
        {/* You can add logic to show confirmation or error messages */}
      </div>
    </div>
  );
};

export default AppointmentPage;
