import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCpu, FiBookOpen } from 'react-icons/fi'; // User, AI and Book icons

const ChatMessage = ({ id, text, isUser, timestamp, citations, isError }) => {
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
            <FiCpu className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        )}
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold ml-2 md:ml-3 shadow-md">
            <FiUser className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl shadow-md break-words ${isUser
              ? 'bg-blue-600 dark:bg-blue-500 text-white rounded-br-none'
              : isError
                ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-bl-none'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none'
            }`}
        >
          <p className="text-sm md:text-[0.925rem] leading-relaxed whitespace-pre-wrap">{text}</p>
          
          {/* Citations Section */}
          {!isUser && citations && citations.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-600">
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1 uppercase tracking-wider">
                <FiBookOpen size={10} /> Sources
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {citations.map((cite, idx) => (
                  <div 
                    key={idx} 
                    className="text-[9px] px-2 py-0.5 bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 rounded border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm"
                    title={cite.text}
                  >
                    Page {cite.page}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Timestamp */}
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