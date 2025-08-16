import React, { useState, useEffect } from "react";
import RetroSkill from "../components/RetroSkills"; // make sure you have this component
import "./Skill.css"; // you'll create this for retro styling
// import skillIcon from '../assets/skill.png';

function Skill() {
  const [loading, setLoading] = useState(false);
  const [showSkill, setShowSkill] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOpenSkill = () => {
    setProgress(0);
    setLoading(true);
    setShowSkill(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowSkill(true);
          return 100;
        } 
        return prev + 5;
      });
    }, 80);
  };

  const handleCloseSkill = () => {
    setShowSkill(false);
  };

  return (
    <div className="skill-page" style={{ position: "relative", padding: "20px" }}>
      <button
        className="open-skill-button"
        onClick={handleOpenSkill}
         style={{
    position: "fixed",
    top: "435px",
    left: "25px",
    zIndex: -1,
    background: "transparent",
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  }}>
      <img
            //  src={skillIcon}
               src={require("../assets/skill.png")}
             alt="project"
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
             Skill Level
           </span></button>

      {/* Loading bar */}
      {loading && (
        <div className="loader-window">
          <div className="loader-title">Loading Skills... [{progress}%]</div>
          <div className="loader-bar-container">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* Show skill component after loading */}
      {!loading && showSkill && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <RetroSkill onClose={handleCloseSkill} />
        </div>
      )}
    </div>
  );
}

export default Skill;
