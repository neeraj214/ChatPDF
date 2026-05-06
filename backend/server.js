console.log('Starting server...');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log('Dependencies loaded');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('Middleware configured');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
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
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    let text = '';
    
    try {
      const data = await pdf(dataBuffer);
      text = data.text;
    } catch (pdfError) {
      console.warn('pdf-parse failed, using empty text fallback:', pdfError.message);
      // Fallback: file is uploaded but text extraction failed
    }
    
    const fileId = req.file.filename;
    fileDatabase[fileId] = {
      path: req.file.path,
      text: text || 'Text extraction failed for this document.',
      name: req.file.originalname
    };

    res.json({ 
      success: true, 
      message: 'File uploaded successfully', 
      fileId: fileId 
    });
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ message: `Error processing PDF: ${error.message}` });
  }
});

app.post('/api/chat', (req, res) => {
  const { fileId, question } = req.body;
  const fileData = fileDatabase[fileId];

  if (!fileData) {
    return res.status(404).json({ message: 'File not found' });
  }

  // Mock AI response logic with source citations
  const answer = `Based on the document "${fileData.name}", here is what I found regarding your question "${question}": [This is a mock response from the backend AI].`;
  const citations = [
    { page: 1, text: "Snippet from page 1 relevant to the answer..." },
    { page: 2, text: "Another snippet from page 2..." }
  ];

  res.json({ 
    answer: answer,
    citations: citations
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
