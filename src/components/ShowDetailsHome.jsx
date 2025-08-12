// src/ShowDetailHome.js
import React, { useRef, useState, useEffect } from 'react';
import './ShowDetail.css';

function ShowDetailHome({ onClose }) {
  const windowRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });

  // Drag logic
  useEffect(() => {
    const node = windowRef.current;
    if (!node) return;

    const handleMouseDown = (e) => {
      if (!e.target.closest('.title-bar') || isFullScreen) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const { x, y } = position;

      const handleMouseMove = (moveEvent) => {
        const newX = x + (moveEvent.clientX - startX);
        const newY = y + (moveEvent.clientY - startY);
        setPosition({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    node.addEventListener('mousedown', handleMouseDown);
    return () => node.removeEventListener('mousedown', handleMouseDown);
  }, [position, isFullScreen]);

  // Resize logic
  const handleResize = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      setSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Fullscreen logic (replacing old maximize toggle)
  const handleMaximize = () => {
    if (windowRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (windowRef.current.requestFullscreen) {
        windowRef.current.requestFullscreen();
      } else if (windowRef.current.webkitRequestFullscreen) {
        windowRef.current.webkitRequestFullscreen();
      } else if (windowRef.current.msRequestFullscreen) {
        windowRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div
      ref={windowRef}
      className="notepad-window2"
      style={{
        position: 'absolute',
        top: isFullScreen ? 0 : position.y,
        left: isFullScreen ? 0 : position.x,
        width: isFullScreen ? '100vw' : size.width,
        height: isFullScreen ? '100vh' : size.height,
        zIndex: 9999,
      }}
    >
      <div className="title-bar">
        <span className="title">Notepad</span>
        <div className="window-controls">
          <button className="minimize" onClick={onClose}>_</button>
          <button className="maximize" onClick={handleMaximize}>▭</button>
          <button className="close" onClick={onClose}>X</button>
        </div>
      </div>

      <div className="menu-bar" />

      <div className="notepad-body">
        <textarea
          defaultValue={`Hello, I am Aditya Kumar,
a frontend developer passionate about building engaging and interactive web apps with React.js.
I enjoy blending modern design with functionality,
experimenting with creative UI elements,
and delivering smooth user experiences...`}
        />
      </div>

      {!isFullScreen && (
        <div
          onMouseDown={handleResize}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 20,
            height: 20,
            cursor: 'se-resize',
            background: 'transparent',
          }}
        />
      )}
    </div>
  );
}

export default ShowDetailHome;
