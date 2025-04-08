import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer text-center text-lg-start text-white">
        <section className="social-media d-flex justify-content-between p-4">
          <div className="social-left">
            <span>Get connected with us on social networks:</span>
          </div>
          <div className="social-right">
            <a href="https://facebook.com" className="social-icon text-white" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="social-icon text-white" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://github.com" className="social-icon text-white" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" className="social-icon text-white" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </section>

        {/* Section: Links */}
        <section className="links-section">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              {/* Project Info */}
              <div className="col-md-4 col-lg-4 col-xl-4 mb-4">
                <h6 className="footer-title">Project Info</h6>
                <hr className="footer-divider" />
                <p><strong>Project Name:</strong> NNR PVT LTD</p>
                <p><strong>Created By:</strong> Narayana Reddy Naru</p>
                <p><strong>Email:</strong> <a href="mailto:narayana@nnr.com" className="footer-link">narayana@nnr.com</a></p>
                <p>
                  <strong>GitHub:</strong>{" "}
                  <a href="https://github.com/narayana2607?tab=repositories" target="_blank" rel="noopener noreferrer" className="footer-link">
                    NARAYANA2607
                  </a>
                </p>
              </div>

              {/* Useful Links */}
              <div className="col-md-3 col-lg-2 col-xl-2 mb-4">
                <h6 className="footer-title">Useful Links</h6>
                <hr className="footer-divider" />
                <p><a href="/home" className="footer-link">Home</a></p>
                <p><a href="/about" className="footer-link">About Us</a></p>
                <p><a href="/gallery" className="footer-link">Gallery</a></p>
                <p><a href="/contact" className="footer-link">Contact Us</a></p>
              </div>

              {/* Contact Info */}
              <div className="col-md-4 col-lg-3 col-xl-3 mb-md-0 mb-4">
                <h6 className="footer-title">Contact</h6>
                <hr className="footer-divider" />
                <p><i className="fas fa-home"></i> New York, NY 10974, USA</p>
                <p><i className="fas fa-envelope"></i> info@nnr.com</p>
                <p><i className="fas fa-phone"></i> +01 234 567 88</p>
                <p><i className="fas fa-print"></i> +01 234 567 89</p>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright */}
        <div className="footer-copyright text-center p-3">
          © {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.linkedin.com/in/narayana1704/" className="footer-link">
            NARAYANA REDDY NARU
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
