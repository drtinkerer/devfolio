"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

// Visible trail dot component for professional feel
const TrailDot = ({ position, index }: { position: { x: number; y: number }; index: number }) => {
  const size = Math.max(3, 8 - index * 0.8); // More visible dots
  const opacity = Math.max(0.1, 0.4 - index * 0.06); // Better visibility

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        x: position.x - size / 2,
        y: position.y - size / 2,
        backgroundColor: `rgba(100, 181, 246, ${opacity})`, // Professional blue
        boxShadow: `0 0 ${size * 2}px rgba(100, 181, 246, ${opacity * 0.5})`,
        opacity,
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity }}
      transition={{ duration: 0.3 }}
    />
  );
};

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number}>>([]);
  const trailLength = 5; // Fewer dots for cleaner professional look
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef<number>(0);

  // Spring animation values
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorScale = useMotionValue(1);
  const cursorOpacity = useMotionValue(1);

  // More natural spring animations - tighter following
  const springConfig = { damping: 40, stiffness: 800, mass: 0.4 }; // Higher damping, stiffness for closer following
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const smoothScale = useSpring(cursorScale, { damping: 25, stiffness: 400 }); // Separate config for scale
  const smoothOpacity = useSpring(cursorOpacity, { damping: 25, stiffness: 300 });

  // Throttled cursor update for better performance
  const updateCursor = useCallback((e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY };
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    // Update trail positions - cleaner movement for professional look
    const lastPos = trailPositions[0];
    if (!lastPos || Math.hypot(newPosition.x - lastPos.x, newPosition.y - lastPos.y) > 8) {
      setTrailPositions(prev => {
        return [newPosition, ...prev.slice(0, trailLength - 1)];
      });
    }
  }, [cursorX, cursorY, trailPositions, trailLength]);

  // Throttled version of updateCursor for performance
  const throttledUpdateCursor = useCallback((e: MouseEvent) => {
    const now = Date.now();
    const throttleTime = 16; // ~60fps max
    
    if (now - lastMoveTime.current >= throttleTime) {
      updateCursor(e);
      lastMoveTime.current = now;
    }
  }, [updateCursor]);

  // Handle hover effects - professional subtle feedback
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    cursorScale.set(1.2); // Subtle growth on hover
    cursorOpacity.set(0.8);
  }, [cursorScale, cursorOpacity]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    cursorScale.set(1);
    cursorOpacity.set(1);
  }, [cursorScale, cursorOpacity]);

  // Handle mouse down/up for click effects
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
    cursorScale.set(0.9); // Subtle shrink when clicking
  }, [cursorScale]);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
    cursorScale.set(isHovering ? 1.2 : 1); // Return to appropriate size
  }, [cursorScale, isHovering]);

  // Handle visibility
  const handleVisibilityChange = useCallback(() => {
    cursorOpacity.set(document.visibilityState === "visible" ? 1 : 0);
  }, [cursorOpacity]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    cursorScale.set(1.1); // Very subtle growth on scroll
    setTimeout(() => cursorScale.set(isHovering ? 1.2 : 1), 100); // Return to appropriate size
  }, [cursorScale, isHovering]);

  useEffect(() => {
    // Check if device is touch-enabled
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    checkTouchDevice();

    // Define interactiveElements outside the if block so it's accessible in cleanup
    let interactiveElements: NodeListOf<Element> | null = null;

    // Only add mouse-related event listeners if not a touch device
    if (!isTouchDevice) {
      // Add event listeners with click handling - using throttled version
      window.addEventListener("mousemove", throttledUpdateCursor);
      window.addEventListener("mouseenter", handleMouseEnter);
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("scroll", handleScroll);

      // Hide default cursor
      document.body.style.cursor = "none";

      // Add hover listeners to interactive elements
      interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1'])");
      interactiveElements.forEach((el: Element) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        // Add custom cursor style to indicate interactivity
        (el as HTMLElement).style.cursor = "none";
      });
    }

    // Cleanup
    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", throttledUpdateCursor);
        window.removeEventListener("mouseenter", handleMouseEnter);
        window.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("scroll", handleScroll);

        // Restore default cursor
        document.body.style.cursor = "";

        if (interactiveElements) {
          interactiveElements.forEach((el: Element) => {
            el.removeEventListener("mouseenter", handleMouseEnter);
            el.removeEventListener("mouseleave", handleMouseLeave);
            // Restore default cursor style
            (el as HTMLElement).style.cursor = "";
          });
        }
      }
    };
  }, [throttledUpdateCursor, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, handleVisibilityChange, handleScroll, isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-visible">
      {/* Subtle trail dots */}
      {trailPositions.map((pos, i) => (
        <TrailDot key={`trail-${i}`} position={pos} index={i} />
      ))}

      {/* Main cursor - clean professional design */}
      <motion.div
        ref={cursorRef}
        className="absolute pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: smoothOpacity,
        }}
      >
        <motion.div
          className="relative"
          style={{
            scale: smoothScale,
          }}
        >
          {/* Main cursor dot */}
          <motion.div
            className="absolute w-3 h-3 bg-electricBlue rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              boxShadow: isClicking
                ? "0 0 12px rgba(100, 181, 246, 0.9), 0 0 20px rgba(100, 181, 246, 0.5)"
                : "0 0 10px rgba(100, 181, 246, 0.8), 0 0 16px rgba(100, 181, 246, 0.4)",
            }}
          />

          {/* Outer ring - visible on hover with professional styling */}
          {isHovering && (
            <motion.div
              className="absolute w-8 h-8 border-2 border-electricBlue/70 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                boxShadow: "0 0 8px rgba(100, 181, 246, 0.4)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}

          {/* Click ripple effect */}
          {isClicking && (
            <motion.div
              className="absolute w-8 h-8 border border-electricBlue/40 rounded-full -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
