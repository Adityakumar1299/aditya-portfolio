import React, { useState, useEffect } from "react";
import ShowDetailHome from "./ShowDetailsHome";
import ShowDetail from "./ShowDetail";
import RetroSkills from "./RetroSkills";
import RetroBrowser from "./RetroBrowser";
import ContactMe from "./ContactMe";
import resumePDF from "../assets/Aditya_Resume.pdf";
import contactIcon from "../assets/Contacts.png";
import userIcon from "../assets/user.png";
import resumeIcon from "../assets/no-bg.png";
import projectIcon2 from "../assets/project2.png";
import projectIcon from "../assets/project.png";
import skillIcon from "../assets/skill.png";
import "./StartMenu.css";
import "./ShutdownScreen.css"; // New CSS for shutdown effect

function StartMenu() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeWindow, setActiveWindow] = useState(null);
  const [showShutdown, setShowShutdown] = useState(false);
  const [shutdownProgress, setShutdownProgress] = useState(0);

  const openWindow = (type) => {
    setProgress(0);
    setLoading(true);
    setActiveWindow(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setActiveWindow(type);
          return 100;
        }
        return prev + 5;
      });
    }, 60);
  };

  const closeWindow = () => setActiveWindow(null);

  const shutdown = () => {
    setShowShutdown(true);
  };

  useEffect(() => {
    if (showShutdown) {
      const timer = setInterval(() => {
        setShutdownProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            window.close(); // will only work for JS-opened tabs
            document.body.innerHTML = `
              <div style="
                background:black;
                color:white;
                height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:2rem;
                font-family:sans-serif;
              ">
                <p>It is now safe to turn off your computer.</p>
              </div>
            `;
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [showShutdown]);

  const renderComponent = () => {
    switch (activeWindow) {
      case "portfolio":
        return <ShowDetailHome onClose={closeWindow} />;
      case "resume":
        return (
          <ShowDetail onClose={closeWindow}>
            <iframe
              src={resumePDF}
              title="Resume"
              width="100%"
              height="500px"
              style={{ border: "none" }}
            />
          </ShowDetail>
        );
      case "project1":
        return (
          <RetroBrowser
            url="https://shopingo-full-stack-i5ls.vercel.app/"
            onClose={closeWindow}
          />
        );
      case "project2":
        return (
          <RetroBrowser
            url="https://quickcart-background-remover.netlify.app/"
            onClose={closeWindow}
          />
        );
      case "skills":
        return <RetroSkills onClose={closeWindow} />;
      case "contact":
        return <ContactMe onClose={closeWindow} />;
      default:
        return null;
    }
  };

  return (
    <div className="start-menu-nt">
      {/* Left Blue Bar */}
      <div className="nt-bar">
        <span className="nt-text">Windows NT Workstation</span>
      </div>

      {/* Right Menu Items */}
      <div className="menu-items">
        <button onClick={() => openWindow("portfolio")}>
          <img src={userIcon} alt="About Me" />
          <span>About Me&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶</span>
        </button>
        <button onClick={() => openWindow("resume")}>
          <img src={resumeIcon} alt="Resume" />
          <span>
            Resume&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶
          </span>
        </button>
        <button onClick={() => openWindow("project1")}>
          <img src={projectIcon2} alt="Project" />
          <span>
            Project&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶
          </span>
        </button>
        <button onClick={() => openWindow("project2")}>
          <img src={projectIcon} alt="Project 2" />
          <span>
            Project 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶
          </span>
        </button>
        <button onClick={() => openWindow("skills")}>
          <img src={skillIcon} alt="Skills" />

          <span>Skill Level&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶</span>
        </button>
        <button onClick={() => openWindow("contact")}>
          <img src={contactIcon} alt="Contact" />
          <span>
            Contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶
          </span>
        </button>
        <button className="shutdown-btn" onClick={shutdown}>
          Shut Down...
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="loader-window">
          <div className="loader-title">Loading [{progress}%]</div>
          <div className="loader-bar-container">
            <div
              className="loader-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {!loading && activeWindow && (
        <div
          style={{
            position: "fixed",
            top: "calc(-592px + 126vh)",
            left: "650px",
            zIndex: 1000,
          }}
        >
          {renderComponent()}
        </div>
      )}

      {/* Shutdown Screen */}
      {showShutdown && (
        <div className="shutdown-screen">
          <div className="loading-window">
            <div className="title-bar">Shutting down...</div>
            <div className="loading-bar">
              <div
                className="loading-fill"
                style={{ width: `${shutdownProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartMenu;
