import React, { useState } from 'react';
import '../styles/ChatPage.css';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import axios from 'axios';

const ChatPage = ({ user }) => {
  const [chats, setChats] = useState([
    { id: 1, title: 'New Chat', messages: [] }
  ]);
  const [activeChat, setActiveChat] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Function to handle creating a new chat
  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Chat',
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChat(newChat.id);
  };

  // Function to handle deleting a chat
  const handleDeleteChat = (chatId) => {
    const newChats = chats.filter(chat => chat.id !== chatId);
    setChats(newChats);
    
    // If the active chat is deleted, set the first available chat as active
    if (activeChat === chatId) {
      setActiveChat(newChats[0]?.id || null);
    }
  };

  // Function to send a message to the AI
  const handleSendMessage = async (message, deepResearch = false) => {
    // Find the current active chat
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (!currentChat) return;

    // Add user message to the chat
    const updatedChat = {
      ...currentChat,
      messages: [
        ...currentChat.messages,
        { role: 'user', content: message }
      ]
    };

    // If this is the first message, use it as the chat title
    if (currentChat.messages.length === 0) {
      updatedChat.title = message.slice(0, 30) + (message.length > 30 ? '...' : '');
    }

    // Update the chats state with the user message
    setChats(prevChats => prevChats.map(chat =>
      chat.id === activeChat ? updatedChat : chat
    ));

    // Show typing indicator
    setIsTyping(true);

    try {
      console.log("Sending message with deepResearch:", deepResearch);

      const response = await axios.post('http://localhost:8000/query', {
        query: message,
        deep_search: deepResearch
      });

      console.log("API Response Data:", response.data);

      // Modified content extraction
      const assistantContent = response.data.answer?.answer || 
                              response.data.answer?.content ||  // New check for content field
                              JSON.stringify(response.data.answer) || // Fallback for debugging
                              "I couldn't generate a response.";

      // Add AI response to the chat
      setChats(prevChats => prevChats.map(chat =>
        chat.id === activeChat ? {
          ...chat,
          messages: [
            ...chat.messages,
            { 
              role: 'assistant', 
              content: assistantContent,
              // Add raw data for debugging
              rawData: response.data.answer // For inspection in console
            }
          ]
        } : chat
      ));
    } catch (error) {
      console.error("Error calling API:", error);
      
      // Add error message to the chat
      setChats(prevChats => prevChats.map(chat =>
        chat.id === activeChat ? {
          ...chat,
          messages: [
            ...chat.messages,
            { 
              role: 'assistant', 
              content: "Sorry, I encountered an error while processing your request. Please try again later."
            }
          ]
        } : chat
      ));
    } finally {
      // Hide typing indicator
      setIsTyping(false);
    }
  };

  // Toggle sidebar visibility (especially for mobile)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the current active chat
  const currentChat = chats.find(chat => chat.id === activeChat) || chats[0];

  return (
    <div className="chat-container">
      <Sidebar
        isOpen={isSidebarOpen}
        chats={chats}
        activeChat={activeChat}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChat}
        onDeleteChat={handleDeleteChat}
        user={user}
      />
      
      <ChatArea
        chat={currentChat}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

export default ChatPage;