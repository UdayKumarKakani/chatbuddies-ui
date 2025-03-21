
import React from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatbotIcon: React.FC<ChatbotIconProps> = ({ isOpen, onClick }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg chatbot-icon-button",
        isOpen 
          ? "bg-chatbot-accent text-white" 
          : "bg-chatbot-accent text-white"
      )}
      aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isOpen ? 'close' : 'open'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default ChatbotIcon;
