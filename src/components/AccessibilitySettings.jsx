/**
 * Accessibility Settings Component
 * Provides user interface for accessibility preferences
 */
import React from 'react';
import { useAccessibility } from './AccessibilityProvider';
import './AccessibilitySettings.css';

const AccessibilitySettings = ({ isOpen, onClose }) => {
  const { settings, updateSetting, announce } = useAccessibility();

  const handleSettingChange = (key, value) => {
    updateSetting(key, value);
    announce(`${key} ${value ? 'enabled' : 'disabled'}`, 'polite');
  };

  if (!isOpen) return null;

  return (
    <div
      className="accessibility-settings-overlay"
      role="dialog"
      aria-labelledby="accessibility-settings-title"
      aria-modal="true"
    >
      <div className="accessibility-settings-modal">
        <div className="accessibility-settings-header">
          <h2 id="accessibility-settings-title">
            Accessibility Settings
          </h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close accessibility settings"
          >
            ✕
          </button>
        </div>

        <div className="accessibility-settings-content">
          <div className="setting-group">
            <h3>Visual Settings</h3>
            
            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                  aria-describedby="high-contrast-desc"
                />
                <span className="setting-title">High Contrast Mode</span>
              </label>
              <p id="high-contrast-desc" className="setting-description">
                Increases contrast between text and background for better readability
              </p>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.largeText}
                  onChange={(e) => handleSettingChange('largeText', e.target.checked)}
                  aria-describedby="large-text-desc"
                />
                <span className="setting-title">Large Text</span>
              </label>
              <p id="large-text-desc" className="setting-description">
                Increases font size throughout the application
              </p>
            </div>
          </div>

          <div className="setting-group">
            <h3>Motion Settings</h3>
            
            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
                  aria-describedby="reduced-motion-desc"
                />
                <span className="setting-title">Reduce Motion</span>
              </label>
              <p id="reduced-motion-desc" className="setting-description">
                Minimizes animations and transitions that may cause discomfort
              </p>
            </div>
          </div>

          <div className="setting-group">
            <h3>Navigation Settings</h3>
            
            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.keyboardNavigation}
                  onChange={(e) => handleSettingChange('keyboardNavigation', e.target.checked)}
                  aria-describedby="keyboard-nav-desc"
                />
                <span className="setting-title">Enhanced Keyboard Navigation</span>
              </label>
              <p id="keyboard-nav-desc" className="setting-description">
                Improves keyboard navigation with focus management and shortcuts
              </p>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.focusVisible}
                  onChange={(e) => handleSettingChange('focusVisible', e.target.checked)}
                  aria-describedby="focus-visible-desc"
                />
                <span className="setting-title">Visible Focus Indicators</span>
              </label>
              <p id="focus-visible-desc" className="setting-description">
                Shows clear visual indicators when elements receive keyboard focus
              </p>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.screenReaderMode}
                  onChange={(e) => handleSettingChange('screenReaderMode', e.target.checked)}
                  aria-describedby="screen-reader-desc"
                />
                <span className="setting-title">Screen Reader Optimizations</span>
              </label>
              <p id="screen-reader-desc" className="setting-description">
                Optimizes the interface for screen reader users with enhanced ARIA labels
              </p>
            </div>
          </div>

          <div className="setting-group">
            <h3>Keyboard Shortcuts</h3>
            <div className="keyboard-shortcuts">
              <div className="shortcut-item">
                <kbd>Tab</kbd>
                <span>Navigate forward through interactive elements</span>
              </div>
              <div className="shortcut-item">
                <kbd>Shift + Tab</kbd>
                <span>Navigate backward through interactive elements</span>
              </div>
              <div className="shortcut-item">
                <kbd>Enter</kbd>
                <span>Activate buttons and links</span>
              </div>
              <div className="shortcut-item">
                <kbd>Space</kbd>
                <span>Activate buttons and checkboxes</span>
              </div>
              <div className="shortcut-item">
                <kbd>Escape</kbd>
                <span>Close modals and dropdowns</span>
              </div>
              <div className="shortcut-item">
                <kbd>Arrow Keys</kbd>
                <span>Navigate within components like menus</span>
              </div>
            </div>
          </div>
        </div>

        <div className="accessibility-settings-footer">
          <button
            className="apply-button"
            onClick={onClose}
          >
            Apply Settings
          </button>
          <button
            className="reset-button"
            onClick={() => {
              Object.keys(settings).forEach(key => {
                updateSetting(key, false);
              });
              announce('All accessibility settings reset', 'polite');
            }}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;