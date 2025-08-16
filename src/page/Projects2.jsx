import React, { useState } from 'react';
import RetroBrowser from '../components/RetroBrowser';
// import projectImg from '../assets/project.png';
import projectImg from "../../assets/project.png";


const Projects2 = () => {
  const [loading, setLoading] = useState(false);
  const [showRetro, setShowRetro] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOpenProject = () => {
    setProgress(0);
    setLoading(true);
    setShowRetro(false); // Hide RetroBrowser until loading finishes

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowRetro(true);
          return 100;
        }
        return prev + 4;
      });
    }, 80); // Adjust speed if needed
  };

  const handleCloseProject = () => {
    setShowRetro(false);
  };

  return (
    <div>
      {/* Button */}
      <button 
        className="project-button"
        onClick={handleOpenProject} 
        style={{
          position: "fixed",
          top: "335px",
          left: "33px",
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
          src={projectImg}
          alt="project"
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
          Project 2
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

      {/* Retro Browser */}
      {!loading && showRetro && (
        <RetroBrowser
          url="https://quickcart-background-remover.netlify.app/"
          onClose={handleCloseProject}
        />
      )}
    </div>
  );
};

export default Projects2;
