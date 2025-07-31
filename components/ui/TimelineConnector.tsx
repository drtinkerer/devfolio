'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TimelineConnectorProps {
  totalItems: number;
  className?: string;
}

const TimelineConnector: React.FC<TimelineConnectorProps> = ({ 
  totalItems, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Scroll progress for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to timeline progress
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Intersection observer for initial visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate timeline height based on number of items
  const timelineHeight = Math.max(400, totalItems * 200);

  return (
    <div 
      ref={containerRef}
      className={`absolute left-0 md:left-1/2 top-0 transform md:-translate-x-1/2 ${className}`}
      style={{ height: timelineHeight }}
    >
      {/* Main timeline SVG */}
      <svg
        width="4"
        height={timelineHeight}
        viewBox={`0 0 4 ${timelineHeight}`}
        className="absolute top-0 left-0"
        style={{ overflow: 'visible' }}
      >
        {/* Background line */}
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2={timelineHeight}
          stroke="url(#timelineGradientBg)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.3 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Animated progress line */}
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2={timelineHeight}
          stroke="url(#timelineGradientActive)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          style={{ pathLength: pathProgress }}
          transition={{ 
            duration: 2,
            ease: "easeInOut",
            delay: 0.3
          }}
        />

        {/* Gradient definitions */}
        <defs>
          {/* Background gradient */}
          <linearGradient id="timelineGradientBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00FF88" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Active gradient */}
          <linearGradient id="timelineGradientActive" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#00FF88" stopOpacity="1" />
            <stop offset="70%" stopColor="#00D4FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Glowing effect line */}
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2={timelineHeight}
          stroke="url(#timelineGradientActive)"
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isVisible ? 1 : 0,
            opacity: isVisible ? 0.6 : 0
          }}
          style={{ pathLength: pathProgress }}
          transition={{ 
            duration: 2,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </svg>

      {/* Animated progress indicator dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-electricBlue to-circuitGreen shadow-lg"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: useTransform(pathProgress, [0, 1], [0, timelineHeight - 12])
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.5,
          delay: 1
        }}
      >
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute -inset-1 rounded-full border border-electricBlue/50"
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
      </motion.div>
    </div>
  );
};

export default TimelineConnector;