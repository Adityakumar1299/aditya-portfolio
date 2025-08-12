import React, { useState, useEffect } from "react";
import "./ShutdownScreen.css";

export default function ShutdownScreen() {
  const [showShutdown, setShowShutdown] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleShutdownClick = () => {
    setShowShutdown(true);
  };

  useEffect(() => {
    if (showShutdown) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            window.close(); // Attempt to close the tab
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [showShutdown]);

  return (
    <div>
      {!showShutdown && (
        <button className="shutdown-btn" onClick={handleShutdownClick}>
          Shutdown
        </button>
      )}

      {showShutdown && (
        <div className="shutdown-screen">
          <div className="loading-window">
            <div className="title-bar">Shutting down...</div>
            <div className="loading-bar">
              <div
                className="loading-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
