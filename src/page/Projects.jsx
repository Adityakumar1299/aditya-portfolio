import React, { useState } from 'react';
import RetroBrowser from '../components/RetroBrowser';
import projectIcon2 from "../assets/Project2.PNG";
// import './Projects.css'; // Make sure loader styles are in here

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showRetro, setShowRetro] = useState(false);

  const handleOpenProject = () => {
    setProgress(0);
    setLoading(true);
    setShowRetro(false);

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
    }, 80);
  };

  const handleCloseProject = () => {
    setShowRetro(false);
  };

  return (
    <div className='pro'>
      {/* Project Button */}
      <button
        onClick={handleOpenProject}
        style={{
          position: "fixed",
          top: "235px",
          left: "38px",
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
          src={projectIcon2}
          alt="project"
          width="60"
          height="60"
        />
        <span
          style={{
            marginTop: "4px",
            color: "white",
            fontFamily: "'W95FA', sans-serif",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Project
        </span>
      </button>

      {/* Loader */}
      {loading && (
        <div className="loader-window">
          <div className="loader-title">Downloading [{progress}%]</div>
          <div className="loader-bar-container">
            <div
              className="loader-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* RetroBrowser */}
      {!loading && showRetro && (
        <RetroBrowser
          url="https://shopingo-full-stack-i5ls.vercel.app/"
          onClose={handleCloseProject}
        />
      )}
    </div>
  );
};

export default Projects;
