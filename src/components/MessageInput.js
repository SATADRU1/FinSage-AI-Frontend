import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatPage.css';
import { Send as SendIcon, Search as SearchIcon } from '@mui/icons-material';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [deepResearch, setDeepResearch] = useState(false);
  const textareaRef = useRef(null);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("MessageInput submitting:", message, deepResearch);
      onSendMessage(message, deepResearch);
      setMessage('');
      
      // Reset height after sending message
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleDeepResearch = () => {
    setDeepResearch(!deepResearch);
  };

  return (
    <div className="message-input-container">
      <form className="message-form" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          rows={1}
        />
        <button 
          type="button" 
          className="search-button"
          aria-label="Search"
        >
          <SearchIcon style={{ fontSize: 20 }} />
        </button>
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <SendIcon style={{ fontSize: 20 }} />
        </button>
      </form>
      
      <div className="deep-research-container">
        <button 
          type="button"
          className={`deep-research-button ${deepResearch ? 'active' : ''}`}
          onClick={toggleDeepResearch}
          aria-pressed={deepResearch}
        >
          Deep research mode
        </button>
      </div>
    </div>
  );
};

export default MessageInput; 