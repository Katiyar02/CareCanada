// web-app-front/src/pages/home.jsx

import React, { useState, useEffect } from "react";
import axios from 'axios';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "react-bootstrap";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [waitTime, setWaitTime] = useState(10);
  const [radius, setRadius] = useState(10);
  const [selectedSpecialty, setSelectedSpecialty] = useState(""); 

  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState('');
  // Handle input change
  const handleInputChange = (e) => {
    setLocation(e.target.value);
};




const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
        setError('Please enter a location.');
        return;
    }

    try {
        // Step 1: Get latitude and longitude using Google Geocoding API
        const apiKey = 'YOUR_GOOGLE_API_KEY';
        const geocodeResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyA6ZNmqlQ4BLOK3nDlpbQGNAU4TlmqEXuY`
        );


        if (geocodeResponse.data.status === 'OK') {
            const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
            setLatitude(lat);
            setLongitude(lng);
            setError('');

            // Step 2: Send latitude and longitude to backend to fetch hospitals within 100 km
            const hospitalsResponse = await axios.get('http://localhost:5000/api/hospitalsWithin', {
              params: {
                  latitude: 43.1394191,
                  longitude: -80.263623,
                  selectedSpeciality: selectedSpecialty,
                  radius: radius
              }
          })
            setHospitals(hospitalsResponse.data);
        } else {
            setError('Unable to find the location. Please try again.');
        }
    } catch (error) {
        setError('An error occurred while fetching the location or hospitals.');
        console.error('Error:', error);
    }
}; 

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find a Doctor Near You</h1>
          <p className="lead">Check wait times and book appointments instantly.</p>

          {/* Search Form */}

          <form className="row g-2 justify-content-center" onSubmit={handleSubmit}>
            {/* Location Input */}
            <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter location (e.g., Toronto, ON)"
                        value={location}
                        onChange={handleInputChange}
                    />
                </div>

            {/* Specialty Dropdown */}
             <div className="col-md-3">

              <select 
                className="form-select" 
                value={selectedSpecialty} 
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">Select Specialty</option>
                <option value="General Physician">General Physician</option>
                <option value="Family Medicine">Family Medicine</option>
                <option value="Internal Medicine">Internal Medicine</option>

                <option value="Cardiology">Cardiology</option>

                <option value="Dermatologist">Dermatologist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Endocrinologist">Endocrinologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="General Surgeon">General Surgeon</option>

                <option value="Neurology">Neurology</option>
    <option value="Plastic Surgeon">Plastic Surgeon</option>
                <option value="Ophthalmologist">Ophthalmologist</option>
                <option value="ENT Specialist">ENT Specialist</option>
                <option value="Obstetrician">Obstetrician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Psychologist">Psychologist</option>
                <option value="Urologist">Urologist</option>
                <option value="Rheumatologist">Rheumatologist</option>
                <option value="Allergist">Allergist</option>
                <option value="Oncologist">Oncologist</option>
              </select>

            </div> 


            {/* Search Button */}
            <div className="col-md-2">
              <button type="submit" className="btn btn-danger w-100">Search</button>
            </div>
                    {/* Distance Slider in a Separate Div */}
          <div className="col-md-6">
  {/* Label in a separate div */}
  <div>
    <label className="form-label">Distance: {radius} KM</label>
  </div>

  {/* Range slider in a separate div */}
  <div>
    <input 
      type="range" 
      className="form-range" 
      min="1" 
      max="50" 
      value={radius} 
      onChange={(e) => setRadius(e.target.value)} 
    />

  </div> 
</div>
          </form>

          {/* {latitude && longitude && (
                <div className="mt-3">
                    <p>Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
                </div>
            )} */}

        </div>
      </div>

      {hospitals.length > 0 && (
      <div className="container my-5">

        <h2 className="text-center text-danger mb-4">Available Doctors</h2>
        <div className="row justify-content-center">
     
          <div className="mt-4">
              <ul className="doctor-list list-unstyled">
                  {hospitals.map((doctor) => (
                      <li className="doctor-card " key={doctor.id}>
                          <div className="doctor-card-header">
                              <h3>{doctor.Doctor_name}</h3>
                          </div>
                          <div className="doctor-card-body">
                              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Dsitance: {doctor.distance} km</p>
                              <p><FontAwesomeIcon icon={faClock} /> Wait time:  {doctor.Wait_time}</p>
                              <p><strong>Address:</strong>   {doctor.hospital_name}</p>
                          </div>
                          <a href="/login" className="btn btn-danger mt-2"> Book Appointment</a>
                      </li>
                  ))}
              </ul>
          </div>
   
        </div>
      </div>
    )}

      {/* Features Section */}
      <section className="featerwrapper my-5">
      <div className="container-fluid my-5 text-center">
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
      </section>
    


      <section className="articles-section my-5">
        <h2 className="text-center text-danger mb-4">Health Articles & Resources</h2>
        <div className="articles-container">
            
            <div className="article-card">
                <img src="../src/assets/Images/healthy-lifestyle.jpg"  alt="Healthy Lifestyle"/>
                <div className="article-content">

                    <h3>10 Tips for a Healthier Lifestyle</h3>
                    <p>Simple ways to improve your daily routine and stay fit.</p>
                </div>
            </div>

            <div className="article-card">
                <img src="../src/assets/Images/preventive-care.jpg" alt="Preventive Care"/>
                <div className="article-content">

                    <h3>Understanding Preventive Care</h3>
                    <p>Learn how regular checkups can prevent serious illnesses.</p>
                </div>
            </div>

            <div className="article-card">
                <img src="../src/assets/Images/stress.jpg" alt="Stress Management"/>
                <div className="article-content">

                    <h3>Managing Stress for Better Health</h3>
                    <p>Effective stress-relief techniques for a balanced life.</p>
                </div>
            </div>


            <div className="article-card">
                <img src="../src/assets/Images/medical.png" alt="Medical Conditions"/>
                <div className="article-content">

                    <h3>Common Medical Conditions Explained</h3>
                    <p>FAQs about common health issues and treatments.</p>
                </div>
            </div>

        </div>
    </section>


     <div className="faq-wrapper">

      <h3 className="text-center mb-4">Frequently Asked Questions</h3>
      <div className="faq-content">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <FontAwesomeIcon icon={faQuestionCircle} className="icon me-2" />
              How do I book an appointment?
            </Accordion.Header>
            <Accordion.Body>
              You can book an appointment by searching for a doctor and selecting an available time slot.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <FontAwesomeIcon icon={faQuestionCircle} className="icon me-2" />
              How do I check doctor wait times?
            </Accordion.Header>
            <Accordion.Body>
              Wait times are displayed on the doctor's profile page and updated in real time.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <FontAwesomeIcon icon={faQuestionCircle} className="icon me-2" />
              Can I cancel or reschedule my appointment?
            </Accordion.Header>
            <Accordion.Body>
              Yes, you can cancel or reschedule your appointment through your dashboard.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <FontAwesomeIcon icon={faQuestionCircle} className="icon me-2" />
              Is my personal data secure?
            </Accordion.Header>
            <Accordion.Body>
              Yes, we use advanced encryption and secure servers to protect your personal and medical data.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <FontAwesomeIcon icon={faQuestionCircle} className="icon me-2" />
              Do you support virtual consultations?
            </Accordion.Header>
            <Accordion.Body>
              Yes, we offer telehealth appointments with certified doctors. You can choose "Virtual Consultation" when booking.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <FontAwesomeIcon icon={faQuestionCircle} className="icon me-2" />
              What payment methods are accepted?
            </Accordion.Header>
            <Accordion.Body>

             You will pay at the hospital directly.

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

    </div> 
    </div>


    
  );
};

export default Home;
