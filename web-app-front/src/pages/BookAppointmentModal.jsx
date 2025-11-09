import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const BookAppointmentModal = ({ show, handleClose, doctor, handleSubmit }) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [patientName, setPatientName] = useState("");
  const [notes, setNotes] = useState("");

  if (!doctor) {
    return null; // Return null if doctor is not provided
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      doctorName: doctor.Doctor_name,
      hospitalName: doctor.hospital_name,
      appointmentDate,
      patientName,
      notes,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Doctor Name</Form.Label>
            <Form.Control type="text" value={doctor.Doctor_name} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hospital Name</Form.Label>
            <Form.Control type="text" value={doctor.hospital_name} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Appointment Date</Form.Label>
            <Form.Control
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Book Appointment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookAppointmentModal;