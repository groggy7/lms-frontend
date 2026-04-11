import React from 'react';

const AboutIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-square bg-blue-50 rounded-[40px] overflow-hidden flex items-center justify-center shadow-inner">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full -mr-20 -mt-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/50 rounded-full -ml-20 -mb-20 blur-3xl" />
      
      <svg width="80%" height="80%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-2xl">
        {/* Main Tablet/Screen - representing digital learning */}
        <rect x="60" y="80" width="280" height="200" rx="20" fill="#1e293b" />
        <rect x="75" y="95" width="250" height="150" rx="10" fill="#334155" />
        
        {/* Stylized Video Play Button on screen */}
        <circle cx="200" cy="170" r="30" fill="#3b82f6" />
        <path d="M215 170L192.5 182.99L192.5 157.01L215 170Z" fill="white" />
        
        {/* Screen details/skeleton UI */}
        <rect x="75" y="255" width="100" height="8" rx="4" fill="#475569" />
        <rect x="185" y="255" width="40" height="8" rx="4" fill="#3b82f6" />
        
        {/* Stack of Books - representing traditional learning */}
        {/* Book 1 (Bottom) */}
        <rect x="100" y="280" width="200" height="40" rx="4" fill="#4f46e5" />
        <rect x="100" y="280" width="30" height="40" fill="#4338ca" />
        <rect x="135" y="295" width="140" height="4" rx="2" fill="#818cf8" opacity="0.5" />
        
        {/* Book 2 (Middle) */}
        <rect x="120" y="250" width="180" height="35" rx="4" fill="#2563eb" />
        <rect x="120" y="250" width="30" height="35" fill="#1d4ed8" />
        <rect x="155" y="262" width="120" height="4" rx="2" fill="#60a5fa" opacity="0.5" />
        
        {/* Book 3 (Top) */}
        <rect x="140" y="220" width="160" height="35" rx="4" fill="#0ea5e9" />
        <rect x="140" y="220" width="30" height="35" fill="#0284c7" />
        <rect x="175" y="232" width="100" height="4" rx="2" fill="#7dd3fc" opacity="0.5" />
        
        {/* Floating Icons */}
        {/* Code Icon */}
        <rect x="310" y="50" width="50" height="50" rx="12" fill="white" className="animate-bounce" style={{ animationDuration: '3s' }} />
        <path d="M325 65L320 75L325 85M345 65L350 75L345 85" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Star Icon */}
        <rect x="40" y="200" width="40" height="40" rx="10" fill="white" className="animate-pulse" />
        <path d="M60 212L62.4721 217.008L68 217.812L64 221.71L64.9443 227.248L60 224.652L55.0557 227.248L56 221.71L52 217.812L57.5279 217.008L60 212Z" fill="#fbbf24" />
        
        {/* Graduation Cap Icon */}
        <rect x="300" y="280" width="60" height="60" rx="15" fill="white" className="animate-bounce" style={{ animationDuration: '4s' }} />
        <path d="M330 295L310 305L330 315L350 305L330 295Z" fill="#1e293b" />
        <path d="M315 308V318C315 318 320 323 330 323C340 323 345 318 345 318V308" stroke="#1e293b" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default AboutIllustration;
