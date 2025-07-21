import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Container,
  Avatar,
  CircularProgress,
  // Removed Divider as it's now handled in MarkdownRenderer
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import SmartToyIcon from '@mui/icons-material/SmartToy'; // AI avatar
import PersonIcon from '@mui/icons-material/Person'; // User avatar
// Removed ReactMarkdown, remarkGfm, MDXProvider, remarkMdx imports

// Import the new MarkdownRenderer component
import MarkdownRenderer from './MarkdownRenderer';

// Removed remarkEqualSigns plugin
// Removed components map

const ChatInterface = ({
  messages = [],
  onSendMessage,
  isSidebarOpen,
  onToggleSidebar,
  // Removed components and remarkPlugins props
}) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Keep local typing state if needed
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Function to scroll to bottom when needed
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Auto-scroll when messages update
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // setIsTyping(true); // Consider if parent component handles typing state
      onSendMessage(input);
      setInput('');
      // setTimeout(() => setIsTyping(false), 1000); // Parent might handle this
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#343541', position: 'relative' }}>
      {/* Add this new Box for the menu button */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={onToggleSidebar}
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Container
        maxWidth="md"
        ref={containerRef} // Ref to enable scrolling
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          py: 3,
          px: { xs: 2, sm: 3 },
          /* Hide Scrollbar */
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, Edge
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              mb: 3,
              gap: 2,
              backgroundColor: message.role === 'assistant' ? '#444654' : 'transparent',
              p: { xs: 2, sm: 3 },
              borderRadius: 1,
              width: '100%',
            }}
          >
            <Avatar
              sx={{
                bgcolor: message.role === 'assistant' ? '#10a37f' : '#5436DA',
                width: 36,
                height: 36,
              }}
            >
              {message.role === 'assistant' ? <SmartToyIcon /> : <PersonIcon />}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              {message.role === 'assistant' ? (
                // Use the new MarkdownRenderer component
                <MarkdownRenderer content={message.content} />
              ) : (
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: '#ECECF1' }}>
                  {message.content}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, backgroundColor: '#444654', borderRadius: 1 }}>
            <Avatar sx={{ bgcolor: '#10a37f' }}>
              <SmartToyIcon />
            </Avatar>
            <CircularProgress size={20} sx={{ color: '#10a37f' }} />
          </Box>
        )}
        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </Container>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          backgroundColor: '#343541',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // Changed from onKeyDown for consistency? Check original intent.
              placeholder="Send a message..."
              variant="outlined"
              size="small" // Added size small for consistency with example
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#40414F',
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&.Mui-focused fieldset': { borderColor: '#10a37f' },
                },
                '& .MuiOutlinedInput-input::placeholder': { color: 'rgba(255,255,255,0.5)' },
              }}
            />
            <IconButton
              type="submit"
              disabled={!input.trim()}
              sx={{
                alignSelf: 'flex-end', // Align button to bottom when TextField grows
                color: input.trim() ? '#10a37f' : 'rgba(255,255,255,0.3)',
                mb: 0.5, // Align with small TextField
                '&:hover': { backgroundColor: 'rgba(16, 163, 127, 0.1)' },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default ChatInterface;