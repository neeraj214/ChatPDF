console.log('Starting server...');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

console.log('Dependencies loaded');
const app = express();
const port = process.env.PORT || 5000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

console.log('Middleware configured');

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Root route to show server status
app.get('/', (req, res) => {
  res.send('<h1>ChatPDF API Server</h1><p>Status: Running</p><p>Endpoints: /api/upload, /api/chat, /api/health</p>');
});

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use absolute path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    console.log('Multer filtering file:', file.originalname, 'mimetype:', file.mimetype);
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Mock database for files
const fileDatabase = {};

// Routes
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  console.log('Upload request received');
  if (!req.file) {
    console.error('No file in request');
    return res.status(400).json({ message: 'No file uploaded' });
  }

  console.log('File received:', req.file.originalname, 'size:', req.file.size);

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    console.log('File read from disk successfully');
    let text = '';
    
    try {
      const data = await pdf(dataBuffer);
      text = data.text;
      console.log('PDF parsed successfully, text length:', text.length);
    } catch (pdfError) {
      console.warn('pdf-parse failed:', pdfError.message);
      text = 'Text extraction failed for this document.';
    }
    
    const fileId = req.file.filename;
    fileDatabase[fileId] = {
      path: req.file.path,
      text: text,
      name: req.file.originalname
    };

    console.log('File stored in database with ID:', fileId);
    res.json({ 
      success: true, 
      message: 'File uploaded successfully', 
      fileId: fileId 
    });
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
});

app.post('/api/chat', async (req, res) => {
  const { fileId, question } = req.body;
  const fileData = fileDatabase[fileId];

  if (!fileData) {
    return res.status(404).json({ message: 'File not found' });
  }

  try {
    console.log(`Processing AI question for file: ${fileData.name}`);
    
    // Construct prompt with context from PDF
    const prompt = `
      You are an AI assistant helping a user understand their PDF document.
      Document Name: ${fileData.name}
      Document Content: 
      ---
      ${fileData.text.substring(0, 30000)} 
      ---
      User Question: ${question}
      
      Instructions:
      1. Use the provided document content to answer the question.
      2. If the answer is not in the document, say you don't know based on the document.
      3. Keep the answer concise and helpful.
      4. If possible, mention which part of the document you are referring to.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    // Mock citations for now (actual RAG would compute these)
    const citations = [
      { page: 1, text: "Extracted from the uploaded PDF document." }
    ];

    res.json({ 
      answer: answer,
      citations: citations
    });
  } catch (error) {
    console.error('Gemini AI Error:', error);
    res.status(500).json({ 
      message: 'Error generating AI response',
      error: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
