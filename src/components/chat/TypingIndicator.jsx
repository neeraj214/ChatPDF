import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu } from 'react-icons/fi';

const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: "0%", opacity: 0.5 },
    animate: {
      y: ["0%", "-50%", "0%"],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-1.5 p-3 bg-slate-100/70 dark:bg-slate-700/70 rounded-xl shadow-md max-w-max ml-2 md:ml-3 mb-2"
    >
      <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
        <FiCpu className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </div>
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        style={{ width: '6px', height: '6px', backgroundColor: 'currentColor', borderRadius: '50%' }}
        className="text-slate-500 dark:text-slate-400"
      />
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        style={{ width: '6px', height: '6px', backgroundColor: 'currentColor', borderRadius: '50%' }}
        className="text-slate-500 dark:text-slate-400"
        transition={{ delay: 0.2, ...dotVariants.animate.transition }}
      />
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        style={{ width: '6px', height: '6px', backgroundColor: 'currentColor', borderRadius: '50%' }}
        className="text-slate-500 dark:text-slate-400"
        transition={{ delay: 0.4, ...dotVariants.animate.transition }}
      />
    </motion.div>
  );
};

export default TypingIndicator;