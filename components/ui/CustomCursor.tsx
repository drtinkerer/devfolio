"use client";

import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updatePointer = () => {
      const target = document.elementFromPoint(position.x, position.y);
      if (target) {
        const computedStyle = window.getComputedStyle(target);
        setIsPointer(computedStyle.cursor === "pointer");
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updatePointer);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updatePointer);
    };
  }, [position]);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px) scale(${
            isPointer ? 1.5 : 1
          })`,
        }}
      />
      {/* Cursor ring */}
      <div
        className="fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${
            isPointer ? 1.5 : 1
          })`,
        }}
      />
      {/* Cursor glow */}
      <div
        className="fixed w-12 h-12 bg-white/20 rounded-full pointer-events-none z-50 blur-sm transition-all duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 24}px, ${position.y - 24}px) scale(${
            isPointer ? 1.5 : 1
          })`,
        }}
      />
    </>
  );
};

export default CustomCursor; 