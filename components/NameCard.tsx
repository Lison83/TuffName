import React, { useState } from 'react';
import { GeneratedName } from '../types';

interface NameCardProps {
  name: GeneratedName;
}

export const NameCard: React.FC<NameCardProps> = ({ name }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group">
      {/* Glow effect behind */}
      <div className="absolute -inset-0.5 bg-red-900 rounded-sm opacity-20 group-hover:opacity-60 blur transition duration-200"></div>
      
      <div className="relative flex flex-col items-center justify-between p-4 bg-black border border-red-900 hover:border-red-500 transition-all duration-300 h-full">
        
        {/* Top Decoration */}
        <div className="w-full flex justify-between text-[10px] text-red-800 mb-2 font-mono">
          <span>TUFF-LVL: {name.tuffness}%</span>
          <span>ID: {name.id.slice(0, 4)}</span>
        </div>

        {/* The Name */}
        <div className="text-xl md:text-2xl text-center font-bold text-white break-all mb-4 tracking-wider glitch-hover cursor-default">
          {name.text}
        </div>

        {/* Action Button */}
        <button
          onClick={handleCopy}
          className={`w-full py-2 text-sm font-mono uppercase tracking-widest border transition-colors duration-200 ${
            copied 
              ? "bg-green-900 border-green-600 text-green-400" 
              : "bg-transparent border-red-900 text-red-600 hover:bg-red-900/30 hover:text-white"
          }`}
        >
          {copied ? "COPIED 💀" : "COPY"}
        </button>
        
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-600"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-600"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600"></div>
      </div>
    </div>
  );
};
