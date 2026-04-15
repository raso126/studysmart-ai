import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { generateNotes, NoteGenerationOptions } from './ai-service';
import  extractTextFromPDF  from './pdf-utils';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'StudySmart AI Backend is running' });
});

// Generate notes endpoint
app.post('/generate-notes', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse options from request body
    const options: NoteGenerationOptions = {
      length: req.body.length || 'medium',
      format: req.body.format || 'bullets',
      includeQuestions: req.body.includeQuestions === 'true',
    };

    // Extract text from PDF
    const text = await extractTextFromPDF(req.file.buffer);

    if (!text || text.trim().length < 50) {
      return res.status(400).json({
        error: 'Could not extract enough text from the PDF. It may be image-only/scanned or text is not searchable.'
      });
    }

    // Generate notes
    const notes = await generateNotes(text, options);

    res.json({ notes });
  } catch (error) {
    console.log(error)
    console.error('Error processing request:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 StudySmart AI Backend running on http://localhost:${port}`);
});