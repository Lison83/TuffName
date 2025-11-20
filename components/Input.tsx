import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, onKeyDown }) => {
  return (
    <div className="relative w-full group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="relative w-full bg-black text-white border border-red-900 p-4 text-lg font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-600 uppercase tracking-widest rounded-md"
      />
    </div>
  );
};
