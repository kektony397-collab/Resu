
import React, { useState, useRef } from 'react';
import Controls from './components/Controls';
import Resume from './components/Resume';
import { resumeData } from './data/resumeData';
import type { Language, Theme } from './types';

// html2pdf is loaded from a script tag in index.html and is available on the window object
declare const html2pdf: any;

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('theme-aurora');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = () => {
    if (!resumeRef.current) return;
    
    setIsExporting(true);

    // Give React time to re-render and hide controls before capturing the element
    setTimeout(() => {
        const elementToPrint = resumeRef.current;
        if (elementToPrint) {
            html2pdf().from(elementToPrint).set({
                margin: 0,
                filename: `Resume_Joshi_Hetalben_${language.toUpperCase()}.pdf`,
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            }).save().then(() => {
                setIsExporting(false);
            }).catch((err: Error) => {
                console.error("PDF export failed:", err);
                setIsExporting(false); // Reset state on failure
            });
        } else {
             setIsExporting(false);
        }
    }, 100);
  };

  return (
    <main className="w-full max-w-4xl mx-auto">
      <div style={{ display: isExporting ? 'none' : 'block' }}>
        <Controls
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          onExportPdf={handleExportPdf}
        />
      </div>
      <Resume
        ref={resumeRef}
        data={resumeData[language]}
        theme={theme}
        language={language}
      />
    </main>
  );
};

export default App;
