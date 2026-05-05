import axios from 'axios';

const API_BASE_URL = '/api'; // Replace with your actual backend API base URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Uploads a PDF file.
 * @param {File} file - The PDF file to upload.
 * @param {Function} onProgress - Callback for upload progress (0-100).
 * @returns {Promise<object>} The API response.
 */
export const uploadPdf = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('pdf', file);

  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error.response || error.message);
    throw error.response?.data || { message: 'Failed to upload PDF' };
  }
};

/**
 * Sends a question to the chat API for a given file.
 * @param {string} fileId - The ID of the uploaded PDF file.
 * @param {string} question - The question to ask.
 * @returns {Promise<object>} The API response containing the answer.
 */
export const askQuestion = async (fileId, question) => {
  try {
    const response = await apiClient.post('/chat', { fileId, question });
    return response.data;
  } catch (error) {
    console.error('Error asking question:', error.response || error.message);
    throw error.response?.data || { message: 'Failed to get answer from AI' };
  }
};

// Example of how to use these functions in components:
/*
import { uploadPdf, askQuestion } from './services/api';

// In UploadPage.jsx
const handleFileUpload = async (file) => {
  try {
    const result = await uploadPdf(file);
    toast.success(result.message);
    // navigate to chat page with result.fileId
  } catch (error) {
    toast.error(error.message);
  }
};

// In ChatPage.jsx
const handleSendMessage = async (questionText) => {
  try {
    const result = await askQuestion(fileId, questionText);
    // add AI message to chat
  } catch (error) {
    toast.error(error.message);
  }
};
*/