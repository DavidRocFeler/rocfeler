'use client';
import React from 'react';
import { Loader2, Box, RefreshCw } from 'lucide-react';
import { ILoadingProps } from '@/interfaces/types';

const Loading: React.FC<ILoadingProps> = ({ 
  width = '404px', 
  height = '316px' 
}) => {
  return (
    <div 
      className="relative rounded-[10px] bg-gray-900/50 backdrop-blur-sm border mr-[1.7rem] border-gray-800"
      style={{ width, height }}
    >
      {/* Background pulse effect */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-900 to-gray-800 rounded-[10px]" />
      
      {/* Content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        {/* Primary loader */}
        <div className="relative">
          <Loader2 
            className="w-12 h-12 text-white animate-spin" 
            strokeWidth={1.5}
          />
          <RefreshCw 
            className="absolute inset-0 w-12 h-12 text-white/30 animate-pulse" 
            strokeWidth={1.5}
          />
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-2">
          <Box 
            className="w-4 h-4 text-white animate-bounce" 
            strokeWidth={1.5}
          />
          <span className="text-sm text-white/80 animate-pulse">
            Loading content...
          </span>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-white/20 animate-loading-bar" />
        </div>
      </div>

      {/* Custom animation for loading bar */}
      <style jsx global>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0;
          }
          50% {
            width: 100%;
            margin-left: 0;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;