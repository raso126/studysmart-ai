import React from 'react';
import Markdown from 'react-markdown';
import { Download, Copy, Check, FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { motion } from 'motion/react';

interface NotesDisplayProps {
  notes: string;
  isLoading: boolean;
}

export const NotesDisplay: React.FC<NotesDisplayProps> = ({ notes, isLoading }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([notes], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "study-notes.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(notes, 180);
    doc.text(splitText, 15, 15);
    doc.save("study-notes.pdf");
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-3 h-3 bg-blue-600 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-3 h-3 bg-blue-600 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-3 h-3 bg-blue-600 rounded-full"
          />
        </div>
        <p className="text-gray-500 font-medium animate-pulse">AI is analyzing your document...</p>
      </div>
    );
  }

  if (!notes) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4"
    >
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-gray-900">Generated Notes</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <button
            onClick={downloadAsText}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>TXT</span>
          </button>
          <button
            onClick={downloadAsPDF}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm prose prose-blue max-w-none">
        <div className="markdown-body">
          <Markdown>{notes}</Markdown>
        </div>
      </div>
    </motion.div>
  );
};
