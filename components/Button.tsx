import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, disabled, className = '', variant = 'primary' }) => {
  const baseStyles = "px-6 py-3 font-bold tracking-wider uppercase transition-all duration-200 clip-path-polygon transform active:scale-95";
  
  const variants = {
    primary: "bg-red-600 text-black hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] border border-transparent",
    secondary: "bg-transparent text-red-600 border border-red-600 hover:bg-red-900/20 hover:text-red-400"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed grayscale";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`}
    >
      {children}
    </button>
  );
};
