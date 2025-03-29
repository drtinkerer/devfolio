"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Spring animation values
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorScale = useMotionValue(1);
  const cursorOpacity = useMotionValue(1);

  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const smoothScale = useSpring(cursorScale, springConfig);
  const smoothOpacity = useSpring(cursorOpacity, springConfig);

  // Update cursor position
  const updateCursor = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  // Handle hover effects
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    cursorScale.set(1.5);
    cursorOpacity.set(0.8);
  }, [cursorScale, cursorOpacity]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    cursorScale.set(1);
    cursorOpacity.set(1);
  }, [cursorScale, cursorOpacity]);

  // Handle visibility
  const handleVisibilityChange = useCallback(() => {
    setIsVisible(document.visibilityState === "visible");
    cursorOpacity.set(document.visibilityState === "visible" ? 1 : 0);
  }, [cursorOpacity]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    cursorScale.set(1.2);
    setTimeout(() => cursorScale.set(1), 100);
  }, [cursorScale]);

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
      // Add event listeners
      window.addEventListener("mousemove", updateCursor);
      window.addEventListener("mouseenter", handleMouseEnter);
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("scroll", handleScroll);

      // Add hover listeners to interactive elements
      interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']");
      interactiveElements.forEach((el: Element) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    // Cleanup
    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", updateCursor);
        window.removeEventListener("mouseenter", handleMouseEnter);
        window.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("scroll", handleScroll);
        if (interactiveElements) {
          interactiveElements.forEach((el: Element) => {
            el.removeEventListener("mouseenter", handleMouseEnter);
            el.removeEventListener("mouseleave", handleMouseLeave);
          });
        }
      }
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleVisibilityChange, handleScroll, isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null;
  }
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          scale: smoothScale,
          opacity: smoothOpacity,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          scale: smoothScale,
          opacity: smoothOpacity,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <div className="w-full h-full border-2 border-white rounded-full" />
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          scale: smoothScale,
          opacity: smoothOpacity,
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
