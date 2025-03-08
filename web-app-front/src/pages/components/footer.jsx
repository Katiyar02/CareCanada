// web-app-front/src/pages/components/footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <div className="container">
        <div className="row">
          {/* Column 1: Logo & Slogan */}
          <div className="col-md-3 text-center text-md-start mb-3">
            <h4 className="fw-bold">CareCanada</h4>
            <p>Your health, our priority.</p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Home</a></li>
              <li><a href="#" className="text-dark text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Services</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="col-md-3 mb-3">
            <h5>Follow Us</h5>
            <a href="#" className="text-dark me-3"><i className="fab fa-facebook fa-lg"></i></a>
            <a href="#" className="text-dark me-3"><i className="fab fa-twitter fa-lg"></i></a>
            <a href="#" className="text-dark me-3"><i className="fab fa-instagram fa-lg"></i></a>
            <a href="#" className="text-dark"><i className="fab fa-linkedin fa-lg"></i></a>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-md-3 mb-3">
            <h5>Contact Us</h5>
            <p><i className="fas fa-map-marker-alt"></i> Toronto, ON, Canada</p>
            <p><i className="fas fa-envelope"></i> support@carecanada.com</p>
            <p><i className="fas fa-phone"></i> +1 234 567 890</p>
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="mb-0">&copy; 2025 CareCanada. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
