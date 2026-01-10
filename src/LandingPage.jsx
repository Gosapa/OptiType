import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  // Content Dictionary
  const TEXT = {
    KO: {
      title: "OptiType",
      subtitle: "모두를 위한 시선 제어 키보드",
      instructions_title: "사용 방법:",
      step1: "👀 시선을 움직여 파란색 커서를 이동하세요.",
      step2: "😉 눈을 깜빡여 키를 선택하세요.",
      step3: "💡 밝은 곳에서 사용해주세요.",
      button: "시작하기",
      note: "* 카메라는 로컬에서만 처리되며 서버로 전송되지 않습니다."
    },
    EN: {
      title: "OptiType",
      subtitle: "Gaze Controlled Keyboard for Everyone",
      instructions_title: "How to use:",
      step1: "👀 Look Left/Right to move the blue cursor.",
      step2: "😉 Blink to select a key.",
      step3: "💡 Ensure you are in a well-lit room.",
      button: "Start Typing",
      note: "* Camera data is processed locally. No video is sent to server."
    }
  };

  const content = TEXT[language];

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">{content.title}</h1>
        <p className="landing-subtitle">{content.subtitle}</p>

        {/* --- LANGUAGE TOGGLE --- */}
        <div className="language-toggle-container">
          <div
            className="toggle-switch"
            data-lang={language}
            onClick={() => setLanguage(prev => prev === 'KO' ? 'EN' : 'KO')}
          >
            <div className={`toggle-option ${language === 'KO' ? 'selected' : ''}`}>한국어</div>
            <div className={`toggle-option ${language === 'EN' ? 'selected' : ''}`}>English</div>
            <div className="toggle-slider"></div>
          </div>
        </div>

        <div className="landing-instructions">
          <h3>{content.instructions_title}</h3>
          <ul>
            <li>{content.step1}</li>
            <li>{content.step2}</li>
            <li>{content.step3}</li>
          </ul>
        </div>

        <button
          className="start-button"
          onClick={() => navigate('/keyboard')}
        >
          {content.button}
        </button>

        <p className="privacy-note">
          {content.note}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
