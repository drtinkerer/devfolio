"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import React from "react";
import { useZenMode } from "@/lib/ZenModeContext";

// Memoize static data
const EQUATIONS = [
  // Physics Equations
  { eq: "E = mc²", top: "8%", right: "2%", type: "physics" },
  { eq: "F = ma", bottom: "30%", left: "2%", type: "physics" },
  
  // Mathematics Equations
  { eq: "e^(iπ) = -1", top: "10%", left: "2%", type: "math" },
  { eq: "∫(x² + 2x + 1)dx", top: "50%", left: "2%", type: "math" },
  { eq: "πr²", top: "50%", right: "2%", type: "math" },
  { eq: "∇ × F", bottom: "20%", right: "2%", type: "math" },
  { eq: "∑(n=1 to ∞) 1/n²", top: "70%", left: "2%", type: "math" },
  { eq: "ln(xy) = ln(x) + ln(y)", bottom: "5%", left: "15%", type: "math" },
  { eq: "sin(2θ) = 2sin(θ)cos(θ)", bottom: "5%", right: "15%", type: "math" },
  // Engineering Equations
  { eq: "P = VI", top: "80%", right: "2%", type: "engineering" },
  { eq: "η = W/Q", top: "90%", left: "2%", type: "engineering" },
  { eq: "η = 1 - T₁/T₂", top: "45%", left: "55%", type: "thermodynamics" },
  
  // Materials Science - Iron Carbon Diagram
  { eq: "Fe-C (γ→α+Fe₃C)", top: "8%", left: "47%", type: "materials" },

  // DevOps & Cloud Engineering
  { eq: "CPU = f(load) × cores", top: "40%", right: "4%", type: "cloud" },
  { eq: "latency ∝ 1/bandwidth", bottom: "60%", left: "3%", type: "networking" },
  { eq: "availability = (1 - downtime/time)", top: "60%", right: "3%", type: "sre" },
  { eq: "scaling = f(demand)", bottom: "70%", right: "4%", type: "cloud" },
  { eq: "Consistency = f(replicas)", top: "85%", right: "40%", type: "cloud" },
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
  { text: "♪", color: "text-electricBlue/80" },
  { text: "♫", color: "text-brushedAluminum/80" },
  { text: "♬", color: "text-electricBlue/80" },
  { text: "𝄞", color: "text-brushedAluminum/80" },
];

// Musical notes configuration
const MUSICAL_NOTES = [
  { symbol: "♪", position: { top: "25%", left: "15%" } },
  { symbol: "♫", position: { top: "45%", right: "20%" } },
  { symbol: "♬", position: { bottom: "35%", left: "25%" } },
  { symbol: "𝄞", position: { top: "30%", right: "25%" } },
];

