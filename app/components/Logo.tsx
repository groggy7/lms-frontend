import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = 40, 
  showText = true,
  textColor = "text-slate-800"
}) => {
  return (
    <div className={`flex items-center gap-3 no-underline ${className}`}>
      <div style={{ width: size, height: size }} className="relative flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <path
            d="M30 20C30 14.4772 34.4772 10 40 10H70C75.5228 10 80 14.4772 80 20V30C80 35.5228 75.5228 40 70 40H50V70C50 75.5228 45.5228 80 40 80H20C14.4772 80 10 75.5228 10 70V30C10 24.4772 14.4772 20 20 20H30Z"
            fill="url(#logo-gradient)"
            opacity="0.15"
          />
          <path
            d="M45 15L45 65C45 73.2843 38.2843 80 30 80L20 80"
            stroke="url(#logo-gradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M45 15L75 15C83.2843 15 90 21.7157 90 30L90 40"
            stroke="url(#logo-gradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle cx="70" cy="60" r="12" fill="url(#logo-gradient)" filter="url(#glow)" />
          <path 
            d="M70 45V50M70 70V75M85 60H80M55 60H60" 
            stroke="url(#logo-gradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {showText && (
        <span className={`text-2xl font-black tracking-tight leading-none ${textColor} no-underline border-none outline-none`}>
          Lumina<span className="text-blue-600">.</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
