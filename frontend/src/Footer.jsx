// src/Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Our Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
