// src/RotateWarning.jsx
import React from 'react';
import './RotateWarning.css';

const RotateWarning = () => {
  return (
    <div className="rotate-warning-container">
      <div className="phone-icon">📱</div>
      <h2>Please Rotate Your Device</h2>
      <p>OptiType works best in Landscape mode.</p>
    </div>
  );
};

export default RotateWarning;