// Memoized components
const TechIcon = React.memo(({ icon, isAnimating, onIconClick }: { icon: any; isAnimating: boolean; onIconClick: (icon: any) => void }) => {
  const { zenMode } = useZenMode();
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${icon.position.x}vw`,
        top: `${icon.position.y}vh`,
        pointerEvents: zenMode ? 'none' : 'auto',
        cursor: zenMode ? 'default' : 'pointer'
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
      onClick={() => !zenMode && onIconClick(icon)}
      className={`absolute w-10 h-10 md:w-14 md:h-14 opacity-25 hover:opacity-40 transition-opacity ${zenMode ? 'pointer-events-none' : ''}`}
    >
      <Image
        src={icon.src}
        alt={icon.alt}
        width={56}
        height={56}
        className={`w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] ${zenMode ? 'pointer-events-none' : ''}`}
        priority={false}
        style={{ pointerEvents: zenMode ? 'none' : 'auto' }}
      />
    </motion.div>
  );
});
TechIcon.displayName = 'TechIcon';

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
      equation.type === "devops" ? "text-electricBlue/60" :
      equation.type === "cloud" ? "text-brushedAluminum/60" :
      equation.type === "networking" ? "text-circuitGreen/60" :
      equation.type === "sre" ? "text-electricBlue/60" :
      equation.type === "materials" ? "text-brushedAluminum/70" :
      equation.type === "thermodynamics" ? "text-circuitGreen/70" :
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
Equation.displayName = 'Equation';

const ClickEffect = React.memo(({ pos }: { pos: any }) => (
  <motion.div
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
    <motion.div
      initial={{ opacity: 1, scale: 0 }}
      animate={{ 
        opacity: [1, 0],
        scale: [0, 2],
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 border-2 border-electricBlue/30 rounded-full"
    />
    {[...Array(12)].map((_, i) => {
      const angle = (i / 12) * 360;
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
          className={`absolute font-mono text-2xl md:text-3xl ${SYMBOLS[i].color}`}
          style={{
            transformOrigin: "center center",
            textShadow: "0 0 10px currentColor",
          }}
        >
          {SYMBOLS[i].text}
        </motion.div>
      );
    })}
    <motion.div
      initial={{ opacity: 1, scale: 0 }}
      animate={{ 
        opacity: [1, 0],
        scale: [0, 1.5],
      }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute inset-0 border border-electricBlue/20 rounded-full"
    />
  </motion.div>
));
ClickEffect.displayName = 'ClickEffect';

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
  const { zenMode } = useZenMode();
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

  // Add click handler for icons
  const handleIconClick = useCallback((clickedIcon: any) => {
    setTechIcons(prevIcons => 
      prevIcons.map(icon => {
        if (icon.src === clickedIcon.src) {
          return {
            ...icon,
            velocity: {
              x: (Math.random() - 0.5) * 4, // Increased speed range
              y: (Math.random() - 0.5) * 4
            }
          };
        }
        return icon;
      })
    );
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
                <TechIcon 
                  key={icon.src} 
                  icon={icon} 
                  isAnimating={isAnimating} 
                  onIconClick={handleIconClick}
                />
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

              {/* Additional engineering waveform */}
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[65%] right-[15%] w-32 md:w-40 h-16"
              >
                <svg viewBox="0 0 100 40" className="text-electricBlue/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 20 L10 20 L10 5 L20 5 L20 35 L30 35 L30 20 L40 20 L40 5 L50 5 L50 35 L60 35 L60 20 L70 20 L70 5 L80 5 L80 35 L90 35 L90 20 L100 20"
                  />
                </svg>
              </motion.div>

              {/* Circuit diagram pattern */}
              <motion.div
                animate={{
                  x: [0, 8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[75%] left-[20%] w-32 md:w-40 h-20"
              >
                <svg viewBox="0 0 100 60" className="text-circuitGreen/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M10 30 L30 30 M30 10 L30 50 M40 15 L40 45 M50 20 L50 40 M60 10 L60 50 M70 30 L90 30"
                  />
                </svg>
              </motion.div>

              {/* Parabola */}
              <motion.div
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[20%] left-[30%] w-28 md:w-36 h-20"
              >
                <svg viewBox="0 0 100 60" className="text-brushedAluminum/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 60 Q50 -20 100 60"
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

            {/* Musical Notes */}
            <div className="absolute inset-0">
              {MUSICAL_NOTES.map((note, index) => (
                <motion.div
                  key={note.symbol}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className="absolute text-2xl md:text-3xl text-electricBlue/50"
                  style={note.position}
                >
                  {note.symbol}
                </motion.div>
              ))}
            </div>

            {/* Physics Problem - Inclined Plane with Forces */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[10%] left-[20%] w-44 h-40 opacity-40"
            >
              <svg viewBox="0 0 180 160" className="text-amber-500/60">
                {/* Coordinate System */}
                <line x1="30" y1="130" x2="150" y2="130" stroke="currentColor" strokeWidth="1" />
                <line x1="30" y1="130" x2="30" y2="30" stroke="currentColor" strokeWidth="1" />
                <text x="155" y="135" fontSize="10" fill="currentColor">x</text>
                <text x="25" y="25" fontSize="10" fill="currentColor">y</text>
                
                {/* Inclined Plane */}
                <line x1="30" y1="130" x2="130" y2="70" stroke="currentColor" strokeWidth="1.5" />
                
                {/* Block on Inclined Plane */}
                <rect x="70" y="90" width="20" height="20" transform="rotate(-30, 70, 90)" fill="none" stroke="currentColor" strokeWidth="1" />
                
                {/* Angle Label */}
                <path d="M30,130 A20,20 0 0,0 45,115" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <text x="42" y="120" fontSize="8" fill="currentColor">θ</text>
                
                {/* Force Vectors */}
                <line x1="80" y1="90" x2="80" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                <polygon points="80,60 77,65 83,65" fill="currentColor" />
                <text x="85" y="70" fontSize="8" fill="currentColor">F₁</text>
                
                <line x1="80" y1="90" x2="110" y2="90" stroke="currentColor" strokeWidth="1" />
                <polygon points="110,90 105,87 105,93" fill="currentColor" />
                <text x="100" y="85" fontSize="8" fill="currentColor">F₂</text>
                
                <line x1="80" y1="90" x2="65" y2="105" stroke="currentColor" strokeWidth="1" />
                <polygon points="65,105 70,102 68,96" fill="currentColor" />
                <text x="60" y="105" fontSize="8" fill="currentColor">mg</text>
                
                {/* Physics Equation */}
                <text x="40" y="150" fontSize="8" fill="currentColor">F₂ = μ × N - mg·sin(θ)</text>
              </svg>
            </motion.div>
            
            {/* Iron-Carbon Phase Diagram representation */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[15%] left-[40%] w-48 h-40 opacity-40"
            >
              <svg viewBox="0 0 200 160" className="text-brushedAluminum/60">
                {/* Temperature axis */}
                <line x1="20" y1="20" x2="20" y2="140" stroke="currentColor" strokeWidth="1.5" />
                {/* Carbon content axis */}
                <line x1="20" y1="140" x2="180" y2="140" stroke="currentColor" strokeWidth="1.5" />
                
                {/* Phase boundaries */}
                <path 
                  d="M20,20 L80,20 L100,60 L140,80 L180,60" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                />
                <path 
                  d="M20,80 L60,80 L80,100 L120,100" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeDasharray="3,2"
                />
                <path 
                  d="M60,80 L60,140" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeDasharray="2,2"
                />
                <path 
                  d="M100,60 L100,140" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeDasharray="2,2"
                />
                
                {/* Labels */}
                <text x="10" y="15" fontSize="10" fill="currentColor">T</text>
                <text x="185" y="145" fontSize="10" fill="currentColor">C%</text>
                <text x="35" y="50" fontSize="8" fill="currentColor">γ</text>
                <text x="75" y="110" fontSize="8" fill="currentColor">α+Fe₃C</text>
                <text x="45" y="130" fontSize="8" fill="currentColor">0.8%</text>
                <text x="90" y="130" fontSize="8" fill="currentColor">2.06%</text>
              </svg>
            </motion.div>

            {/* Carnot Cycle PV Diagram */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[50%] left-[45%] w-44 h-36 opacity-40"
            >
              <svg viewBox="0 0 180 140" className="text-circuitGreen/60">
                {/* P-V Axes */}
                <line x1="20" y1="120" x2="160" y2="120" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="20" x2="20" y2="120" stroke="currentColor" strokeWidth="1.5" />
                
                {/* Carnot Cycle */}
                <path 
                  d="M40,40 L120,40 C135,40 135,70 120,70 L40,100 C25,100 25,70 40,70 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                />
                
                {/* Process Labels */}
                <text x="80" y="35" fontSize="8" fill="currentColor">T₁ (isothermal)</text>
                <text x="125" y="55" fontSize="8" fill="currentColor">adiabatic</text>
                <text x="70" y="105" fontSize="8" fill="currentColor">T₂ (isothermal)</text>
                <text x="5" y="85" fontSize="8" fill="currentColor">adiabatic</text>
                
                {/* Axis Labels */}
                <text x="10" y="20" fontSize="10" fill="currentColor">P</text>
                <text x="165" y="125" fontSize="10" fill="currentColor">V</text>
              </svg>
            </motion.div>

            {/* CAP Theorem Venn Diagram */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[35%] left-[18%] w-72 h-72 opacity-40"
              style={{
                pointerEvents: zenMode ? 'none' : 'auto',
                cursor: zenMode ? 'default' : 'pointer'
              }}
            >
              <svg 
                viewBox="0 0 400 400" 
                className={`text-electricBlue/60 ${zenMode ? 'pointer-events-none' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{ pointerEvents: zenMode ? 'none' : 'auto' }}
              >
                <g transform="translate(50, 50)" style={{ pointerEvents: zenMode ? 'none' : 'auto' }}>
                  <circle 
                    cx="150" 
                    cy="120" 
                    r="100" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    className={`text-electricBlue/30 ${zenMode ? 'pointer-events-none' : ''}`}
                    style={{ pointerEvents: zenMode ? 'none' : 'auto' }}
                  />
                  <circle 
                    cx="80" 
                    cy="250" 
                    r="100" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    className={`text-circuitGreen/30 ${zenMode ? 'pointer-events-none' : ''}`}
                    style={{ pointerEvents: zenMode ? 'none' : 'auto' }}
                  />
                  <circle 
                    cx="220" 
                    cy="250" 
                    r="100" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    className={`text-brushedAluminum/30 ${zenMode ? 'pointer-events-none' : ''}`}
                    style={{ pointerEvents: zenMode ? 'none' : 'auto' }}
                  />
                  <text x="150" y="85" fontSize="18" fill="currentColor" className={`text-electricBlue/70 ${zenMode ? 'pointer-events-none select-none' : ''}`} textAnchor="middle" style={{ pointerEvents: zenMode ? 'none' : 'auto', userSelect: zenMode ? 'none' : 'auto' }}>Consistency</text>
                  <text x="50" y="280" fontSize="18" fill="currentColor" className={`text-circuitGreen/70 ${zenMode ? 'pointer-events-none select-none' : ''}`} textAnchor="middle" style={{ pointerEvents: zenMode ? 'none' : 'auto', userSelect: zenMode ? 'none' : 'auto' }}>Availability</text>
                  <text x="250" y="280" fontSize="18" fill="currentColor" className={`text-brushedAluminum/70 ${zenMode ? 'pointer-events-none select-none' : ''}`} textAnchor="middle" style={{ pointerEvents: zenMode ? 'none' : 'auto', userSelect: zenMode ? 'none' : 'auto' }}>Partition Tolerance</text>
                  <text x="115" y="170" fontSize="14" fill="currentColor" className={`text-electricBlue/50 ${zenMode ? 'pointer-events-none select-none' : ''}`} textAnchor="middle" style={{ pointerEvents: zenMode ? 'none' : 'auto', userSelect: zenMode ? 'none' : 'auto' }}>CA</text>
                  <text x="185" y="170" fontSize="14" fill="currentColor" className={`text-circuitGreen/50 ${zenMode ? 'pointer-events-none select-none' : ''}`} textAnchor="middle" style={{ pointerEvents: zenMode ? 'none' : 'auto', userSelect: zenMode ? 'none' : 'auto' }}>CP</text>
                  <text x="150" y="250" fontSize="14" fill="currentColor" className={`text-brushedAluminum/50 ${zenMode ? 'pointer-events-none select-none' : ''}`} textAnchor="middle" style={{ pointerEvents: zenMode ? 'none' : 'auto', userSelect: zenMode ? 'none' : 'auto' }}>AP</text>
                  <text x="150" y="20" fontSize="22" fill="currentColor" className={`text-electricBlue/80 ${zenMode ? 'pointer-events-none select-none' : ''}`} textAnchor="middle" style={{ pointerEvents: zenMode ? 'none' : 'auto', userSelect: zenMode ? 'none' : 'auto' }}>CAP Theorem</text>
                </g>
              </svg>
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
                <TechIcon key={`center-${icon.src}`} icon={icon} isAnimating={isAnimating} onIconClick={handleIconClick} />
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

              {/* Additional engineering waveform */}
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[65%] right-[15%] w-32 md:w-40 h-16"
              >
                <svg viewBox="0 0 100 40" className="text-electricBlue/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 20 L10 20 L10 5 L20 5 L20 35 L30 35 L30 20 L40 20 L40 5 L50 5 L50 35 L60 35 L60 20 L70 20 L70 5 L80 5 L80 35 L90 35 L90 20 L100 20"
                  />
                </svg>
              </motion.div>

              {/* Circuit diagram pattern */}
              <motion.div
                animate={{
                  x: [0, 8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[75%] left-[20%] w-32 md:w-40 h-20"
              >
                <svg viewBox="0 0 100 60" className="text-circuitGreen/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M10 30 L30 30 M30 10 L30 50 M40 15 L40 45 M50 20 L50 40 M60 10 L60 50 M70 30 L90 30"
                  />
                </svg>
              </motion.div>

              {/* Parabola */}
              <motion.div
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[20%] left-[30%] w-28 md:w-36 h-20"
              >
                <svg viewBox="0 0 100 60" className="text-brushedAluminum/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 60 Q50 -20 100 60"
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

            {/* Musical Notes */}
            <div className="absolute inset-0">
              {MUSICAL_NOTES.map((note, index) => (
                <motion.div
                  key={note.symbol}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className="absolute text-2xl md:text-3xl text-electricBlue/50"
                  style={note.position}
                >
                  {note.symbol}
                </motion.div>
              ))}
            </div>

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
                <TechIcon 
                  key={`right-${icon.src}`} 
                  icon={icon} 
                  isAnimating={isAnimating} 
                  onIconClick={handleIconClick}
                />
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

              {/* Additional engineering waveform */}
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[65%] right-[15%] w-32 md:w-40 h-16"
              >
                <svg viewBox="0 0 100 40" className="text-electricBlue/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 20 L10 20 L10 5 L20 5 L20 35 L30 35 L30 20 L40 20 L40 5 L50 5 L50 35 L60 35 L60 20 L70 20 L70 5 L80 5 L80 35 L90 35 L90 20 L100 20"
                  />
                </svg>
              </motion.div>

              {/* Circuit diagram pattern */}
              <motion.div
                animate={{
                  x: [0, 8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[75%] left-[20%] w-32 md:w-40 h-20"
              >
                <svg viewBox="0 0 100 60" className="text-circuitGreen/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M10 30 L30 30 M30 10 L30 50 M40 15 L40 45 M50 20 L50 40 M60 10 L60 50 M70 30 L90 30"
                  />
                </svg>
              </motion.div>

              {/* Parabola */}
              <motion.div
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[20%] left-[30%] w-28 md:w-36 h-20"
              >
                <svg viewBox="0 0 100 60" className="text-brushedAluminum/40">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M0 60 Q50 -20 100 60"
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

            {/* Musical Notes */}
            <div className="absolute inset-0">
              {MUSICAL_NOTES.map((note, index) => (
                <motion.div
                  key={note.symbol}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className="absolute text-2xl md:text-3xl text-electricBlue/50"
                  style={note.position}
                >
                  {note.symbol}
                </motion.div>
              ))}
            </div>

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
