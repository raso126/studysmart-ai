# StudySmart AI

An AI-powered study assistant that converts PDF documents into concise, structured study notes using Google's Gemini AI.

## Features

- **PDF Upload**: Drag and drop PDF files for processing
- **AI-Powered Notes**: Generate study notes using Google's Gemini AI
- **Customizable Options**:
  - Note length: Short, Medium, Detailed
  - Format: Bullets or Paragraphs
  - Include exam questions
- **Export Options**: Download notes as text or PDF
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Motion (animations)

### Backend
- Node.js
- Express
- TypeScript
- Google's Generative AI (Gemini)
- PDF parsing with pdf-parse
- Multer for file uploads

## Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studysmart-ai
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```

   Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

5. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   # Backend will run on http://localhost:3001
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   # Frontend will run on http://localhost:3004 (or next available port)
   ```

6. **Open your browser**

   Navigate to `http://localhost:3004` (or the port shown in terminal) to use the application.

## API Endpoints

### POST /generate-notes
Generates study notes from an uploaded PDF file.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `file`: PDF file (required)
  - `length`: 'short' | 'medium' | 'detailed' (optional, default: 'medium')
  - `format`: 'bullets' | 'paragraph' (optional, default: 'bullets')
  - `includeQuestions`: 'true' | 'false' (optional, default: 'true')

**Response:**
```json
{
  "notes": "Generated study notes in Markdown format..."
}
```

### GET /health
Health check endpoint.

## Project Structure

```
studysmart-ai/
├── backend/
│   ├── src/
│   │   ├── ai-service.ts      # Gemini AI integration
│   │   ├── pdf-utils.ts       # PDF text extraction
│   │   └── server.ts          # Express server
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── src/
│   ├── components/
│   │   ├── FileUploader.tsx
│   │   ├── NotesDisplay.tsx
│   │   └── Settings.tsx
│   ├── lib/
│   │   └── utils/
│   │       └── pdf-utils.ts
│   ├── services/
│   │   └── ai-service.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Development

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run clean` - Clean build artifacts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This application uses Google's Gemini AI service. Make sure to comply with Google's terms of service and API usage policies. The AI-generated content may not always be accurate, so please review and verify the information.
