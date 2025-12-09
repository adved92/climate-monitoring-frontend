import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button
        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => toggleTheme('light')}
        title="Light theme"
      >
        ☀️
      </button>
      <button
        className={`theme-btn ${theme === 'auto' ? 'active' : ''}`}
        onClick={() => toggleTheme('auto')}
        title="Auto theme"
      >
        🌓
      </button>
      <button
        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => toggleTheme('dark')}
        title="Dark theme"
      >
        🌙
      </button>
    </div>
  );
};

export default ThemeToggle;
