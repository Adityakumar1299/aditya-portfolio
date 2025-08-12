import React, { useState, useRef } from "react";
import "./RetroBrowser.css";

const RetroBrowser = ({ url, onClose }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="retro-browser"
      style={{
        top: position.y,
        left: position.x,
        position: "absolute",
        zIndex: 9999,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="retro-top-bar"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ cursor: "move" }}
      >
        <span className="retro-title">Web Browser</span>
        <div className="retro-controls">
          <button onClick={onClose}>-</button>
          <button>□</button>
          <button className="close" onClick={onClose}>
            X
          </button>
        </div>
      </div>

      <div className="retro-toolbar">
        <button onClick={onClose}>←</button>
        <button>→</button>
        <button onClick={onClose}>🏠</button>
        <input className="retro-url" type="text" value={url} readOnly />
        <button>★</button>
      </div>

      <div className="retro-content">
        <iframe
          src={url}
          title="project"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default RetroBrowser;
