// src/Keyboard.jsx
import React from 'react';
import './Keyboard.css';

const Keyboard = ({ currentNode, activeIndex }) => {
  // We only render the children of the current node
  const items = currentNode.children;

  return (
    <div className="keyboard-container">
      <div className="keyboard-header">
        {/* Shows where we are (e.g., Start > Consonants) */}
        <span>Current Selection: {currentNode.label}</span>
      </div>

      <div className="keyboard-row">
        {items.map((item, index) => (
          <div
            key={index}
            className={`key-box ${index === activeIndex ? 'active' : ''}`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
