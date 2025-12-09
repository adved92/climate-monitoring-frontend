import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme, effectiveTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'auto', label: 'Auto', icon: '🔄' }
  ];

  return (
    <div className="theme-toggle">
      <label className="theme-label">🎨 Theme</label>
      <div className="theme-options">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => toggleTheme(t.value)}
            className={`theme-btn ${theme === t.value ? 'active' : ''}`}
            title={`Switch to ${t.label} theme`}
          >
            <span className="theme-icon">{t.icon}</span>
            <span className="theme-name">{t.label}</span>
          </button>
        ))}
      </div>
      <div className="current-theme">
        Current: {effectiveTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </div>
    </div>
  );
};

export default ThemeToggle;
