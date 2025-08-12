import React, { useRef, useEffect, useState } from "react";
import "./ContactMe.css";

const ContactMe = ({ onClose }) => {
  const windowRef = useRef(null);
  const [position, setPosition] = useState({ x: 150, y: 120 });

  // Typing animation state
  const fullEmail = "Aditya1239kumar@gmail.com";
  const fullPhone = "8368640481";
  const [typedEmail, setTypedEmail] = useState("");
  const [typedPhone, setTypedPhone] = useState("");

  // Typing effect
  useEffect(() => {
    let emailIndex = 0;
    let phoneIndex = 0;

    const emailTimer = setInterval(() => {
      setTypedEmail(fullEmail.slice(0, emailIndex + 1));
      emailIndex++;
      if (emailIndex === fullEmail.length) {
        clearInterval(emailTimer);

        // Start phone typing after email finishes
        const phoneTimer = setInterval(() => {
          setTypedPhone(fullPhone.slice(0, phoneIndex + 1));
          phoneIndex++;
          if (phoneIndex === fullPhone.length) {
            clearInterval(phoneTimer);
          }
        }, 100);
      }
    }, 100);

    return () => {
      clearInterval(emailTimer);
    };
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
  }, [position]);

  return (
    <div
      className="retro-contact-window"
      ref={windowRef}
      style={{ top: position.y, left: position.x, position: "absolute",
        zIndex: 9999, }}
    >
      <div className="retro-title-bar">
        <span>ContactMe.exe</span>
        <div className="retro-buttons">
          <button onClick={onClose}>-</button>
          <button>□</button>
          <button className="close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="retro-contact-body">
        <div className="retro-contact-item">
          <div className="retro-contact-label"> Email:</div>
          <div className="retro-contact-value">{typedEmail}</div>
        </div>
        <div className="retro-contact-item">
          <div className="retro-contact-label"> Phone:</div>
          <div className="retro-contact-value">{typedPhone}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
