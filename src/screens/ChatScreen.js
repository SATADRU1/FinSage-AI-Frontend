import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MessageItem from '../components/MessageItem';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [deepResearch, setDeepResearch] = useState(false);
  const flatListRef = useRef(null);
  const { user, logout } = useAuth();

  const examplePrompts = [
    "Explain quantum computing in simple terms",
    "What are the best investment strategies for beginners?",
    "How do I create a balanced budget?",
    "Help me understand stock market trends"
  ];

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout },
      ]
    );
  };

  const handleSendMessage = async (messageText = inputText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:8000/query', {
        query: messageText,
        deep_search: deepResearch
      });

      const assistantContent = response.data.answer?.answer || 
                              response.data.answer?.content ||
                              "I couldn't generate a response.";

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExamplePress = (prompt) => {
    handleSendMessage(prompt);
  };

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessage = ({ item }) => (
    <MessageItem message={item} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.welcomeContainer}>
        <Ionicons name="chatbubbles-outline" size={64} color="#8b5cf6" />
        <Text style={styles.welcomeTitle}>How can I help you today?</Text>
        <Text style={styles.welcomeSubtitle}>
          Ask me anything, and I'll do my best to assist you!
        </Text>
        
        <View style={styles.examplePrompts}>
          {examplePrompts.map((prompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.examplePrompt}
              onPress={() => handleExamplePress(prompt)}
            >
              <Text style={styles.examplePromptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isTyping) return null;
    
    return (
      <View style={styles.typingIndicator}>
        <View style={styles.aiAvatar}>
          <Ionicons name="robot-outline" size={20} color="#fff" />
        </View>
        <ActivityIndicator size="small" color="#8b5cf6" />
        <Text style={styles.typingText}>AI is typing...</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <LinearGradient
        colors={['#1e1e2e', '#2d2d3d']}
        style={styles.gradient}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Send a message..."
              placeholderTextColor="#999"
              multiline
              maxLength={1000}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={inputText.trim() ? "#fff" : "#666"} 
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[styles.deepResearchButton, deepResearch && styles.deepResearchActive]}
            onPress={() => setDeepResearch(!deepResearch)}
          >
            <Text style={[styles.deepResearchText, deepResearch && styles.deepResearchTextActive]}>
              Deep research mode
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  logoutButton: {
    marginRight: 16,
    padding: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    flexGrow: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 32,
  },
  examplePrompts: {
    gap: 12,
    width: '100%',
  },
  examplePrompt: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 16,
  },
  examplePromptText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingText: {
    color: '#ccc',
    fontSize: 14,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6d28d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  deepResearchButton: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  deepResearchActive: {
    backgroundColor: 'rgba(28, 100, 242, 0.2)',
    borderColor: 'rgba(28, 100, 242, 0.5)',
  },
  deepResearchText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  deepResearchTextActive: {
    color: '#88aaff',
  },
});

export default ChatScreen;