
import React from 'react';
import { motion } from 'framer-motion';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4"
          >
            <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
              Introducing
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Seamless Communication <br className="hidden sm:block" />
            <span className="text-chatbot-accent">Intelligent Support</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Experience our innovative chatbot solution that combines beautiful design
            with powerful functionality to transform how you interact with your customers.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-chatbot-accent text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors">
              Get Started
            </button>
            <button className="bg-chatbot-secondary text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Learn More
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4"
        >
          <div className="bg-chatbot-secondary rounded-2xl p-8 shadow-lg transform rotate-1">
            <div className="bg-white rounded-xl shadow-sm h-72 flex items-center justify-center">
              <p className="text-xl text-chatbot-muted">Interactive Demo Illustration</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 mt-32 bg-chatbot-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Designed For Exceptional Experiences</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our chatbot seamlessly combines powerful functionality with an elegant, intuitive interface.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Chat History",
                description: "Access previous conversations with ease, ensuring continuity and context for every interaction."
              },
              {
                title: "File Sharing",
                description: "Share images and documents directly within the chat for seamless communication."
              },
              {
                title: "Responsive Design",
                description: "Enjoy a perfect experience on any device with our adaptable, responsive interface."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-chatbot-muted">
            © {new Date().getFullYear()} ChatBot Interface. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default Index;
