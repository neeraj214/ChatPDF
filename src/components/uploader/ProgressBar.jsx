import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  if (progress === null || progress < 0 || progress > 100) return null;

  return (
    <div className="w-full max-w-md mt-4">
      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <p className="text-xs text-right text-gray-600 dark:text-gray-400 mt-1">
        {Math.round(progress)}%
      </p>
    </div>
  );
};

export default ProgressBar;