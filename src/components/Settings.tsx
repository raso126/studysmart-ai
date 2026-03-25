import React from 'react';
import { Settings2, List, AlignLeft, Clock, FileText, HelpCircle } from 'lucide-react';
import { NoteGenerationOptions, NoteLength, NoteFormat } from '../services/ai-service';
import { cn } from '../lib/utils';

interface SettingsProps {
  options: NoteGenerationOptions;
  setOptions: React.Dispatch<React.SetStateAction<NoteGenerationOptions>>;
}

export const Settings: React.FC<SettingsProps> = ({ options, setOptions }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-2">
        <Settings2 className="w-5 h-5 text-gray-700" />
        <h3 className="font-bold text-gray-900">Note Preferences</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Note Length */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Note Length</span>
          </label>
          <div className="flex p-1 bg-gray-200 rounded-xl">
            {(['short', 'medium', 'detailed'] as NoteLength[]).map((len) => (
              <button
                key={len}
                onClick={() => setOptions(prev => ({ ...prev, length: len }))}
                className={cn(
                  "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize",
                  options.length === len 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {len}
              </button>
            ))}
          </div>
        </div>

        {/* Note Format */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
            <FileText className="w-3 h-3" />
            <span>Format</span>
          </label>
          <div className="flex p-1 bg-gray-200 rounded-xl">
            <button
              onClick={() => setOptions(prev => ({ ...prev, format: 'bullets' }))}
              className={cn(
                "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1",
                options.format === 'bullets' 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <List className="w-3 h-3" />
              <span>Bullets</span>
            </button>
            <button
              onClick={() => setOptions(prev => ({ ...prev, format: 'paragraph' }))}
              className={cn(
                "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1",
                options.format === 'paragraph' 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <AlignLeft className="w-3 h-3" />
              <span>Paragraph</span>
            </button>
          </div>
        </div>

        {/* Exam Questions */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
            <HelpCircle className="w-3 h-3" />
            <span>Exam Prep</span>
          </label>
          <button
            onClick={() => setOptions(prev => ({ ...prev, includeQuestions: !prev.includeQuestions }))}
            className={cn(
              "w-full py-2 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center space-x-2",
              options.includeQuestions 
                ? "bg-blue-50 border-blue-200 text-blue-600" 
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            <div className={cn(
              "w-4 h-4 rounded border flex items-center justify-center transition-colors",
              options.includeQuestions ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
            )}>
              {options.includeQuestions && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
            <span>Include Exam Questions</span>
          </button>
        </div>
      </div>
    </div>
  );
};
