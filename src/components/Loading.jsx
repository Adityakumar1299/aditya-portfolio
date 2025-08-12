// LoadingBar.js
import React, { useState, useEffect } from 'react';
import './LoadingBar.css';

function LoadingBar({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete(); // tell parent loading is complete
          return 100;
        }
        return prev + 5;
      });
    }, 100); // speed of loading bar

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-window">
      <div className="title-bar">
        <span className="title">Downloading [{progress}%]</span>
      </div>
      <div className="loading-bar">
        <div className="loading-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default LoadingBar;
