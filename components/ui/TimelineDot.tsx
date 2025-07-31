'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineDotProps {
  isCurrentPosition?: boolean;
  companyColor?: string;
  index: number;
  className?: string;
}

const TimelineDot: React.FC<TimelineDotProps> = ({
  isCurrentPosition = false,
  companyColor,
  index,
  className = ''
}) => {
  // Determine colors based on position and company color
  const dotColor = companyColor || (isCurrentPosition ? '#00D4FF' : '#00FF88');
  const borderColor = companyColor || (isCurrentPosition ? '#00D4FF' : '#00FF88');
  const glowColor = companyColor || (isCurrentPosition ? '#00D4FF' : '#00FF88');

  return (
    <motion.div
      className={`absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-2 bg-black transform -translate-x-1/2 z-10 cursor-pointer ${className}`}
      style={{ 
        borderColor: borderColor,
        boxShadow: isCurrentPosition ? `0 0 20px ${glowColor}40` : 'none'
      }}
      initial={{ scale: 0.8, opacity: 0.5 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ 
        scale: 1.2,
        boxShadow: `0 0 25px ${glowColor}60`
      }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1
      }}
      viewport={{ once: true }}
    >
      {/* Inner dot */}
      <motion.div
        className="absolute inset-0 m-auto w-2 h-2 rounded-full"
        style={{ backgroundColor: dotColor }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        whileHover={{ scale: 1.3 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1 + 0.2 
        }}
        viewport={{ once: true }}
      />

      {/* Pulsing effect for current position */}
      {isCurrentPosition && (
        <>
          {/* Primary pulse ring */}
          <motion.div
            className="absolute -inset-1 rounded-full border opacity-50"
            style={{ borderColor: borderColor }}
            animate={{ 
              scale: [1, 1.5, 1], 
              opacity: [0.5, 0.2, 0.5] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Secondary pulse ring */}
          <motion.div
            className="absolute -inset-2 rounded-full border opacity-30"
            style={{ borderColor: borderColor }}
            animate={{ 
              scale: [1, 2, 1], 
              opacity: [0.3, 0.1, 0.3] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </>
      )}

      {/* Hover glow effect */}
      <motion.div
        className="absolute -inset-3 rounded-full opacity-0"
        style={{ 
          background: `radial-gradient(circle, ${glowColor}20 0%, transparent 70%)` 
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Company-specific accent ring */}
      {companyColor && (
        <motion.div
          className="absolute -inset-0.5 rounded-full border opacity-60"
          style={{ borderColor: companyColor }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.6 }}
          whileHover={{ 
            scale: 1.1, 
            opacity: 0.8,
            boxShadow: `0 0 15px ${companyColor}40`
          }}
          transition={{ 
            duration: 0.4,
            delay: index * 0.1 + 0.3
          }}
          viewport={{ once: true }}
        />
      )}

      {/* Interactive ripple effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: dotColor }}
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ 
          scale: [0, 1.5, 0],
          opacity: [0, 0.3, 0]
        }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
};

export default TimelineDot;