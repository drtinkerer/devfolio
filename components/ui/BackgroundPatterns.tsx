"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import React from "react";

// Memoize static data
const EQUATIONS = [
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
];

const SYMBOLS = [
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

// Memoized components
const TechIcon = React.memo(({ icon, isAnimating }: { icon: any; isAnimating: boolean }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${icon.position.x}vw`,
      top: `${icon.position.y}vh`,
    }}
    animate={{
      rotate: icon.rotate ? 360 : 0,
      scale: isAnimating ? [1, 1.3, 0.9, 1.1, 1] : 1,
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
      }
    }}
    className="absolute w-10 h-10 md:w-14 md:h-14 opacity-25 hover:opacity-40 transition-opacity"
  >
    <Image
      src={icon.src}
      alt={icon.alt}
      width={56}
      height={56}
      className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      priority={false}
    />
  </motion.div>
));

const Equation = React.memo(({ equation, index }: { equation: any; index: number }) => (
  <motion.div
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
));

const ClickEffect = React.memo(({ pos }: { pos: any }) => (
  <motion.div
    initial={{ opacity: 1, scale: 0 }}
    animate={{ 
      opacity: [1, 0],
      scale: [0, 1.2],
    }}
    exit={{ opacity: 0 }}
    transition={{ 
      duration: 2,
      ease: [0.32, 0.72, 0, 1],
      times: [0, 1]
    }}
    className="absolute pointer-events-none"
    style={{ 
      left: pos.x, 
      top: pos.y,
      willChange: 'transform, opacity'
    }}
  >
    {/* Outer glow ring */}
    <motion.div
      initial={{ opacity: 1, scale: 0 }}
      animate={{ 
        opacity: [1, 0],
        scale: [0, 1.5],
      }}
      transition={{ 
        duration: 2,
        ease: [0.32, 0.72, 0, 1],
        times: [0, 1]
      }}
      className="absolute inset-0 border-2 border-electricBlue/50 rounded-full"
      style={{ 
        willChange: 'transform, opacity',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
      }}
    />

    {/* Inner glow ring */}
    <motion.div
      initial={{ opacity: 1, scale: 0 }}
      animate={{ 
        opacity: [1, 0],
        scale: [0, 1.2],
      }}
      transition={{ 
        duration: 1.5,
        ease: [0.32, 0.72, 0, 1],
        times: [0, 1]
      }}
      className="absolute inset-0 border border-circuitGreen/50 rounded-full"
      style={{ 
        willChange: 'transform, opacity',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
      }}
    />

    {/* Burst symbols with vibrant colors */}
    {[...Array(12)].map((_, i) => {
      const angle = (i / 12) * 360;
      const colors = [
        "text-electricBlue/100",
        "text-circuitGreen/100",
        "text-brushedAluminum/100",
        "text-[#00ffff]/100",
        "text-[#00ff00]/100",
        "text-[#ff00ff]/100",
        "text-electricBlue/100",
        "text-circuitGreen/100",
        "text-brushedAluminum/100",
        "text-[#00ffff]/100",
        "text-[#00ff00]/100",
        "text-[#ff00ff]/100",
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
            x: Math.cos(angle * Math.PI / 180) * 80,
            y: Math.sin(angle * Math.PI / 180) * 80,
            opacity: [1, 1, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2.5,
            ease: [0.32, 0.72, 0, 1],
            delay: i * 0.05,
            times: [0, 0.7, 1],
          }}
          className={`absolute font-mono text-xl md:text-2xl ${colors[i]}`}
          style={{
            transformOrigin: "center center",
            textShadow: "0 0 20px currentColor, 0 0 40px currentColor",
            willChange: 'transform, opacity'
          }}
        >
          {SYMBOLS[i].text}
        </motion.div>
      );
    })}

    {/* Center dot with enhanced glow */}
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ 
        opacity: [1, 0],
        scale: [1, 1.5],
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1],
        times: [0, 1]
      }}
      className="absolute w-2 h-2 bg-electricBlue/80 rounded-full"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        willChange: 'transform, opacity',
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)",
      }}
    />

    {/* Enhanced gradient glow effect */}
    <motion.div
      initial={{ opacity: 1, scale: 0 }}
      animate={{ 
        opacity: [1, 0],
        scale: [0, 1.2],
      }}
      transition={{ 
        duration: 1.5,
        ease: [0.32, 0.72, 0, 1],
        times: [0, 1]
      }}
      className="absolute inset-0 bg-gradient-to-r from-electricBlue/30 via-circuitGreen/30 to-[#ff00ff]/30 rounded-full blur-md"
      style={{ willChange: 'transform, opacity' }}
    />
  </motion.div>
));

const BackgroundPatterns = () => {
  const [clickedPositions, setClickedPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [techIcons, setTechIcons] = useState<Array<{ 
    src: string; 
    alt: string; 
    rotate?: boolean;
    position: { x: number; y: number };
    velocity: { x: number; y: number };
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const animationFrameRef = useRef<number>();

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

  // Fetch SVG icons when component mounts
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await fetch('/api/get-floating-icons');
        const icons = await response.json();
        const mappedIcons = icons.map((icon: string) => ({
          src: `/floating-icons/${icon}`,
          alt: icon.replace('.svg', ''),
          rotate: icon.toLowerCase().includes('gear') || icon.toLowerCase().includes('cog'),
          position: {
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
          },
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          }
        }));
        setTechIcons(mappedIcons);
      } catch (error) {
        console.error('Error fetching icons:', error);
      }
    };

    fetchIcons();
    setMounted(true);
  }, []);

  // Animation loop for continuous movement
  useEffect(() => {
    const speed = 0.1;

    const animate = () => {
      setTechIcons(prevIcons => 
        prevIcons.map(icon => {
          const newPosition = {
            x: icon.position.x + icon.velocity.x * speed,
            y: icon.position.y + icon.velocity.y * speed
          };

          const newVelocity = { ...icon.velocity };
          if (newPosition.x <= 0 || newPosition.x >= 100) {
            newVelocity.x = -newVelocity.x;
          }
          if (newPosition.y <= 0 || newPosition.y >= 100) {
            newVelocity.y = -newVelocity.y;
          }

          newPosition.x = Math.max(0, Math.min(100, newPosition.x));
          newPosition.y = Math.max(0, Math.min(100, newPosition.y));

          return {
            ...icon,
            position: newPosition,
            velocity: newVelocity
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle click effects
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== 'A' && (e.target as HTMLElement).tagName !== 'BUTTON') {
        const newPosition = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
        };
        setClickedPositions(prev => [...prev, newPosition]);
        setIsAnimating(true);
        
        requestAnimationFrame(() => {
          setTimeout(() => {
            setClickedPositions(prev => prev.filter(pos => pos.id !== newPosition.id));
          }, 2500);
          
          setTimeout(() => {
            setIsAnimating(false);
          }, 500);
        });
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          ref={contentRef}
          className="relative flex flex-row w-[300vw] h-full"
        >
          {/* Left Section */}
          <div className="w-screen h-full relative">
            <div className="absolute inset-0 bg-gradient-to-b from-steelGray-dark via-black to-steelGray-dark"></div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {techIcons.map((icon, index) => (
                <TechIcon key={icon.src} icon={icon} isAnimating={isAnimating} />
              ))}
            </div>

            {/* Trigonometric Graphs */}
            <div className="absolute inset-0 opacity-20">
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
              {EQUATIONS.map((equation, index) => (
                <Equation key={equation.eq} equation={equation} index={index} />
              ))}
            </div>

            {/* Euler's Identity */}
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
                <ClickEffect key={pos.id} pos={pos} />
              ))}
            </AnimatePresence>
          </div>

          {/* Center Section */}
          <div className="w-screen h-full relative">
            <div className="absolute inset-0 bg-gradient-to-b from-steelGray-dark via-black to-steelGray-dark"></div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {techIcons.map((icon, index) => (
                <TechIcon key={`center-${icon.src}`} icon={icon} isAnimating={isAnimating} />
              ))}
            </div>

            {/* Trigonometric Graphs */}
            <div className="absolute inset-0 opacity-20">
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
              {EQUATIONS.map((equation, index) => (
                <Equation key={equation.eq} equation={equation} index={index} />
              ))}
            </div>

            {/* Euler's Identity */}
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
                <ClickEffect key={pos.id} pos={pos} />
              ))}
            </AnimatePresence>
          </div>

          {/* Right Section */}
          <div className="w-screen h-full relative">
            <div className="absolute inset-0 bg-gradient-to-b from-steelGray-dark via-black to-steelGray-dark"></div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {techIcons.map((icon, index) => (
                <TechIcon key={`right-${icon.src}`} icon={icon} isAnimating={isAnimating} />
              ))}
            </div>

            {/* Trigonometric Graphs */}
            <div className="absolute inset-0 opacity-20">
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
              {EQUATIONS.map((equation, index) => (
                <Equation key={equation.eq} equation={equation} index={index} />
              ))}
            </div>

            {/* Euler's Identity */}
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
                <ClickEffect key={pos.id} pos={pos} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundPatterns;
