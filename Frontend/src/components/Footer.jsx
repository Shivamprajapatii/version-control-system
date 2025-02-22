import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are passionate about providing developers with tools and resources to create amazing projects.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/create">Create Repo</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@shivam.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 GitHubClone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
