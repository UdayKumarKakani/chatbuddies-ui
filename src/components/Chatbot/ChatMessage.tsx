
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';

export type MessageType = 'user' | 'bot';

interface ChatMessageProps {
  message: string;
  type: MessageType;
  timestamp: Date;
  isLast?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  type, 
  timestamp,
  isLast = false
}) => {
  const isUser = type === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full max-w-full mb-4 chatbot-message-transition",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex gap-3 max-w-[80%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "flex-shrink-0 flex items-start justify-center h-8 w-8 rounded-full",
          isUser ? "bg-chatbot-accent text-white" : "bg-chatbot-secondary text-chatbot-accent"
        )}>
          {isUser ? (
            <User size={16} className="mt-[6px]" />
          ) : (
            <Bot size={16} className="mt-[6px]" />
          )}
        </div>
        
        <div className="flex flex-col">
          <div className={cn(
            "px-4 py-3 rounded-xl break-words",
            isUser 
              ? "bg-chatbot-accent text-white rounded-tr-none" 
              : "bg-chatbot-secondary text-foreground rounded-tl-none"
          )}>
            <p className="text-sm">{message}</p>
          </div>
          <span className={cn(
            "text-xs mt-1 text-chatbot-muted",
            isUser ? "text-right mr-1" : "text-left ml-1"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
