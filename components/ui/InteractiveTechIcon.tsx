"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useZenMode } from "@/lib/ZenModeContext";

interface InteractiveTechIconProps {
  icon: {
    src: string;
    alt: string;
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    rotate?: boolean;
  };
  isAnimating: boolean;
  onIconClick: (icon: any) => void;
  isDestroyed?: boolean;
  gamePosition?: { x: number; y: number }; // Separate position for game mode
}

const InteractiveTechIcon = React.memo(({ 
  icon, 
  isAnimating, 
  onIconClick, 
  isDestroyed = false,
  gamePosition
}: InteractiveTechIconProps) => {
  const { zenMode } = useZenMode();
  const [localDestroyed, setLocalDestroyed] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  // Update local destroyed state when prop changes
  useEffect(() => {
    if (isDestroyed && !localDestroyed) {
      setShowExplosion(true);
      setLocalDestroyed(true);
      
      // Hide explosion after animation
      setTimeout(() => {
        setShowExplosion(false);
      }, 1200);
    } else if (!isDestroyed && localDestroyed) {
      // Reset when icon should reappear
      setLocalDestroyed(false);
      setShowExplosion(false);
    }
  }, [isDestroyed, localDestroyed]);

  // Don't render if destroyed
  if (localDestroyed && !showExplosion) {
    return null;
  }

  // Same size for both modes
  const iconSize = "w-12 h-12 md:w-14 md:h-14";
  const iconOpacity = zenMode ? "opacity-90" : "opacity-25 hover:opacity-40";
  
  // Always use gamePosition for movement in both modes
  const displayPosition = gamePosition || icon.position;

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'absolute',
          left: `${displayPosition.x}vw`,
          top: `${displayPosition.y}vh`,
          pointerEvents: zenMode ? 'none' : 'auto',
          cursor: zenMode ? 'default' : 'pointer'
        }}
        className={`absolute ${iconSize} ${iconOpacity} transition-opacity duration-300`}
        onClick={() => !zenMode && onIconClick(icon)}
        // Smooth destruction animation
        animate={showExplosion ? {
          scale: [1, 1.2, 0.8, 0],
          rotate: [0, 90, 270, 360],
          opacity: [1, 0.9, 0.6, 0]
        } : undefined}
        transition={showExplosion ? { 
          duration: 1.2, 
          ease: "easeInOut",
          times: [0, 0.3, 0.7, 1]
        } : undefined}
        exit={showExplosion ? {
          scale: 0,
          rotate: 360,
          opacity: 0
        } : undefined}
      >
        <Image
          src={icon.src}
          alt={icon.alt}
          width={56}
          height={56}
          className={`w-full h-full ${zenMode ? 'drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] filter brightness-105 pointer-events-none' : 'drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'}`}
          priority={false}
        />

        {/* Smooth explosion effect - only in zen mode */}
        {zenMode && showExplosion && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Gentle explosion particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-electricBlue rounded-full opacity-70"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, (Math.cos(i * Math.PI / 3) * 30)],
                  y: [0, (Math.sin(i * Math.PI / 3) * 30)],
                  opacity: [0.7, 0.4, 0],
                  scale: [1, 0.8, 0]
                }}
                transition={{
                  duration: 1.0,
                  ease: "easeOut",
                  delay: i * 0.05
                }}
              />
            ))}
            
            {/* Quick central glow - very brief flash */}
            <motion.div
              className="absolute inset-0 bg-electricBlue rounded-full opacity-30"
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 0.1,
                ease: "easeOut"
              }}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

InteractiveTechIcon.displayName = 'InteractiveTechIcon';

export default InteractiveTechIcon;