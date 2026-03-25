import { useState } from 'react';
import { Sparkles, GraduationCap, BookOpen, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { FileUploader } from './components/FileUploader';
import { Settings } from './components/Settings';
import { NotesDisplay } from './components/NotesDisplay';
import { extractTextFromPDF } from './lib/utils/pdf-utils';
import { generateNotes, NoteGenerationOptions } from './services/ai-service';
import { cn } from './lib/utils';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<NoteGenerationOptions>({
    length: 'medium',
    format: 'bullets',
    includeQuestions: true,
  });

  const handleGenerateNotes = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setNotes('');

    try {
      const text = await extractTextFromPDF(file);
      if (!text || text.trim().length < 50) {
        throw new Error("Could not extract enough text from the PDF. It might be an image-only PDF or scanned document.");
      }
      
      const generatedNotes = await generateNotes(text, options);
      setNotes(generatedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">StudySmart <span className="text-blue-600">AI</span></span>
          </div>
          <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Features</a>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Study Assistant</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight"
          >
            Turn complex material into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              concise study notes.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Upload your PDF textbooks, research papers, or lecture notes. Our AI extracts the most important concepts for quick revision.
          </motion.p>
        </section>

        {/* Main Interaction Area */}
        <section className="space-y-8">
          <div className="space-y-6">
            <FileUploader 
              onFileSelect={setFile} 
              selectedFile={file} 
              onClear={() => {
                setFile(null);
                setNotes('');
                setError(null);
              }} 
            />
            
            {file && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6"
              >
                <Settings options={options} setOptions={setOptions} />
                
                <button
                  onClick={handleGenerateNotes}
                  disabled={isLoading}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-lg",
                    isLoading 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98]"
                  )}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      <span>Processing Document...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-current" />
                      <span>Generate Study Notes</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center space-x-2">
              <div className="bg-red-100 p-1 rounded-full">
                <XIcon className="w-4 h-4" />
              </div>
              <span>{error}</span>
            </div>
          )}

          <NotesDisplay notes={notes} isLoading={isLoading} />
        </section>

        {/* Features Grid */}
        {!notes && !isLoading && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 w-fit">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Smart Extraction</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Automatically identifies key concepts, definitions, and core arguments from your text.
              </p>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 w-fit">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-bold text-lg">Instant Revision</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Save hours of manual note-taking. Get structured summaries ready for exam prep in seconds.
              </p>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 w-fit">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg">Exam Focused</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Optionally generate potential exam questions to test your knowledge on the material.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span className="font-bold">StudySmart AI</span>
          </div>
          <p className="text-sm text-gray-500">
            Helping students learn faster and smarter with artificial intelligence.
          </p>
          <div className="flex justify-center space-x-6 text-xs font-medium text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
            <a href="#" className="hover:text-gray-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
