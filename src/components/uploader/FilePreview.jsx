import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiXCircle } from 'react-icons/fi';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mt-6 p-4 bg-white/10 dark:bg-gray-800/30 backdrop-blur-md shadow-lg rounded-lg flex items-center justify-between space-x-3"
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        <FiFileText className="w-8 h-8 text-blue-500 dark:text-blue-400 flex-shrink-0" />
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>
      <motion.button
        onClick={onRemove}
        className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        title="Remove file"
      >
        <FiXCircle className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default FilePreview;