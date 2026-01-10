// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import GazeTracker from './GazeTracker';
import Keyboard from './Keyboard';
import { KEYBOARD_ROOT } from './keyboardLayout';
import './App.css';
// 1. Import the library
import Hangul from 'hangul-js';

function App() {
  // 2. CHANGE STATE: Store history of keys, not just the string
  const [inputHistory, setInputHistory] = useState([]);

  // 3. COMPUTED VALUE: Calculate the string for display
  // Hangul.assemble(['ㄱ', 'ㅏ']) returns "가"
  const typedText = Hangul.assemble(inputHistory);

  const [currentGaze, setCurrentGaze] = useState("CENTER");
  const [currentNode, setCurrentNode] = useState(KEYBOARD_ROOT);
  const [activeIndex, setActiveIndex] = useState(0);

  const isBlinkFrozen = useRef(false);

  const handleGazeUpdate = (direction) => {
    setCurrentGaze(direction);
  };

  // SAFETY LOCK: This prevents the "Multiple Input" bug
  const lastNavigationTime = useRef(0);
  const NAVIGATION_COOLDOWN = 800; // 0.8 Seconds between moves

  useEffect(() => {
    // ... (Your existing Navigation Logic is unchanged) ...
    let interval;
    const itemsCount = currentNode.children.length;

    const moveCursor = (direction) => {
      const now = Date.now();
      // If we moved too recently, ignore this request
      if (now - lastNavigationTime.current < NAVIGATION_COOLDOWN) return;

      lastNavigationTime.current = now; // Update timestamp

      if (direction === 1) {
        setActiveIndex((prev) => (prev + 1) % itemsCount);
      } else {
        setActiveIndex((prev) => (prev - 1 < 0 ? itemsCount - 1 : prev - 1));
      }
    };
    if (currentGaze === "RIGHT") {
      // We use a faster interval check (e.g., 100ms) to check if we CAN move
      // But the 'moveCursor' function enforces the actual speed.
      interval = setInterval(() => moveCursor(1), 100);
    } else if (currentGaze === "LEFT") {
      interval = setInterval(() => moveCursor(-1), 100);
    }

    if (currentGaze === "BLINK" && !isBlinkFrozen.current) {
      handleSelection();
      isBlinkFrozen.current = true;
    }

    if (currentGaze !== "BLINK") {
      isBlinkFrozen.current = false;
    }
    return () => clearInterval(interval);
  }, [currentGaze, currentNode]);

  const handleSelection = () => {
    const selectedItem = currentNode.children[activeIndex];
    if (selectedItem.type === 'group') {
      setCurrentNode(selectedItem);
      setActiveIndex(0);
    } else {
      processInput(selectedItem.value);
      setCurrentNode(KEYBOARD_ROOT);
      setActiveIndex(0);
    }
  };

  // 4. UPDATE INPUT LOGIC: Manipulate the Array
  const processInput = (val) => {
    if (val === 'SPACE') {
      setInputHistory(prev => [...prev, " "]);
    }
    else if (val === 'BACKSPACE') {
      // Just remove the last "Lego block"
      setInputHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        return newHistory;
      });
    }
    else if (val === 'CLEAR') {
      setInputHistory([]);
    }
    else {
      // Add the new "Lego block"
      setInputHistory(prev => [...prev, val]);
    }
  };

  return (
    <div className="app-container">
      <section className="main-display">
        <div className="status-indicator">
          <div className={`status-dot ${currentGaze === "BLINK" ? "blink" : "active"}`}></div>
          {currentGaze === "BLINK" ? "BLINK" : "ACTIVE"}
        </div>

        <Keyboard
          currentNode={currentNode}
          activeIndex={activeIndex}
        />
      </section>

      <section className="input-display">
        <div className="text-box">
          {/* 5. Render the assembled text */}
          {typedText}<span className="cursor">|</span>
        </div>
      </section>

      <GazeTracker onGazeUpdate={handleGazeUpdate} />
    </div>
  );
}

export default App;
