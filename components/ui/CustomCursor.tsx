"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>();

  const updateCursor = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      // Update cursor position
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over a clickable element
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target) {
        const isClickable = 
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          window.getComputedStyle(target).cursor === 'pointer';
        
        setIsHovered(Boolean(isClickable));
      } else {
        setIsHovered(false);
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.cursor = 'none';
    window.addEventListener('mousemove', updateCursor);
    
    return () => {
      document.documentElement.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateCursor);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateCursor]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out ${
          isHovered ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
          opacity: position.x === 0 && position.y === 0 ? 0 : 1,
        }}
      />

      {/* Cursor ring */}
      <div
        className={`fixed w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out ${
          isHovered ? 'scale-150 opacity-50' : 'scale-100 opacity-100'
        }`}
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
          opacity: position.x === 0 && position.y === 0 ? 0 : 1,
        }}
      />

      {/* Cursor glow effect */}
      <div
        className={`fixed w-12 h-12 bg-white/20 rounded-full pointer-events-none z-[9998] blur-sm transition-all duration-300 ease-out ${
          isHovered ? 'scale-150 opacity-75' : 'scale-100 opacity-50'
        }`}
        style={{
          transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
          opacity: position.x === 0 && position.y === 0 ? 0 : 1,
        }}
      />
    </>
  );
};

export default React.memo(CustomCursor);
