import React, { useRef, useEffect, useState } from "react";
import "./RetroSkills.css";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 89 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "MongoDB", level: 78 },
];

const RetroSkills = ({ onClose }) => {
  const windowRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [progress, setProgress] = useState(skills.map(() => 0)); // start at 0%

  // Animate progress when mounted
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) =>
        prev.map((value, i) =>
          value < skills[i].level ? value + 1 : value
        )
      );
    }, 20); // speed of filling
    return () => clearInterval(interval);
  }, []);

  // Drag logic
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    const handleMouseDown = (e) => {
      if (!e.target.closest(".retro-title-bar")) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startPos = { ...position };

      const handleMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        setPosition({
          x: startPos.x + dx,
          y: startPos.y + dy,
        });
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
  }, [position]);

  return (
    <div
      ref={windowRef}
      className="retro-skill-window"
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 9999,
      }}
    >
      <div className="retro-title-bar">
        <span>Skills.exe</span>
        <div className="retro-buttons">
          <button onClick={onClose}>-</button>
          <button>□</button>
          <button className="close" onClick={onClose}>X</button>
        </div>
      </div>

      <div className="retro-skill-body">
        {skills.map((skill, index) => (
          <div key={index} className="retro-skill">
            <label>{skill.name}</label>
            <div className="retro-progress-bar">
              <div
                className="retro-progress-fill"
                style={{ width: `${progress[index]}%` }}
              >
                {progress[index]}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetroSkills;
