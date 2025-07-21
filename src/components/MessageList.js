import React, { useEffect } from 'react';
import '../styles/ChatPage.css';
import { SmartToy as BotIcon, Person as PersonIcon, Search as SearchIcon } from '@mui/icons-material';
import MarkdownRenderer from './MarkdownRenderer';

const MessageList = ({ messages, isTyping, messagesEndRef, containerRef, onSendMessage }) => {
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, messagesEndRef]);

  // Log the messages for debugging
  useEffect(() => {
    console.log("MessageList received messages:", messages);
  }, [messages]);

  const handleExampleClick = (exampleText) => {
    if (onSendMessage) {
      onSendMessage(exampleText);
    }
  };

  // Example prompts
  const examplePrompts = [
    "Explain quantum computing in simple terms",
    "What are the best investment strategies for beginners?",
    "How do I create a balanced budget?",
    "Help me understand stock market trends"
  ];

  // If there are no messages, show a welcome message with search interface
  if (messages.length === 0) {
    return (
      <div 
        className="messages-container empty-chat" 
        ref={containerRef}
      >
        <div className="welcome-container">
          <div className="search-interface">
            <div className="search-icon-container">
              <SearchIcon style={{ fontSize: 38, color: 'rgba(255, 255, 255, 0.7)' }} />
            </div>
            <h2>How can I help you today?</h2>
            <p>Ask me anything, and I'll do my best to assist you!</p>
            
            <div className="example-prompts">
              {examplePrompts.map((prompt, index) => (
                <div className="example-prompt" key={index}>
                  <button 
                    className="example-prompt-button"
                    onClick={() => handleExampleClick(prompt)}
                  >
                    {prompt}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className="messages-container" ref={containerRef}>
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`message ${message.role === 'user' ? 'user-message' : 'ai-message'}`}
        >
          <div className={`avatar ${message.role === 'user' ? 'user-avatar' : 'ai-avatar'}`}>
            {message.role === 'user' ? <PersonIcon /> : <BotIcon />}
          </div>
          <div className="message-content">
            {message.role === 'assistant' ? (
              <MarkdownRenderer content={message.content} />
            ) : (
              message.content
            )}
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="typing-indicator">
          <div className={`avatar ai-avatar`}>
            <BotIcon />
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;