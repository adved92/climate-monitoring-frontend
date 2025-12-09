import React, { useState, useEffect, useRef } from 'react';
import './WeatherChatbot.css';

const WeatherChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Add welcome message
    if (messages.length === 0) {
      addBotMessage(
        "Hello! I'm your weather assistant. I can help you with current weather, forecasts, air quality, and more. What would you like to know?",
        [
          "What's the weather like today?",
          "Show me the forecast",
          "Check air quality"
        ]
      );
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text, suggestions = []) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'bot',
        text,
        timestamp: new Date().toISOString(),
        suggestions
      }
    ]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        text,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const handleSendMessage = async (message = inputValue) => {
    if (!message.trim()) return;

    // Add user message
    addUserMessage(message);
    setInputValue('');
    setIsTyping(true);

    try {
      // Send to chatbot API
      const response = await fetch('/api/chatbot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: message,
          user_id: 'demo_user',
          context: {}
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Simulate typing delay
      setTimeout(() => {
        addBotMessage(data.message, data.suggestions || []);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error('Error sending message:', error);
      addBotMessage(
        "I'm sorry, I encountered an error. Please try again.",
        []
      );
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-content">
              <span className="bot-avatar">🤖</span>
              <div className="header-text">
                <h3>Weather Assistant</h3>
                <span className="status">Online</span>
              </div>
            </div>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                  </div>
                  <span className="message-time">{formatTime(msg.timestamp)}</span>
                  
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="message-suggestions">
                      {msg.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="suggestion-chip"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.type === 'user' && (
                  <div className="message-avatar user">👤</div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the weather..."
              rows="1"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherChatbot;
