
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessage, { MessageType } from './ChatMessage';
import ChatHistory, { ChatHistoryItem } from './ChatHistory';

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
}

export interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample chat history
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    {
      id: '1',
      title: 'Product questions',
      date: new Date(Date.now() - 86400000), // yesterday
      preview: 'Can you tell me more about your pricing?'
    },
    {
      id: '2',
      title: 'Technical support',
      date: new Date(Date.now() - 172800000), // 2 days ago
      preview: 'I need help setting up my account'
    }
  ]);

  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      text: text,
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: `msg-${Date.now()}-${Math.random()}`,
        text: "I've received your message. This is a simulated response as the actual processing will be handled by the backend API.",
        type: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleUploadImage = (file: File) => {
    const message = `Uploaded image: ${file.name}`;
    handleSendMessage(message);
  };

  const handleUploadDocument = (file: File) => {
    const message = `Uploaded document: ${file.name}`;
    handleSendMessage(message);
  };

  const handleSelectChat = (id: string) => {
    const selectedChat = chatHistory.find(chat => chat.id === id);
    if (selectedChat) {
      setMessages([
        {
          id: `history-${Date.now()}`,
          text: selectedChat.preview,
          type: 'user',
          timestamp: selectedChat.date
        },
        {
          id: `history-response-${Date.now()}`,
          text: "This is a historical conversation. The actual messages would be loaded from your backend.",
          type: 'bot',
          timestamp: new Date(selectedChat.date.getTime() + 60000) // 1 minute later
        }
      ]);
      setIsHistoryOpen(false);
    }
  };

  const handleStartNewChat = () => {
    setMessages([]);
    setIsHistoryOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Add welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hello! How can I assist you today?",
        type: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed z-40 chatbot-glass overflow-hidden",
        isMaximized
          ? "inset-4 rounded-xl"
          : "bottom-24 right-6 w-96 h-[600px] max-h-[80vh] rounded-2xl"
      )}
    >
      <div className="flex flex-col h-full">
        <ChatHeader 
          title="Support Chat"
          onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
          onClose={onClose}
          onToggleMaximize={() => setIsMaximized(!isMaximized)}
          isMaximized={isMaximized}
        />
        
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence>
            {isHistoryOpen && (
              <ChatHistory 
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                history={chatHistory}
                onSelectChat={handleSelectChat}
                onStartNewChat={handleStartNewChat}
              />
            )}
          </AnimatePresence>
          
          <div className="h-full overflow-y-auto p-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  type={message.type}
                  timestamp={message.timestamp}
                  isLast={index === messages.length - 1}
                />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          onUploadImage={handleUploadImage}
          onUploadDocument={handleUploadDocument}
        />
      </div>
    </motion.div>
  );
};

export default ChatInterface;
