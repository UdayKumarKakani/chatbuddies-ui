
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, PlusCircle, Image, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onUploadImage: (file: File) => void;
  onUploadDocument: (file: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onUploadImage,
  onUploadDocument
}) => {
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadImage(file);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadDocument(file);
      if (documentInputRef.current) {
        documentInputRef.current.value = '';
      }
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="relative p-4 border-t border-gray-100">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={toggleOptions}
            className="h-10 w-10 rounded-full flex items-center justify-center bg-chatbot-secondary hover:bg-gray-200 transition-colors"
          >
            <PlusCircle size={20} className="text-chatbot-accent" />
          </button>
          
          <AnimatedOptions 
            show={showOptions} 
            onClickOutside={() => setShowOptions(false)}
            onImageClick={() => imageInputRef.current?.click()}
            onDocumentClick={() => documentInputRef.current?.click()}
          />
          
          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          
          <input
            type="file"
            ref={documentInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleDocumentUpload}
          />
        </div>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 py-2 px-4 bg-chatbot-secondary rounded-full focus:outline-none focus:ring-2 focus:ring-chatbot-accent/30 transition-all"
        />
        
        <button
          type="submit"
          disabled={!message.trim()}
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center transition-all",
            message.trim() 
              ? "bg-chatbot-accent text-white" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

interface AnimatedOptionsProps {
  show: boolean;
  onClickOutside: () => void;
  onImageClick: () => void;
  onDocumentClick: () => void;
}

const AnimatedOptions: React.FC<AnimatedOptionsProps> = ({ 
  show, 
  onClickOutside,
  onImageClick,
  onDocumentClick
}) => {
  const options = [
    { icon: <Image size={18} />, label: "Image", onClick: onImageClick },
    { icon: <FileText size={18} />, label: "Document", onClick: onDocumentClick }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const optionsContainer = document.getElementById('chatbot-options');
      const plusButton = document.getElementById('plus-button');
      
      if (
        optionsContainer && 
        !optionsContainer.contains(target) && 
        plusButton && 
        !plusButton.contains(target)
      ) {
        onClickOutside();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClickOutside]);

  if (!show) return null;

  return (
    <motion.div
      id="chatbot-options"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-14 left-0 bg-white rounded-lg shadow-lg py-2 w-36 z-10 chatbot-glass"
    >
      {options.map((option, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={option.onClick}
          className="flex items-center gap-2 w-full px-3 py-2 hover:bg-chatbot-secondary text-left text-sm"
        >
          <span className="text-chatbot-accent">{option.icon}</span>
          <span>{option.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ChatInput;
