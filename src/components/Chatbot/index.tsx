
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatbotIcon from './ChatbotIcon';
import ChatInterface from './ChatInterface';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatbotIcon isOpen={isOpen} onClick={toggleChatbot} />
      <AnimatePresence>
        {isOpen && <ChatInterface isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
