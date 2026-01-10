import React, { useState, useRef, useEffect } from 'react';
import { FiBook, FiCode, FiDatabase, FiLock, FiMap } from 'react-icons/fi';
import { askQuestion } from '../services/api';
import FeatureUnavailable from '../components/FeatureUnavailable';
import '../styles/ChatInterface.css';

const ChatInterface = ({ analysisData, isGitHubMode = false }) => {
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      text: 'Hello! I\'m your Repository Memory assistant. Select a question below to learn more about the codebase.',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show unavailable state for GitHub mode
  if (isGitHubMode) {
    return (
      <FeatureUnavailable
        title="Ask Questions"
        featureName="The intelligent Q&A system"
      />
    );
  }

  const predefinedQuestions = [
    {
      question: 'What is the main purpose of this project?',
      icon: <FiBook />
    },
    {
      question: 'Where should I start reading the code?',
      icon: <FiMap />
    },
    {
      question: 'What are the key components or modules?',
      icon: <FiCode />
    },
    {
      question: 'How is authentication handled?',
      icon: <FiLock />
    },
    {
      question: 'What database is used in this project?',
      icon: <FiDatabase />
    }
  ];

  const handleQuestionClick = async (question) => {
    if (loading) return;

    const userMessage = {
      type: 'user',
      text: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await askQuestion(question);

      const assistantMessage = {
        type: 'assistant',
        text: response.data.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'assistant',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        error: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h1>Ask Questions</h1>
        <p>Get instant AI-powered answers about the codebase</p>
      </div>

      <div className="chat-container card">
        {/* Messages */}
        <div className="messages-container">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`message ${message.type} ${message.error ? 'error' : ''}`}
            >
              <div className={`message-avatar ${message.type}`}>
                {message.type === 'user' ? <FiCode /> : <FiBook />}
              </div>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message assistant typing">
              <div className="message-avatar assistant">
                <FiBook />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Question Selection */}
        <div className="question-selection">
          <p className="selection-label">Select a question to learn more:</p>
          <div className="questions-grid">
            {predefinedQuestions.map((item, idx) => (
              <button
                key={idx}
                className="question-btn"
                onClick={() => handleQuestionClick(item.question)}
                disabled={loading}
              >
                <span className="question-icon">{item.icon}</span>
                <span className="question-text">{item.question}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
