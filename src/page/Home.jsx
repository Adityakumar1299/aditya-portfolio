import React, { useState, useEffect } from "react";
import ShowDetailHome from "../components/ShowDetailsHome";
import "./Home.css";
// import userIcon from '../assets/user.png';

function Home() {
  const [loading, setLoading] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOpenPortfolio = () => {
    setProgress(0);
    setLoading(true);
    setShowPortfolio(false); // Hides detail component until loading finishes

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowPortfolio(true);
          return 100;
        }
        return prev + 4;
      });
    }, 80); // Adjust speed if needed
  };

  const handleClosePortfolio = () => {
    setShowPortfolio(false);
  };

  return (
    <div className="home" style={{ position: "relative", padding: "20px" }}>
      <button
        className="open-button"
        onClick={handleOpenPortfolio}
          style={{
    position: "fixed",
    top: "10px",
    left: "31px",
    background: "transparent",
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  }}>
         <img
                src="/user.png"
                alt="user"
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
                About Me
              </span>
      </button>

      {/* Only show loading bar */}
      {loading && (
        <div className="loader-window">
          <div className="loader-title">Downloading [{progress}%]</div>
          <div className="loader-bar-container">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* Only show detail when loading finishes */}
      {!loading && showPortfolio && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <ShowDetailHome onClose={handleClosePortfolio} />
        </div>
      )}
    </div>
  );
}

export default Home;
