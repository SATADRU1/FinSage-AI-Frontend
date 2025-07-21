import React from 'react';
import '../styles/ChatPage.css';
import { AddOutlined, ChatBubbleOutlineOutlined, DeleteOutlineOutlined } from '@mui/icons-material';

const Sidebar = ({ isOpen, chats, activeChat, onNewChat, onSelectChat, onDeleteChat, user }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>AI Chat Assistant</h3>
      </div>
      
      <button className="new-chat-button" onClick={onNewChat}>
        <AddOutlined style={{ marginRight: '8px' }} />
        New chat
      </button>
      
      <div className="chats-list">
        {chats.map(chat => (
          <div 
            key={chat.id} 
            className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => onSelectChat(chat.id)}
          >
            <ChatBubbleOutlineOutlined fontSize="small" />
            <div className="chat-item-text">{chat.title}</div>
            <button 
              className="delete-chat-button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
            >
              <DeleteOutlineOutlined fontSize="small" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <div 
          className="user-avatar-circle"
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            backgroundColor: '#5436DA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
        </div>
        <div className="user-name">
          {user?.displayName || user?.email || 'User'}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
