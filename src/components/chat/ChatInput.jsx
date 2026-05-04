import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiSmile } from 'react-icons/fi'; // Send and Emoji icons

const ChatInput = ({ onSendMessage, isSending }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isSending) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'; // Reset height to recalculate
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]); // Re-run when message changes

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-end p-3 md:p-4 space-x-2 md:space-x-3 bg-transparent border-t border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <motion.button
        type="button"
        className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Add emoji"
        // onClick={() => {/* TODO: Implement emoji picker */}}
      >
        <FiSmile className="w-5 h-5 md:w-[22px] md:h-[22px]" />
      </motion.button>
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Type your message... (Shift+Enter for new line)"
        className="flex-grow py-2.5 px-3.5 bg-slate-100/70 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 rounded-xl resize-none max-h-40 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
        rows={1}
        disabled={isSending}
        style={{ overflowY: 'auto' }} // Ensure scrollbar appears if max-h is reached
      />
      <motion.button
        type="submit"
        disabled={isSending || !message.trim()}
        className={`p-2.5 rounded-full text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${isSending || !message.trim() ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-blue-500'}`}
        whileHover={!(isSending || !message.trim()) ? { scale: 1.1 } : {}}
        whileTap={!(isSending || !message.trim()) ? { scale: 0.95 } : {}}
        aria-label="Send message"
      >
        {isSending ? (
          <svg className="animate-spin h-5 w-5 md:h-[22px] md:w-[22px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <FiSend className="w-5 h-5 md:w-[22px] md:h-[22px]" />
        )}
      </motion.button>
    </motion.form>
  );
};

export default ChatInput;