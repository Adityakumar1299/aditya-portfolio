import React, { useState, useRef, useEffect } from "react";
import resumePDF from "../assets/Aditya_Resume.pdf";
import "./ShowDetail.css";

function ShowDetail({ onClose, children }) {
  const windowRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Center window on mount
  useEffect(() => {
    const el = windowRef.current;
    if (el && !document.fullscreenElement) {
      const rect = el.getBoundingClientRect();
      const centerX = window.innerWidth / 2 - rect.width / 2;
      const centerY = window.innerHeight / 2 - rect.height / 2;
      setPosition({ x: centerX, y: centerY });
    }
  }, []);

  // Drag logic (disabled when fullscreen)
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    const handleMouseDown = (e) => {
      if (!e.target.closest(".showdetail-title-bar") || isFullScreen) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startPos = { ...position };

      const handleMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        setPosition({ x: startPos.x + dx, y: startPos.y + dy });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    el.addEventListener("mousedown", handleMouseDown);
    return () => el.removeEventListener("mousedown", handleMouseDown);
  }, [position, isFullScreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      windowRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={windowRef}
      className="showdetail-window"
      style={{
        position: "absolute",
        top: isFullScreen ? 0 : position.y,
        left: isFullScreen ? 0 : position.x,
        width: isFullScreen ? "100%" : "500px",
        height: isFullScreen ? "100%" : "auto",
        zIndex: 9999,
      }}
    >
      <div className="showdetail-title-bar">
        <span className="showdetail-title">
          Show Detail
          <a
            href={resumePDF}
            download="Aditya_Resume.pdf"
            className="win95-button download-button"
          >
            ⬇ Download PDF
          </a>
        </span>
        <div className="showdetail-controls">
          <button onClick={onClose}>_</button>
          <button onClick={toggleFullScreen}>▭</button>
          <button onClick={onClose}>X</button>
        </div>
      </div>
      <div className="showdetail-body">{children}</div>
    </div>
  );
}

export default ShowDetail;
