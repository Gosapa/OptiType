// src/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // We will create this below

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">EyeType</h1>
        <p className="landing-subtitle">
          A Gaze-Controlled Keyboard for Everyone.
        </p>

        <div className="landing-instructions">
          <h3>How to use:</h3>
          <ul>
            <li>👀 <strong>Look Left/Right</strong> to move the blue cursor.</li>
            <li>😉 <strong>Blink</strong> to select a key.</li>
            <li>💡 Ensure you are in a well-lit room.</li>
          </ul>
        </div>

        <button
          className="start-button"
          onClick={() => navigate('/keyboard')}
        >
          Start Typing
        </button>

        <p className="privacy-note">
          * Your camera data is processed 100% locally. No video is sent to any server.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
