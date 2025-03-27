"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";

const BackgroundPatterns = () => {
  const [clickedPositions, setClickedPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [techIcons, setTechIcons] = useState<Array<{ src: string; alt: string; rotate?: boolean }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Memoize scroll handler
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      if (scrollLeft < clientWidth) {
        content.style.transform = `translateX(${scrollWidth}px)`;
        container.scrollLeft = scrollWidth;
      } else if (scrollLeft > scrollWidth - clientWidth * 2) {
        content.style.transform = `translateX(0)`;
        container.scrollLeft = clientWidth;
      }
    }, 100);
  }, []);

  // Handle infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Memoize tech icons
  const memoizedTechIcons = useMemo(() => techIcons, [techIcons]);

  // Initialize intersection observer with memoized callback
  const loadMoreContent = useCallback((target: Element) => {
    const container = containerRef.current;
    if (!container) return;

    const isLeftEdge = target.classList.contains('left-edge');
    const isRightEdge = target.classList.contains('right-edge');

    if (isLeftEdge) {
      // Add content to the left
      const newContent = document.createElement('div');
      newContent.className = 'w-screen h-full absolute left-0';
      newContent.innerHTML = container.innerHTML;
      container.insertBefore(newContent, container.firstChild);
      
      // Update scroll position to maintain visual position
      container.scrollLeft += window.innerWidth;
    } else if (isRightEdge) {
      // Add content to the right
      const newContent = document.createElement('div');
      newContent.className = 'w-screen h-full absolute right-0';
      newContent.innerHTML = container.innerHTML;
      container.appendChild(newContent);
    }
  }, []);

  useEffect(() => {
    const observerRef = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreContent(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.tech-icon');
    elements.forEach((el) => observerRef.observe(el));

    return () => observerRef.disconnect();
  }, [loadMoreContent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Fetch SVG icons when component mounts
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await fetch('/api/get-floating-icons');
        const icons = await response.json();
        setTechIcons(icons.map((icon: string) => ({
          src: `/floating-icons/${icon}`,
          alt: icon.replace('.svg', ''),
          rotate: icon.toLowerCase().includes('gear') || icon.toLowerCase().includes('cog')
        })));
      } catch (error) {
        console.error('Error fetching icons:', error);
      }
    };

    fetchIcons();
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== 'A' && (e.target as HTMLElement).tagName !== 'BUTTON') {
        const newPosition = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
        };
        setClickedPositions(prev => [...prev, newPosition]);
        setLastClickTime(Date.now());
        setIsAnimating(true);
        
        setTimeout(() => {
          setClickedPositions(prev => prev.filter(pos => pos.id !== newPosition.id));
        }, 2000);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Content Container */}
        <div 
          ref={contentRef}
          className="relative flex flex-row w-[300vw] h-full"
        >
          {/* Left Section */}
          <div className="w-screen h-full relative">
            {/* Base Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-steelGray-dark via-black to-steelGray-dark"></div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {techIcons.map((icon, index) => (
                <motion.div
                  key={icon.src}
                  initial={{
                    x: `${Math.random() * 80 + 10}vw`,
                    y: `${Math.random() * 80 + 10}vh`,
                  }}
                  animate={{
                    rotate: icon.rotate ? 360 : 0,
                    scale: isAnimating ? [1, 1.3, 0.9, 1.1, 1] : 1,
                    x: `${Math.random() * 80 + 10}vw`,
                    y: `${Math.random() * 80 + 10}vh`,
                  }}
                  transition={{
                    rotate: {
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 0.5,
                      times: [0, 0.2, 0.4, 0.6, 1],
                      ease: "easeInOut",
                    },
                    x: {
                      duration: 30 + index * 7,
                      repeat: Infinity,
                      yoyo: true,
                      ease: "easeInOut",
                      repeatDelay: isAnimating ? 0.5 : 0,
                    },
                    y: {
                      duration: 25 + index * 7,
                      repeat: Infinity,
                      yoyo: true,
                      ease: "easeInOut",
                      repeatDelay: isAnimating ? 0.5 : 0,
                    },
                  }}
                  className="absolute w-8 h-8 md:w-12 md:h-12 opacity-10 hover:opacity-30 transition-opacity"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </motion.div>
              ))}
            </div>

            {/* Trigonometric Graphs */}
            <div className="absolute inset-0 opacity-20">
              {/* Sine Wave */}
              <motion.div
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[20%] left-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-electricBlue/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 25 Q25 0 50 25 T100 25"
                  />
                </svg>
              </motion.div>

              {/* Cosine Wave */}
              <motion.div
                animate={{
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[30%] right-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-circuitGreen/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 0 Q25 25 50 0 T100 0"
                  />
                </svg>
              </motion.div>

              {/* Tangent Wave */}
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[40%] left-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-brushedAluminum/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 25 L25 0 L50 50 L75 0 L100 25"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Mathematical Equations */}
            <div className="absolute inset-0 opacity-30">
              {[
                // Physics Equations
                { eq: "E = mc²", top: "8%", right: "2%", type: "physics" },
                { eq: "F = ma", bottom: "30%", left: "2%", type: "physics" },
                { eq: "PV = nRT", top: "20%", left: "2%", type: "physics" },
                
                // Mathematics Equations
                { eq: "∫(x² + 2x + 1)dx", top: "30%", left: "2%", type: "math" },
                { eq: "πr²", top: "50%", right: "2%", type: "math" },
                { eq: "∇ × F", bottom: "20%", right: "2%", type: "math" },
                { eq: "∑(n=1 to ∞) 1/n²", top: "70%", left: "2%", type: "math" },
                
                // Engineering Equations
                { eq: "τ = F × r", bottom: "50%", left: "2%", type: "engineering" },
                { eq: "P = VI", top: "80%", right: "2%", type: "engineering" },
                { eq: "η = W/Q", top: "90%", left: "2%", type: "engineering" },
              ].map((equation, index) => (
                <motion.div
                  key={equation.eq}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 1.5,
                  }}
                  className={`absolute text-base md:text-lg font-mono whitespace-nowrap ${
                    equation.type === "physics" ? "text-circuitGreen/60" :
                    equation.type === "math" ? "text-electricBlue/60" :
                    "text-brushedAluminum/60"
                  }`}
                  style={{
                    top: equation.top,
                    bottom: equation.bottom,
                    left: equation.left,
                    right: equation.right,
                  }}
                >
                  {equation.eq}
                </motion.div>
              ))}
            </div>

            {/* Euler's Identity - Special Position */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[15%] right-[2%] text-xl md:text-3xl font-mono text-electricBlue/30 blur-[0.5px]"
            >
              e<sup>iπ</sup> + 1 = 0
            </motion.div>

            {/* Click Effects */}
            <AnimatePresence>
              {clickedPositions.map((pos) => (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ 
                    opacity: [1, 0],
                    scale: [0, 2],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute pointer-events-none"
                  style={{ left: pos.x, top: pos.y }}
                >
                  {/* Ripple Circle */}
                  <motion.div
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [0, 2],
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 border-2 border-electricBlue/30 rounded-full"
                  />

                  {/* Bursting Elements */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * 360;
                    const symbols = [
                      { text: "∑", color: "text-electricBlue/80" },
                      { text: "∫", color: "text-electricBlue/80" },
                      { text: "π", color: "text-brushedAluminum/80" },
                      { text: "∞", color: "text-electricBlue/80" },
                      { text: "∇", color: "text-electricBlue/80" },
                      { text: "λ", color: "text-brushedAluminum/80" },
                      { text: "Ω", color: "text-electricBlue/80" },
                      { text: "Φ", color: "text-electricBlue/80" },
                      { text: "Ψ", color: "text-brushedAluminum/80" },
                      { text: "Δ", color: "text-electricBlue/80" },
                      { text: "Γ", color: "text-electricBlue/80" },
                      { text: "Θ", color: "text-brushedAluminum/80" },
                    ];

                    return (
                      <motion.div
                        key={i}
                        initial={{ 
                          x: 0,
                          y: 0,
                          opacity: 1,
                          rotate: 0,
                          scale: 1,
                        }}
                        animate={{ 
                          x: Math.cos(angle * Math.PI / 180) * 150,
                          y: Math.sin(angle * Math.PI / 180) * 150,
                          opacity: [1, 1, 0],
                          rotate: [0, 360],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          ease: "easeOut",
                          delay: i * 0.08,
                          times: [0, 0.7, 1],
                        }}
                        className={`absolute font-mono text-2xl md:text-3xl ${symbols[i].color}`}
                        style={{
                          transformOrigin: "center center",
                          textShadow: "0 0 10px currentColor",
                        }}
                      >
                        {symbols[i].text}
                      </motion.div>
                    );
                  })}

                  {/* Inner Ring */}
                  <motion.div
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [0, 1.5],
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 border border-electricBlue/20 rounded-full"
                  />

                  {/* Center Dot */}
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [1, 2],
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute w-2 h-2 bg-electricBlue/60 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Center Section */}
          <div className="w-screen h-full relative">
            {/* Base Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-steelGray-dark via-black to-steelGray-dark"></div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {techIcons.map((icon, index) => (
                <motion.div
                  key={`center-${icon.src}`}
                  initial={{
                    x: `${Math.random() * 80 + 10}vw`,
                    y: `${Math.random() * 80 + 10}vh`,
                  }}
                  animate={{
                    rotate: icon.rotate ? 360 : 0,
                    scale: isAnimating ? [1, 1.3, 0.9, 1.1, 1] : 1,
                    x: `${Math.random() * 80 + 10}vw`,
                    y: `${Math.random() * 80 + 10}vh`,
                  }}
                  transition={{
                    rotate: {
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 0.5,
                      times: [0, 0.2, 0.4, 0.6, 1],
                      ease: "easeInOut",
                    },
                    x: {
                      duration: 30 + index * 7,
                      repeat: Infinity,
                      yoyo: true,
                      ease: "easeInOut",
                      repeatDelay: isAnimating ? 0.5 : 0,
                    },
                    y: {
                      duration: 25 + index * 7,
                      repeat: Infinity,
                      yoyo: true,
                      ease: "easeInOut",
                      repeatDelay: isAnimating ? 0.5 : 0,
                    },
                  }}
                  className="absolute w-8 h-8 md:w-12 md:h-12 opacity-10 hover:opacity-30 transition-opacity"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </motion.div>
              ))}
            </div>

            {/* Trigonometric Graphs */}
            <div className="absolute inset-0 opacity-20">
              {/* Sine Wave */}
              <motion.div
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[20%] left-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-electricBlue/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 25 Q25 0 50 25 T100 25"
                  />
                </svg>
              </motion.div>

              {/* Cosine Wave */}
              <motion.div
                animate={{
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[30%] right-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-circuitGreen/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 0 Q25 25 50 0 T100 0"
                  />
                </svg>
              </motion.div>

              {/* Tangent Wave */}
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[40%] left-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-brushedAluminum/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 25 L25 0 L50 50 L75 0 L100 25"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Mathematical Equations */}
            <div className="absolute inset-0 opacity-30">
              {[
                // Physics Equations
                { eq: "E = mc²", top: "8%", right: "2%", type: "physics" },
                { eq: "F = ma", bottom: "30%", left: "2%", type: "physics" },
                { eq: "PV = nRT", top: "20%", left: "2%", type: "physics" },
                
                // Mathematics Equations
                { eq: "∫(x² + 2x + 1)dx", top: "30%", left: "2%", type: "math" },
                { eq: "πr²", top: "50%", right: "2%", type: "math" },
                { eq: "∇ × F", bottom: "20%", right: "2%", type: "math" },
                { eq: "∑(n=1 to ∞) 1/n²", top: "70%", left: "2%", type: "math" },
                
                // Engineering Equations
                { eq: "τ = F × r", bottom: "50%", left: "2%", type: "engineering" },
                { eq: "P = VI", top: "80%", right: "2%", type: "engineering" },
                { eq: "η = W/Q", top: "90%", left: "2%", type: "engineering" },
              ].map((equation, index) => (
                <motion.div
                  key={equation.eq}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 1.5,
                  }}
                  className={`absolute text-base md:text-lg font-mono whitespace-nowrap ${
                    equation.type === "physics" ? "text-circuitGreen/60" :
                    equation.type === "math" ? "text-electricBlue/60" :
                    "text-brushedAluminum/60"
                  }`}
                  style={{
                    top: equation.top,
                    bottom: equation.bottom,
                    left: equation.left,
                    right: equation.right,
                  }}
                >
                  {equation.eq}
                </motion.div>
              ))}
            </div>

            {/* Euler's Identity - Special Position */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[15%] right-[2%] text-xl md:text-3xl font-mono text-electricBlue/30 blur-[0.5px]"
            >
              e<sup>iπ</sup> + 1 = 0
            </motion.div>

            {/* Click Effects */}
            <AnimatePresence>
              {clickedPositions.map((pos) => (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ 
                    opacity: [1, 0],
                    scale: [0, 2],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute pointer-events-none"
                  style={{ left: pos.x, top: pos.y }}
                >
                  {/* Ripple Circle */}
                  <motion.div
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [0, 2],
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 border-2 border-electricBlue/30 rounded-full"
                  />

                  {/* Bursting Elements */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * 360;
                    const symbols = [
                      { text: "∑", color: "text-electricBlue/80" },
                      { text: "∫", color: "text-electricBlue/80" },
                      { text: "π", color: "text-brushedAluminum/80" },
                      { text: "∞", color: "text-electricBlue/80" },
                      { text: "∇", color: "text-electricBlue/80" },
                      { text: "λ", color: "text-brushedAluminum/80" },
                      { text: "Ω", color: "text-electricBlue/80" },
                      { text: "Φ", color: "text-electricBlue/80" },
                      { text: "Ψ", color: "text-brushedAluminum/80" },
                      { text: "Δ", color: "text-electricBlue/80" },
                      { text: "Γ", color: "text-electricBlue/80" },
                      { text: "Θ", color: "text-brushedAluminum/80" },
                    ];

                    return (
                      <motion.div
                        key={i}
                        initial={{ 
                          x: 0,
                          y: 0,
                          opacity: 1,
                          rotate: 0,
                          scale: 1,
                        }}
                        animate={{ 
                          x: Math.cos(angle * Math.PI / 180) * 150,
                          y: Math.sin(angle * Math.PI / 180) * 150,
                          opacity: [1, 1, 0],
                          rotate: [0, 360],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          ease: "easeOut",
                          delay: i * 0.08,
                          times: [0, 0.7, 1],
                        }}
                        className={`absolute font-mono text-2xl md:text-3xl ${symbols[i].color}`}
                        style={{
                          transformOrigin: "center center",
                          textShadow: "0 0 10px currentColor",
                        }}
                      >
                        {symbols[i].text}
                      </motion.div>
                    );
                  })}

                  {/* Inner Ring */}
                  <motion.div
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [0, 1.5],
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 border border-electricBlue/20 rounded-full"
                  />

                  {/* Center Dot */}
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [1, 2],
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute w-2 h-2 bg-electricBlue/60 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Section */}
          <div className="w-screen h-full relative">
            {/* Base Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-steelGray-dark via-black to-steelGray-dark"></div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {techIcons.map((icon, index) => (
                <motion.div
                  key={`right-${icon.src}`}
                  initial={{
                    x: `${Math.random() * 80 + 10}vw`,
                    y: `${Math.random() * 80 + 10}vh`,
                  }}
                  animate={{
                    rotate: icon.rotate ? 360 : 0,
                    scale: isAnimating ? [1, 1.3, 0.9, 1.1, 1] : 1,
                    x: `${Math.random() * 80 + 10}vw`,
                    y: `${Math.random() * 80 + 10}vh`,
                  }}
                  transition={{
                    rotate: {
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 0.5,
                      times: [0, 0.2, 0.4, 0.6, 1],
                      ease: "easeInOut",
                    },
                    x: {
                      duration: 30 + index * 7,
                      repeat: Infinity,
                      yoyo: true,
                      ease: "easeInOut",
                      repeatDelay: isAnimating ? 0.5 : 0,
                    },
                    y: {
                      duration: 25 + index * 7,
                      repeat: Infinity,
                      yoyo: true,
                      ease: "easeInOut",
                      repeatDelay: isAnimating ? 0.5 : 0,
                    },
                  }}
                  className="absolute w-8 h-8 md:w-12 md:h-12 opacity-10 hover:opacity-30 transition-opacity"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </motion.div>
              ))}
            </div>

            {/* Trigonometric Graphs */}
            <div className="absolute inset-0 opacity-20">
              {/* Sine Wave */}
              <motion.div
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[20%] left-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-electricBlue/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 25 Q25 0 50 25 T100 25"
                  />
                </svg>
              </motion.div>

              {/* Cosine Wave */}
              <motion.div
                animate={{
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[30%] right-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-circuitGreen/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 0 Q25 25 50 0 T100 0"
                  />
                </svg>
              </motion.div>

              {/* Tangent Wave */}
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[40%] left-[2%] w-24 md:w-32 h-16"
              >
                <svg viewBox="0 0 100 50" className="text-brushedAluminum/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 25 L25 0 L50 50 L75 0 L100 25"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Mathematical Equations */}
            <div className="absolute inset-0 opacity-30">
              {[
                // Physics Equations
                { eq: "E = mc²", top: "8%", right: "2%", type: "physics" },
                { eq: "F = ma", bottom: "30%", left: "2%", type: "physics" },
                { eq: "PV = nRT", top: "20%", left: "2%", type: "physics" },
                
                // Mathematics Equations
                { eq: "∫(x² + 2x + 1)dx", top: "30%", left: "2%", type: "math" },
                { eq: "πr²", top: "50%", right: "2%", type: "math" },
                { eq: "∇ × F", bottom: "20%", right: "2%", type: "math" },
                { eq: "∑(n=1 to ∞) 1/n²", top: "70%", left: "2%", type: "math" },
                
                // Engineering Equations
                { eq: "τ = F × r", bottom: "50%", left: "2%", type: "engineering" },
                { eq: "P = VI", top: "80%", right: "2%", type: "engineering" },
                { eq: "η = W/Q", top: "90%", left: "2%", type: "engineering" },
              ].map((equation, index) => (
                <motion.div
                  key={equation.eq}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 1.5,
                  }}
                  className={`absolute text-base md:text-lg font-mono whitespace-nowrap ${
                    equation.type === "physics" ? "text-circuitGreen/60" :
                    equation.type === "math" ? "text-electricBlue/60" :
                    "text-brushedAluminum/60"
                  }`}
                  style={{
                    top: equation.top,
                    bottom: equation.bottom,
                    left: equation.left,
                    right: equation.right,
                  }}
                >
                  {equation.eq}
                </motion.div>
              ))}
            </div>

            {/* Euler's Identity - Special Position */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[15%] right-[2%] text-xl md:text-3xl font-mono text-electricBlue/30 blur-[0.5px]"
            >
              e<sup>iπ</sup> + 1 = 0
            </motion.div>

            {/* Click Effects */}
            <AnimatePresence>
              {clickedPositions.map((pos) => (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ 
                    opacity: [1, 0],
                    scale: [0, 2],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute pointer-events-none"
                  style={{ left: pos.x, top: pos.y }}
                >
                  {/* Ripple Circle */}
                  <motion.div
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [0, 2],
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 border-2 border-electricBlue/30 rounded-full"
                  />

                  {/* Bursting Elements */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * 360;
                    const symbols = [
                      { text: "∑", color: "text-electricBlue/80" },
                      { text: "∫", color: "text-electricBlue/80" },
                      { text: "π", color: "text-brushedAluminum/80" },
                      { text: "∞", color: "text-electricBlue/80" },
                      { text: "∇", color: "text-electricBlue/80" },
                      { text: "λ", color: "text-brushedAluminum/80" },
                      { text: "Ω", color: "text-electricBlue/80" },
                      { text: "Φ", color: "text-electricBlue/80" },
                      { text: "Ψ", color: "text-brushedAluminum/80" },
                      { text: "Δ", color: "text-electricBlue/80" },
                      { text: "Γ", color: "text-electricBlue/80" },
                      { text: "Θ", color: "text-brushedAluminum/80" },
                    ];

                    return (
                      <motion.div
                        key={i}
                        initial={{ 
                          x: 0,
                          y: 0,
                          opacity: 1,
                          rotate: 0,
                          scale: 1,
                        }}
                        animate={{ 
                          x: Math.cos(angle * Math.PI / 180) * 150,
                          y: Math.sin(angle * Math.PI / 180) * 150,
                          opacity: [1, 1, 0],
                          rotate: [0, 360],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          ease: "easeOut",
                          delay: i * 0.08,
                          times: [0, 0.7, 1],
                        }}
                        className={`absolute font-mono text-2xl md:text-3xl ${symbols[i].color}`}
                        style={{
                          transformOrigin: "center center",
                          textShadow: "0 0 10px currentColor",
                        }}
                      >
                        {symbols[i].text}
                      </motion.div>
                    );
                  })}

                  {/* Inner Ring */}
                  <motion.div
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [0, 1.5],
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 border border-electricBlue/20 rounded-full"
                  />

                  {/* Center Dot */}
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [1, 2],
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute w-2 h-2 bg-electricBlue/60 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundPatterns;
