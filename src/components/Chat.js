import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ChatInterface from './ChatInterface';
import Sidebar from './Sidebar';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10a37f',
    },
    background: {
      default: '#343541',
      paper: '#444654',
    },
  },
  typography: {
    fontFamily: "'Söhne', 'Helvetica Neue', 'Arial', sans-serif",
  },
});


function Chat() {
  const [chats, setChats] = useState([
    { id: 1, title: 'Welcome Chat', messages: [] }
  ]);
  const [activeChat, setActiveChat] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Removed unused ai_response state
  // const [ai_response, setAi_response] = useState("");

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New Chat`,
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChat(newChat.id);
  };

  const handleDeleteChat = (chatId) => {
    const newChats = chats.filter(chat => chat.id !== chatId);
    setChats(newChats);
    if (activeChat === chatId) {
      setActiveChat(newChats[0]?.id || null);
    }
  };


  const handleSendMessage = (message) => {
    const currentChatIndex = chats.findIndex(chat => chat.id === activeChat);
    if (currentChatIndex === -1) return;

    const currentChat = chats[currentChatIndex];
    const isFirstMessage = currentChat.messages.length === 0;

    // Create the user message object
    const userMessage = { role: 'user', content: message };

    // Update chat state immediately with the user's message
    const updatedChats = [...chats];
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      // Update title immediately if it's the first message
      title: isFirstMessage
        ? message.slice(0, 30) + (message.length > 30 ? '...' : '')
        : currentChat.title,
    };
    updatedChats[currentChatIndex] = updatedChat;
    setChats(updatedChats);


    // Call the python backend
    axios.post('http://localhost:8000/query', { // Corrected endpoint
      query: message,                          // Corrected request body key
      deep_search: false                       // Added deep_search flag (defaulting to false)
    }).then(response => {
      console.log("AI Response:", response.data); // This will show the nested structure
      // --- FIX HERE ---
      // Extract the correct field from the NESTED response
      const aiMessageContent = response.data.answer.answer; // Access the inner 'answer'

      // Create the assistant message object
      const assistantMessage = { role: 'assistant', content: aiMessageContent };

      // Update the chat with the AI response
      setChats(prevChats => prevChats.map(chat =>
        chat.id === activeChat ? {
          ...chat,
          // Add the assistant message to the existing messages
          messages: [...chat.messages, assistantMessage]
        } : chat
      ));
    }).catch(error => {
      console.error("Error calling API:", error);
      // Handle error by adding an error message to the chat
      const errorMessage = { role: 'assistant', content: "Sorry, I couldn't process your request. Please try again." };
      setChats(prevChats => prevChats.map(chat =>
        chat.id === activeChat ? {
          ...chat,
          messages: [...chat.messages, errorMessage]
        } : chat
      ));
    });

    // The user message and title update are now handled before the API call
  };

  const currentChat = chats.find(chat => chat.id === activeChat);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

        <Sidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNewChat={handleNewChat}
          chats={chats}
          onDeleteChat={handleDeleteChat}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
        />
        <ChatInterface
          // Ensure messages are passed correctly even if currentChat is briefly undefined
          messages={currentChat?.messages || []} // <-- This passes the array of message objects
          onSendMessage={handleSendMessage}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default Chat;
