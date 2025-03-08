// web-app-front/src/pages/appointments.jsx

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Appointments = () => {
  const [waitTimes, setWaitTimes] = useState({});

  const calculateWaitTime = (appointmentDate, appointmentTime, appointmentId) => {
    const appointmentDatetime = new Date(`${appointmentDate} ${appointmentTime}`);
    const currentDatetime = new Date();
    const diff = appointmentDatetime - currentDatetime;

    if (diff <= 0) {
      setWaitTimes((prev) => ({ ...prev, [appointmentId]: "Your appointment has passed" }));
      return;
    }

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    let waitTimeText = hours > 0 ? `${hours} hours ${minutes} minutes remaining` : `${minutes} minutes remaining`;

    setWaitTimes((prev) => ({ ...prev, [appointmentId]: waitTimeText }));
  };

  useEffect(() => {
    calculateWaitTime("2025-03-10", "10:00", 1);
    calculateWaitTime("2025-03-15", "14:00", 2);
  }, []);

  return (
    <div className="d-flex">
      {/* Content */}
      <div className="content">
        <div className="container">
          <h1 className="mb-4">My Appointments</h1>

          {/* Appointments Section */}
          <div className="appointments-card">
            <h4>Upcoming Appointments</h4>

            {/* Appointment 1 */}
            <div className="appointment-item">
              <p><strong>Doctor:</strong> Dr. Smith</p>
              <p><strong>Appointment Date:</strong> March 10, 2025</p>
              <p><strong>Time:</strong> 10:00 AM</p>
              <p><strong>Status:</strong> Pending</p>
              <p><strong>Wait Time:</strong> {waitTimes[1]}</p>
              <button className="btn btn-danger ml-2">Cancel Appointment</button>
            </div>

            {/* Appointment 2 */}
            <div className="appointment-item">
              <p><strong>Doctor:</strong> Dr. Lee</p>
              <p><strong>Appointment Date:</strong> March 15, 2025</p>
              <p><strong>Time:</strong> 2:00 PM</p>
              <p><strong>Status:</strong> Confirmed</p>
              <p><strong>Wait Time:</strong> {waitTimes[2]}</p>
              <button className="btn btn-danger ml-2">Cancel Appointment</button>
            </div>
          </div>

          {/* Modal to Reschedule Appointment */}
          <div className="modal fade" id="rescheduleModal" tabIndex="-1" role="dialog" aria-labelledby="rescheduleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="rescheduleModalLabel">Reschedule Appointment</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="rescheduleDate">New Appointment Date</label>
                      <input type="date" className="form-control" id="rescheduleDate" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="rescheduleTime">New Appointment Time</label>
                      <input type="time" className="form-control" id="rescheduleTime" required />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-custom">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
