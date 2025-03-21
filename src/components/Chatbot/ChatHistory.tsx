
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatHistoryItem {
  id: string;
  title: string;
  date: Date;
  preview: string;
}

interface ChatHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: ChatHistoryItem[];
  onSelectChat: (id: string) => void;
  onStartNewChat: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  isOpen,
  onClose,
  history,
  onSelectChat,
  onStartNewChat
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 left-0 h-full w-72 bg-white border-r border-gray-200 chatbot-glass z-10"
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-lg">Chat History</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Close history"
        >
          <X size={18} />
        </button>
      </div>
      
      <button
        onClick={onStartNewChat}
        className="w-full py-3 px-4 flex items-center gap-2 hover:bg-chatbot-secondary transition-colors border-b border-gray-100"
      >
        <div className="h-8 w-8 rounded-full bg-chatbot-accent text-white flex items-center justify-center">
          <MessageSquare size={16} />
        </div>
        <span className="font-medium">Start New Chat</span>
      </button>
      
      <div className="overflow-y-auto h-[calc(100%-120px)]">
        <AnimatePresence>
          {history.length > 0 ? (
            <ul>
              {history.map((chat) => (
                <motion.li
                  key={chat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => onSelectChat(chat.id)}
                    className="w-full text-left py-3 px-4 border-b border-gray-100 hover:bg-chatbot-secondary transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-chatbot-secondary text-chatbot-accent flex items-center justify-center flex-shrink-0">
                        <Clock size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-medium text-sm truncate">{chat.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-chatbot-muted mt-1">
                          <Calendar size={12} />
                          <span>
                            {chat.date.toLocaleDateString(undefined, { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-chatbot-muted mt-1 truncate">{chat.preview}</p>
                      </div>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 px-4 text-center text-chatbot-muted"
            >
              <p>No chat history yet</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatHistory;
