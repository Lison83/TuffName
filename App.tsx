import React, { useState, useCallback } from 'react';
import { generateTuffNames } from './services/geminiService';
import { GeneratedName, GenerationStatus } from './types';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { NameCard } from './components/NameCard';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [names, setNames] = useState<GeneratedName[]>([]);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    // Allow empty keywords now for random generation
    setStatus(GenerationStatus.LOADING);
    setError(null);
    setNames([]); // Clear previous names for effect

    try {
      const rawNames = await generateTuffNames(keyword);
      
      const processedNames: GeneratedName[] = rawNames.map(text => ({
        id: uuidv4(),
        text: text,
        // Random tuffness between 85 and 100 because we only serve quality
        tuffness: Math.floor(Math.random() * (100 - 85 + 1) + 85)
      }));

      setNames(processedNames);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err) {
      setError("System crashed out. Try again twin.");
      setStatus(GenerationStatus.ERROR);
    }
  }, [keyword]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-black text-red-500 selection:bg-red-900 selection:text-white overflow-x-hidden relative">
      
      {/* Background Texture/Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-900 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-900 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
        
        {/* Header Section */}
        <header className="text-center mb-16 space-y-4 animate-fade-in-down">
          <div className="inline-block border border-red-800 px-3 py-1 rounded-full mb-4 bg-black/50 backdrop-blur-sm">
            <span className="text-xs font-mono tracking-[0.3em] text-red-400 uppercase">Est. 2025 // No AI 💀</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white glow-text tuff-font">
            So Tuff <br />
            <span className="text-red-600">Generator</span> 💀
          </h1>
          <p className="text-gray-400 font-mono max-w-lg mx-auto mt-4">
            Lock in twin. Generate the hardest usernames for your next lobby. 
            Sybau if you ain't rocking a tuff name. 🔥
          </p>
        </header>

        {/* Input Section */}
        <section className="w-full max-w-xl space-y-6 mb-20">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-red-600 uppercase tracking-widest ml-1">
              Enter Aesthetic / Keyword (Optional)
            </label>
            <Input 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="E.g. DEMON, GHOST, TWIN, SLAYER..."
            />
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleGenerate} 
              disabled={status === GenerationStatus.LOADING}
              className="w-full md:w-auto min-w-[200px]"
            >
              {status === GenerationStatus.LOADING ? "COOKING... 🔥" : "GET TUFF 💀"}
            </Button>
          </div>

          {error && (
            <div className="text-center p-4 border border-red-900 bg-red-900/10 text-red-400 font-mono text-sm">
              Error: {error}
            </div>
          )}
        </section>

        {/* Results Section */}
        {status === GenerationStatus.SUCCESS && names.length > 0 && (
          <section className="w-full animate-fade-in-up">
            <div className="flex items-center justify-between mb-8 border-b border-red-900 pb-4">
              <h2 className="text-2xl font-bold text-white tuff-font uppercase">Generated Results</h2>
              <span className="text-sm font-mono text-gray-500">{names.length} NAMES LOCKED IN</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {names.map((name, index) => (
                <div key={name.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <NameCard name={name} />
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-600 text-sm font-mono">
                Don't see one you like? <span className="text-red-500 cursor-pointer hover:underline" onClick={handleGenerate}>Roll again twin.</span>
              </p>
            </div>
          </section>
        )}

        {/* Empty State / Filler */}
        {status === GenerationStatus.IDLE && (
          <div className="text-center opacity-30 select-none pointer-events-none">
            <div className="text-9xl mb-4">☠️</div>
            <h3 className="text-3xl font-bold uppercase tracking-widest text-red-900">Waiting for input</h3>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-4 bg-black/80 backdrop-blur-md border-t border-red-900/30 z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] md:text-xs font-mono text-gray-600">
          <span>© 2025 SO TUFF LABS</span>
          <div className="flex gap-4">
            <span>STATUS: ONLINE</span>
            <span className="text-green-500 animate-pulse">●</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; scale: 0.95; }
          to { opacity: 1; scale: 1; }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default App;