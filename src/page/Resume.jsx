// src/pages/Resume.js
import React, { useState } from "react";
import ShowDetail from "../components/ShowDetail";
import resumeImg from "../assets/resume.png";
import resumePDF from "../assets/Aditya_Resume.pdf"; // import PDF
import "./Resume.css";
import resumeIcon from '../assets/no-bg.png';

function Resume() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResume, setShowResume] = useState(false);

  const handleOpenResume = () => {
    setProgress(0);
    setLoading(true);
    setShowResume(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowResume(true);
          return 100;
        }
        return prev + 4;
      });
    }, 80); // Adjust speed here if needed
  };

  
  const handleCloseResume = () => {
    setShowResume(false);
  };

  return (
    <div className="resume-page" style={{ position: "relative", padding: "20px" }}>
      {/* Open Resume Button */}
      <button
        className="resume-open-button"
        onClick={handleOpenResume}
        style={{
          position: "fixed",
          top: "122px",
          left: "23px",
          background: "transparent",
          border: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={resumeIcon}
          alt="Resume"
          width="60"
          height="60"
        />
        <span
          style={{
            marginTop: "4px",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Resume
        </span>
      </button>

      {/* Loader */}
      {loading && (
        <div className="loader-window">
          <div className="loader-title">Downloading [{progress}%]</div>
          <div className="loader-bar-container">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {!loading && showResume && (
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <ShowDetail onClose={handleCloseResume}>
            <div style={{ textAlign: "center" }}>
              <img
                src={resumeImg}
                alt="My Resume"
                className="resume-image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              {/* ✅ Download Button */}
              {/* <a
                href={resumePDF}
                download="Aditya_Resume.pdf"
                className="resume-download-button"
              >
                ⬇ Download Resume (PDF)
              </a> */}
            </div>
          </ShowDetail>
        </div>
      )}
    </div>
  );
}

export default Resume;
