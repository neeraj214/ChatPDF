import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import Lottie from 'lottie-react';

import Dropzone from '../components/uploader/Dropzone';
import FilePreview from '../components/uploader/FilePreview';
import ProgressBar from '../components/uploader/ProgressBar';

import { uploadPdf } from '../services/api';

import uploadAnimation from '../assets/animations/upload-animation.json'; // Changed from processing-animation.json
import successAnimation from '../assets/animations/success-animation.json';

const UploadPage = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null); // Stores the File object
  const [uploadError, setUploadError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileId, setFileId] = useState(null);
  const navigate = useNavigate();

  const resetState = () => {
    setUploading(false);
    setUploadProgress(0);
    setUploadedFile(null);
    setUploadError(null);
    setShowSuccess(false);
    setFileId(null);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      resetState();
      setUploadedFile(file); // Store the full file object for preview
      setUploading(true);
      
      try {
        const response = await uploadPdf(file, (progress) => {
          setUploadProgress(progress);
        });

        // The response handling remains similar
        if (response) {
          toast.success(response.message || 'PDF uploaded successfully!');
          setFileId(response.fileId);
          setShowSuccess(true);
          setUploading(false);
        }
      } catch (error) {
        console.error('Upload error:', error);
        const message = error.message || 'An error occurred during upload.';
        setUploadError(message);
        toast.error(message);
        setUploading(false);
      }
    }
  }, []);

  const handleRemoveFile = () => {
    resetState();
  };

  const handleNavigateToChat = () => {
    if (fileId && !uploading && showSuccess) {
      navigate(`/chat?fileId=${fileId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-black pt-20"
    >
      <motion.div 
        className="w-full max-w-2xl bg-white/30 dark:bg-gray-800/50 backdrop-filter backdrop-blur-lg shadow-2xl rounded-2xl p-6 md:p-10 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">Upload Your PDF</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm md:text-base">Securely upload your document to start chatting with our AI.</p>

        {!uploadedFile && !uploading && <Dropzone onDrop={onDrop} uploading={uploading} />}

        <AnimatePresence>
          {uploadedFile && (
            <motion.div key="fileInfoContainer" className='flex flex-col items-center'>
              {!uploading && !showSuccess && !uploadError && (
                 <Dropzone onDrop={onDrop} uploading={uploading} />
              )}
              {uploading && !showSuccess && (
                <motion.div
                  key="uploadingState"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center space-y-4 my-6"
                >
                  <Lottie animationData={uploadAnimation} loop={true} className="w-28 h-28 md:w-36 md:h-36" /> {/* Changed from processingAnimation */}
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Processing: {uploadedFile.name}</p>
                  <ProgressBar progress={uploadProgress} />
                </motion.div>
              )}

              {showSuccess && (
                <motion.div
                  key="successState"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center space-y-3 my-6"
                >
                  <Lottie animationData={successAnimation} loop={false} className="w-28 h-28 md:w-36 md:h-36" />
                  <p className="text-xl font-semibold text-green-600 dark:text-green-400">Upload Successful!</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{uploadedFile.name}</p>
                </motion.div>
              )}

              {uploadError && (
                <motion.div
                  key="errorState"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center space-y-3 my-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg"
                >
                  <FiAlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400" />
                  <p className="text-lg font-medium text-red-600 dark:text-red-400">Upload Failed</p>
                  <p className="text-sm text-red-500 dark:text-red-300 text-center">{uploadError}</p>
                  <button 
                    onClick={handleRemoveFile} 
                    className='mt-2 px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm'
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
              
              {/* Show FilePreview if a file is selected but not yet successfully uploaded or errored out, or if success/error shown */} 
              {(uploadedFile && !uploading && !showSuccess && !uploadError) && (
                <FilePreview file={uploadedFile} onRemove={handleRemoveFile} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {showSuccess && uploadedFile && (
          <motion.button
            onClick={handleNavigateToChat}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform active:scale-95"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCheckCircle className="inline mr-2 -mt-0.5" /> Start Chatting
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UploadPage;