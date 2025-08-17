// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import ContactMe from "../components/ContactMe";
import "./Contact.css";
// import contactIcon from '../assets/contacts.png';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContact, setShowContact] = useState(false);

  const handleOpenContact = () => {
    setProgress(0);
    setLoading(true);
    setShowContact(false); // Hide contact component while loading

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowContact(true);
          return 100;
        }
        return prev + 5;
      });
    }, 80);
  };

  const handleCloseContact = () => {
    setShowContact(false);
  };

  return (
    <div className="contact-page">
      <button
  className="retro-toggle-button"
  onClick={handleOpenContact}
  style={{
    position: "fixed",
    top: "535px",
    left: "32px",
    zIndex: -1,
    background: "transparent",
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
   
  }}
>
  <img
    src="/contacts.png"
    alt="contacts"
   width="60"
          height="60"
  />
  <span
    style={{
      marginTop: "4px",
       fontFamily: "'W95FA', sans-serif",
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
    }}
  >
    Contact
  </span>
</button>


      {/* Loading simulation */}
      {loading && (
        <div className="loader-window">
          <div className="loader-title">Opening Contact... [{progress}%]</div>
          <div className="loader-bar-container">
            <div
              className="loader-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Contact Window */}
      {!loading && showContact && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <ContactMe onClose={handleCloseContact} />
        </div>
      )}
    </div>
  );
};

export default Contact;
