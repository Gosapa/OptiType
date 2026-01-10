// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import GazeKeyboard from './GazeKeyboard'; // Import your renamed keyboard file

function App() {
  return (
    <Router>
      <Routes>
        {/* Show Landing Page by default */}
        <Route path="/" element={<LandingPage />} />

        {/* Show Keyboard when URL is /keyboard */}
        <Route path="/keyboard" element={<GazeKeyboard />} />
      </Routes>
    </Router>
  );
}

export default App;
