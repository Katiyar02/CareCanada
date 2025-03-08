// web-app-front/src/pages/home.jsx

import React, { useState, useEffect } from "react";

const Home = () => {
  const [waitTime, setWaitTime] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTime(Math.floor(Math.random() * 15) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find a Doctor Near You</h1>
          <p className="lead">Check wait times and book appointments instantly.</p>
          <form className="row g-2 justify-content-center">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Enter location (e.g., Toronto, ON)" />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Enter specialty (e.g., Cardiologist)" />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-danger w-100">Search</button>
            </div>
          </form>
          <p className="mt-3 wait-time">Current Wait Time: <span>{waitTime}</span> patients ahead</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5 text-center">
        <div className="row">
          <div className="col-md-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" width="80" alt="Doctors" />
            <h5 className="mt-3">Find Top Doctors</h5>
            <p>Search by specialty, location, and availability.</p>
          </div>
          <div className="col-md-4">
            <img src="https://cdn-icons-png.flaticon.com/512/484/484167.png" width="80" alt="Wait Time" />
            <h5 className="mt-3">Live Wait Times</h5>
            <p>See how many patients are ahead of you in real-time.</p>
          </div>
          <div className="col-md-4">
            <img src="https://cdn-icons-png.flaticon.com/512/726/726623.png" width="80" alt="Booking" />
            <h5 className="mt-3">Easy Booking</h5>
            <p>Book appointments online without long phone calls.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
