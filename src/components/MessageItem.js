import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';

const MessageItem = ({ message }) => {
  const isUser = message.role === 'user';

  const markdownStyles = {
    body: {
      color: '#fff',
      fontSize: 16,
      lineHeight: 24,
    },
    heading1: {
      color: '#fff',
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 8,
    },
    heading2: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 6,
    },
    heading3: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    paragraph: {
      color: '#fff',
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 8,
    },
    strong: {
      color: '#fff',
      fontWeight: '700',
    },
    em: {
      color: '#fff',
      fontStyle: 'italic',
    },
    code_inline: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#f8f8f2',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 3,
      fontFamily: 'monospace',
    },
    code_block: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      color: '#f8f8f2',
      padding: 12,
      borderRadius: 6,
      fontFamily: 'monospace',
      marginVertical: 8,
    },
    blockquote: {
      backgroundColor: 'rgba(16, 163, 127, 0.1)',
      borderLeftWidth: 4,
      borderLeftColor: '#10a37f',
      paddingLeft: 12,
      paddingVertical: 8,
      marginVertical: 8,
    },
    list_item: {
      color: '#fff',
      fontSize: 16,
      lineHeight: 24,
    },
    bullet_list: {
      marginVertical: 8,
    },
    ordered_list: {
      marginVertical: 8,
    },
  };

  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
      <View style={[styles.avatar, isUser ? styles.userAvatar : styles.aiAvatar]}>
        <Ionicons 
          name={isUser ? "person" : "robot-outline"} 
          size={20} 
          color="#fff" 
        />
      </View>
      <View style={styles.messageContent}>
        {isUser ? (
          <Text style={styles.messageText}>{message.content}</Text>
        ) : (
          <Markdown style={markdownStyles}>
            {message.content}
          </Markdown>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    backgroundColor: '#6d28d9',
  },
  aiAvatar: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  messageContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default MessageItem;