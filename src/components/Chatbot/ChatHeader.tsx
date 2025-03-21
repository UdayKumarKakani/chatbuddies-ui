
import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  title: string;
  onToggleHistory: () => void;
  onClose: () => void;
  onToggleMaximize: () => void;
  isMaximized: boolean;
  showHistoryButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  onToggleHistory,
  onClose,
  onToggleMaximize,
  isMaximized,
  showHistoryButton = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between p-4 border-b border-gray-100"
    >
      <div className="flex items-center gap-2">
        {showHistoryButton && (
          <button
            onClick={onToggleHistory}
            className="p-1 rounded-full hover:bg-chatbot-secondary transition-colors"
            aria-label="Toggle chat history"
          >
            <Menu size={18} />
          </button>
        )}
        <h2 className="font-medium">{title}</h2>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={onToggleMaximize}
          className="p-1 rounded-full hover:bg-chatbot-secondary transition-colors mr-1"
          aria-label={isMaximized ? "Minimize chatbot" : "Maximize chatbot"}
        >
          {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
        
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-chatbot-secondary transition-colors"
          aria-label="Close chatbot"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
