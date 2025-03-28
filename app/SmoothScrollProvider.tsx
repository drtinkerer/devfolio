'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { scrollManager } from '@/utils/scrollManager';

// Create context
const SmoothScrollContext = createContext<null>(null);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;

    // Initialize scroll manager
    scrollManager.init();
    
    // Add a global class for smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Prevent unnecessary repaints during scrolling
    const handleTouchStart = () => {
      document.documentElement.classList.add('is-scrolling');
    };
    
    const handleTouchEnd = () => {
      document.documentElement.classList.remove('is-scrolling');
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Cleanup
    return () => {
      scrollManager.destroy();
      document.documentElement.style.scrollBehavior = '';
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  return (
    <SmoothScrollContext.Provider value={null}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
