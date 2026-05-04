import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCpu } from 'react-icons/fi'; // User and AI icons

const ChatMessage = ({ message }) => {
  const { text, sender, timestamp, avatar } = message;
  const isUser = sender === 'user';

  const formatTimestamp = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      layout
      className={`flex items-end w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start max-w-[80%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold mr-2 md:mr-3 shadow-md">
            {avatar || <FiCpu className="w-4 h-4 md:w-5 md:h-5" />}
          </div>
        )}
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold ml-2 md:ml-3 shadow-md">
            {avatar || <FiUser className="w-4 h-4 md:w-5 md:h-5" />}
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl shadow-md break-words ${isUser
              ? 'bg-blue-600 dark:bg-blue-500 text-white rounded-br-none'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none'
            }`}
        >
          <p className="text-sm md:text-[0.925rem] leading-relaxed whitespace-pre-wrap">{text}</p>
        </div>
      </div>
      {/* Timestamp - Placed outside the inner flex to align with the edge of the screen more easily */}
      {timestamp && (
        <span
          className={`text-xs text-slate-400 dark:text-slate-500 mt-1 ${isUser ? 'mr-12 md:mr-[44px]' : 'ml-12 md:ml-[48px]'}`}
          style={{ alignSelf: 'flex-end', whiteSpace: 'nowrap' }}
        >
          {formatTimestamp(timestamp)}
        </span>
      )}
    </motion.div>
  );
};

export default ChatMessage;