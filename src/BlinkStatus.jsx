// src/BlinkStatus.jsx
import React from 'react';

const BlinkStatus = ({ isBlinking }) => {
  return (
    <div style={{
      padding: '10px 20px',
      borderRadius: '20px',
      backgroundColor: isBlinking ? '#ff4757' : '#2f3542',
      color: 'white',
      fontWeight: 'bold',
      marginTop: '10px',
      transition: 'background-color 0.1s'
    }}>
      {isBlinking ? "BLINK DETECTED" : "Eyes Open"}
    </div>
  );
};

export default BlinkStatus;
