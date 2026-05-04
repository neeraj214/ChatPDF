import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiPaperclip, FiRefreshCw, FiGrid, FiAlertCircle } from 'react-icons/fi'; // Added more icons
import Lottie from 'lottie-react';

import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';
import thinkingAnimation from '../assets/animations/chat-thinking.json'; // Using existing animation

// Mock API for fetching initial document info and sending messages
const mockApi = {
  fetchDocumentInfo: async (fileId) => {
    console.log(`Fetching info for fileId: ${fileId}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    if (!fileId || fileId.startsWith('error')) {
      return Promise.reject({ message: 'Document not found or invalid ID.' });
    }
    return Promise.resolve({
      fileName: fileId.replace('mock-file-id-', '') || 'Uploaded Document.pdf',
      initialMessage: `Hello! I'm ready to answer questions about ${fileId.replace('mock-file-id-', '') || 'your document'}. How can I help you?`,
    });
  },
  sendMessageToBot: async (message, fileId) => {
    console.log(`Sending message about ${fileId}: ${message}`);
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000)); // Simulate bot thinking time
    // Simple echo bot for now, or more complex logic
    let botResponse = `I received your message: "${message}". `; 
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      botResponse += "Hi there! How can I assist you further today?";
    } else if (message.toLowerCase().includes('how are you')) {
      botResponse += "I'm doing great, thanks for asking! Ready to help with your PDF.";
    } else if (message.toLowerCase().includes('help')) {
      botResponse += "Sure, I can help. Ask me anything about the document!";
    } else {
      botResponse += "I'm still learning, but I'll do my best to answer.";
    }
    return Promise.resolve({ text: botResponse });
  },
};

const ChatPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // For future feature panel
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For initial document load
  const [docInfo, setDocInfo] = useState({ fileName: 'Document', initialMessage: '' });
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const fileId = new URLSearchParams(location.search).get('fileId');

  useEffect(() => {
    if (!fileId) {
      setError('No file selected. Please upload a PDF first.');
      setIsLoading(false);
      return;
    }

    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const info = await mockApi.fetchDocumentInfo(fileId);
        setDocInfo(info);
        setMessages([
          { id: Date.now(), text: info.initialMessage, isUser: false, timestamp: Date.now() },
        ]);
      } catch (err) {
        setError(err.message || 'Failed to load document information.');
        setMessages([]); // Clear messages on error
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [fileId, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isSending) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsSending(true);

    try {
      const response = await mockApi.sendMessageToBot(messageText, fileId);
      const botMessage = {
        id: Date.now() + 1, // Ensure unique ID
        text: response.text,
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: Date.now(),
        isError: true, // You can use this to style error messages differently
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };
  
  const handleRetryLoad = () => {
    if (!fileId) {
        navigate('/upload');
        return;
    }
    // Effectively re-triggers the initial data load
    // A more robust way might involve a dedicated function or state update
    // For simplicity, navigating to the same URL with a cache-busting param or just re-setting loading state
    setIsLoading(true);
    setError(null);
    // Re-call the effect logic by changing a dependency or re-navigating (less ideal)
    // This is a simplified retry, a real app might have a more direct fetch function call here.
    mockApi.fetchDocumentInfo(fileId)
      .then(info => {
        setDocInfo(info);
        setMessages([
          { id: Date.now(), text: info.initialMessage, isUser: false, timestamp: Date.now() },
        ]);
      })
      .catch(err => {
        setError(err.message || 'Failed to load document information.');
        setMessages([]);
      })
      .finally(() => setIsLoading(false));
  };

    return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-800 dark:via-slate-900 dark:to-black items-center justify-center"
    >
      <div className="w-full max-w-3xl h-full md:h-[calc(100%-4rem)] md:max-h-[800px] flex flex-col bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl shadow-2xl rounded-none md:rounded-2xl my-0 md:my-8">
        {/* Header */}
        <header className="flex items-center justify-between p-4 md:p-5 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md md:rounded-t-2xl">
          <motion.button
            onClick={() => navigate('/upload')}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors"
            whileHover={{ scale: 1.1, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Go back to upload"
          >
            <FiArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <div className="flex items-center flex-1 min-w-0 justify-center px-2">
            <FiPaperclip className="w-4 h-4 md:w-5 md:h-5 text-slate-500 dark:text-slate-400 mr-2 flex-shrink-0" />
            <h1 className="text-base md:text-lg font-semibold text-slate-800 dark:text-white truncate">
              {isLoading ? 'Analyzing Document...' : error ? 'Error' : docInfo.fileName}
            </h1>
          </div>
          <motion.button
              onClick={handleRetryLoad}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Reload document or refresh chat"
          >
            <FiRefreshCw className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <motion.button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 rounded-full transition-colors ml-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle features panel"
          >
            <FiGrid className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </header>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500 dark:hover:scrollbar-thumb-slate-500">
          <AnimatePresence initial={false}>
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center h-full text-slate-600 dark:text-slate-400 py-10"
              >
                <Lottie animationData={thinkingAnimation} loop={true} style={{ width: 120, height: 120 }} />
                <p className="mt-4 text-lg font-medium">Analyzing your document...</p>
                <p className="text-sm text-slate-500">Please wait a moment.</p>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center"
              >
                <FiAlertCircle className="w-12 h-12 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong.</h2>
                <p className="mb-6">{error}</p>
                <button 
                  onClick={handleRetryLoad}
                  className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <FiRefreshCw className="mr-2" />
                  Try Again
                </button>
              </motion.div>
            ) : (
              messages.map((msg) => (
                <ChatMessage key={msg.id} {...msg} />
              ))
            )}
          </AnimatePresence>
          {isSending && <TypingIndicator />} 
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-5 border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md md:rounded-b-2xl">
          <ChatInput onSendMessage={handleSendMessage} isSending={isSending} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPage;