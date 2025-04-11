"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

// Smoke-like trail particle component
const TrailParticle = ({ position, index }: { position: { x: number; y: number }; index: number }) => {
  // Calculate properties based on position in trail
  const size = Math.max(5, 15 + index * 1.5); // Particles grow as they age
  const opacity = Math.max(0.05, 0.4 - index * 0.08); // Fade out gradually

  // Random offset for smoke-like effect
  const offsetX = Math.sin(index * 0.5) * 10;
  const offsetY = Math.cos(index * 0.7) * 5 - (index * 1.5); // Slight upward drift

  return (
    <motion.div
      className="absolute rounded-full blur-[2px] pointer-events-none"
      style={{
        width: size,
        height: size,
        x: position.x - size / 2 + offsetX,
        y: position.y - size / 2 + offsetY,
        backgroundColor: `rgba(0, 255, 255, ${opacity * 0.5})`,
        boxShadow: `0 0 ${size * 0.7}px rgba(0, 255, 255, ${opacity * 0.3})`,
        opacity,
      }}
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity }}
      transition={{ duration: 0.5 }}
    />
  );
};

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number}>>([]);
  const trailLength = 8; // More particles for smoke-like effect
  const cursorRef = useRef<HTMLDivElement>(null);

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

  // Update cursor position with trail effect
  const updateCursor = useCallback((e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY };
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    // Update trail positions - add particles at intervals for smoke effect
    const lastPos = trailPositions[0];
    if (!lastPos || Math.hypot(newPosition.x - lastPos.x, newPosition.y - lastPos.y) > 5) {
      setTrailPositions(prev => {
        // Add new position with slight random offset for natural smoke movement
        const randomX = (Math.random() - 0.5) * 2; // -1 to 1
        const randomY = (Math.random() - 0.5) * 2; // -1 to 1
        const newPos = {
          x: newPosition.x + randomX,
          y: newPosition.y + randomY
        };
        return [newPos, ...prev.slice(0, trailLength - 1)];
      });
    }
  }, [cursorX, cursorY, trailPositions, trailLength]);

  // Handle hover effects - game-like feedback
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    cursorScale.set(1.4); // Grow cursor on hover
    cursorOpacity.set(0.9);
  }, [cursorScale, cursorOpacity]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    cursorScale.set(1);
    cursorOpacity.set(1);
  }, [cursorScale, cursorOpacity]);

  // Handle mouse down/up for click effects
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
    cursorScale.set(0.8); // Shrink when clicking - game-like feedback
  }, [cursorScale]);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
    cursorScale.set(isHovering ? 1.4 : 1); // Return to appropriate size
  }, [cursorScale, isHovering]);

  // Handle visibility
  const handleVisibilityChange = useCallback(() => {
    cursorOpacity.set(document.visibilityState === "visible" ? 1 : 0);
  }, [cursorOpacity]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    cursorScale.set(1.2); // Subtle growth on scroll
    setTimeout(() => cursorScale.set(isHovering ? 1.4 : 1), 100); // Return to appropriate size
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
      // Add event listeners with click handling
      window.addEventListener("mousemove", updateCursor);
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
        window.removeEventListener("mousemove", updateCursor);
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
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, handleVisibilityChange, handleScroll, isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-visible">
      {/* Smoke-like trail effect */}
      {trailPositions.map((pos, i) => (
        <TrailParticle key={`trail-${i}`} position={pos} index={i} />
      ))}

      {/* Main cursor - video game style with shadow */}
      <motion.div
        ref={cursorRef}
        className="absolute pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: smoothOpacity,
        }}
      >
        {/* Crosshair-inspired cursor */}
        <motion.div
          className="relative"
          style={{
            scale: smoothScale,
          }}
        >
          {/* Center dot */}
          <motion.div
            className="absolute w-3 h-3 bg-electricBlue rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              boxShadow: isClicking
                ? "0 0 10px rgba(0, 255, 255, 0.9), 0 0 20px rgba(0, 255, 255, 0.5)"
                : "0 0 8px rgba(0, 255, 255, 0.7), 0 0 16px rgba(0, 255, 255, 0.4)",
            }}
          />

          {/* Crosshair lines */}
          <motion.div
            className="absolute h-[1px] w-4 bg-electricBlue -translate-x-1/2 -translate-y-1/2"
            style={{
              boxShadow: "0 0 4px rgba(0, 255, 255, 0.7)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <motion.div
            className="absolute w-[1px] h-4 bg-electricBlue -translate-x-1/2 -translate-y-1/2"
            style={{
              boxShadow: "0 0 4px rgba(0, 255, 255, 0.7)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Outer ring - only visible on hover */}
          {isHovering && (
            <motion.div
              className="absolute w-10 h-10 border border-electricBlue/70 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                boxShadow: "0 0 8px rgba(0, 255, 255, 0.4)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
