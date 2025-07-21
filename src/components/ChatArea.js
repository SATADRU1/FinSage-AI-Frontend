import React, { useRef } from 'react';
import '../styles/ChatPage.css';
import { Menu as MenuIcon } from '@mui/icons-material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatArea = ({
  chat, // Received from ChatPage
  isTyping,
  onSendMessage,
  onToggleSidebar,
  isSidebarOpen
}) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Wrapper function to make sure we properly pass the parameters
  const handleSendMessage = (message, deepResearch) => {
    onSendMessage(message, deepResearch);
  };

  return (
    <div className="chat-main">
      <div className="chat-header">
        <button className="toggle-sidebar-button" onClick={onToggleSidebar}>
          <MenuIcon />
        </button>
        <div style={{ marginLeft: '8px' }}>
          {chat?.title || 'New Chat'}
        </div>
      </div>

      <MessageList 
        messages={chat?.messages || []} 
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        containerRef={messagesContainerRef}
        onSendMessage={handleSendMessage}
      />

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;