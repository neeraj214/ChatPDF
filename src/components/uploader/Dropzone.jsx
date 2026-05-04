import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUploadCloud } from 'react-icons/fi';

const Dropzone = ({ onDrop, uploading }) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    disabled: uploading,
  });

  const variants = {
    initial: { borderColor: 'rgba(107, 114, 128, 0.3)', scale: 1 }, // gray-400/30
    active: { borderColor: 'rgba(59, 130, 246, 0.7)', scale: 1.03 }, // blue-500/70
    accept: { borderColor: 'rgba(34, 197, 94, 0.7)', scale: 1.03 }, // green-500/70
    reject: { borderColor: 'rgba(239, 68, 68, 0.7)', scale: 1.03 }, // red-500/70
  };

  const getBorderColor = () => {
    if (isDragAccept) return 'accept';
    if (isDragReject) return 'reject';
    if (isDragActive) return 'active';
    return 'initial';
  };

  return (
    <motion.div
      {...getRootProps()}
      variants={variants}
      initial="initial"
      animate={getBorderColor()}
      whileHover={!uploading ? { scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' } : {}}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={`w-full p-8 md:p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ease-in-out 
        flex flex-col items-center justify-center text-center 
        bg-white/5 dark:bg-gray-800/20 backdrop-blur-md shadow-lg hover:shadow-xl`}
    >
      <input {...getInputProps()} />
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <FiUploadCloud className="w-12 h-12 md:w-16 md:h-16 text-blue-500 dark:text-blue-400 mb-4" />
      </motion.div>
      <motion.p 
        className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {isDragActive
          ? isDragAccept ? 'Drop PDF to Upload!' : 'Invalid file type!' 
          : 'Drag & drop your PDF here, or click to select'}
      </motion.p>
      <motion.p 
        className="text-sm text-gray-500 dark:text-gray-400"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        PDF files only, up to 10MB.
      </motion.p>
      {!isDragActive && (
        <motion.button
          type="button"
          className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          disabled={uploading}
        >
          {uploading ? 'Processing...' : 'Select File'}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Dropzone;