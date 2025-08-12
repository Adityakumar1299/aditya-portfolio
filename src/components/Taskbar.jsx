import React, { useState, useEffect } from "react";
import StartMenu from "./StartMenu";
import './Taskbar.css';
import windowIcon from "../assets/window.png";

function Taskbar() {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, 1000); // update every second

    return () => clearInterval(timer); // cleanup when component unmounts
  }, []);

  const toggleStartMenu = () => {
    setShowStartMenu(prev => !prev);
  };

  const openSection = (sectionName) => {
    console.log("Open section:", sectionName);
    // You can pass this to StartMenu for section actions
  };

  return (
    <>
      <div className="taskbar">
        <div className="start-button" onClick={toggleStartMenu}>
          <img src={windowIcon} alt="Start" className="start-icon" />
          <span>Start</span>
        </div>
        <div className="task-label">
          <span>Welcome</span>
        </div>
        <div className="time">{currentTime}</div>
      </div>

      {showStartMenu && (
        <div className="start-menu-container">
          <StartMenu openSection={openSection} />
        </div>
      )}
    </>
  );
}

export default Taskbar;
