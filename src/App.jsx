// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import GazeKeyboard from './GazeKeyboard';
import RotateWarning from './RotateWarning.jsx'

function App() {
  const [language, setLanguage] = useState('KO');
  return (
    <Router>
      <RotateWarning />
      <Routes>
        <Route path="/"
               element={<LandingPage language={language} setLanguage={setLanguage}/>} />

        {/* Show Keyboard when URL is /keyboard */}
        <Route path="/keyboard"
               element={<GazeKeyboard language={language}/>} />
      </Routes>
    </Router>
  );
}

export default App;
