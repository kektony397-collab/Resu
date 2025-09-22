
import React from 'react';
import type { Language, Theme } from '../types';

interface ControlsProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  onExportPdf: () => void;
}

const Controls: React.FC<ControlsProps> = ({ theme, setTheme, language, setLanguage, onExportPdf }) => {
  return (
    <div id="controls" className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg mb-6 flex flex-col gap-4 sticky top-4 z-50">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <div>
          <label htmlFor="design-switcher" className="text-sm font-medium text-slate-700 mr-2">Style:</label>
          <select 
            id="design-switcher" 
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="theme-aurora">Aurora Gradient</option>
            <option value="theme-bento">Bento Grid</option>
            <option value="theme-dark">Executive Dark</option>
            <option value="theme-glass">Glassmorphism</option>
            <option value="theme-typographic">Typographic</option>
          </select>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-medium text-slate-700 mr-3">Language:</p>
          <div id="lang-toggle" className="flex rounded-lg shadow-sm bg-slate-200 p-1 relative">
            <div 
              id="lang-slider" 
              className="absolute top-1 bottom-1 left-1 w-1/2 bg-white rounded-md shadow-md transition-transform duration-300 ease-in-out"
              style={{ transform: language === 'gu' ? 'translateX(100%)' : 'translateX(0%)' }}
            ></div>
            <button 
              onClick={() => setLanguage('en')} 
              className="lang-btn px-4 py-1 text-sm font-semibold z-10 w-1/2"
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('gu')} 
              className="lang-btn px-4 py-1 text-sm font-semibold z-10 w-1/2"
            >
              ગુજરાતી
            </button>
          </div>
        </div>
      </div>
      <button 
        id="export-pdf-btn" 
        onClick={onExportPdf}
        className="w-full flex items-center justify-center gap-3 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
      >
        <i className="fas fa-file-arrow-down"></i> Download as PDF
      </button>
    </div>
  );
};

export default Controls;
