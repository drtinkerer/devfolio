"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const BackgroundPatterns = () => {
  const [clickedPositions, setClickedPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
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

  const techIcons: Array<{ src: string; alt: string; rotate?: boolean }> = [
    { src: "/floating-icons/aws-svgrepo-com.svg", alt: "" },
    { src: "/floating-icons/docker.svg", alt: "" },
    { src: "/floating-icons/google-cloud-svgrepo-com.svg", alt: "" },
    { src: "/floating-icons/kubernetes-svgrepo-com.svg", alt: "" },
    { src: "/floating-icons/linux-svgrepo-com.svg", alt: "" },
    { src: "/floating-icons/machine-learning-03.svg", alt: "" },
    { src: "/floating-icons/python-svgrepo-com.svg", alt: "" },
    { src: "/floating-icons/openai.svg", alt: "" },
    { src: "/floating-icons/argocd.svg", alt: "" }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-steelGray-dark via-black to-steelGray-dark"></div>

      {/* Circuit Pattern - Representing Computer Science */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20"></div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {techIcons.map((icon, index) => (
          <motion.div
            key={icon.alt || index}
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
            className={`absolute w-8 h-8 md:w-12 md:h-12 opacity-10 hover:opacity-30 transition-opacity`}
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

        {/* Secant Wave */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[50%] right-[2%] w-24 md:w-32 h-16"
        >
          <svg viewBox="0 0 100 50" className="text-electricBlue/40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              d="M0 0 Q25 25 50 0 T100 0"
            />
          </svg>
        </motion.div>
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

      {/* Mathematical Equations - Representing Math/Science */}
      <div className="absolute inset-0 opacity-30">
        {[
          // Physics Equations
          { eq: "E = mc²", top: "8%", right: "2%", type: "physics" },
          { eq: "F = ma", bottom: "30%", left: "2%", type: "physics" },
          { eq: "PV = nRT", top: "20%", left: "2%", type: "physics" },
          { eq: "v = u + at", bottom: "40%", right: "2%", type: "physics" },

          // Mathematics Equations
          { eq: "∫(x² + 2x + 1)dx", top: "30%", left: "2%", type: "math" },
          { eq: "πr²", top: "50%", right: "2%", type: "math" },
          { eq: "∇ × F", bottom: "20%", right: "2%", type: "math" },
          { eq: "∑(n=1 to ∞) 1/n²", top: "70%", left: "2%", type: "math" },

          // Engineering Equations
          { eq: "τ = F × r", bottom: "50%", left: "2%", type: "engineering" },
          { eq: "P = VI", top: "80%", right: "2%", type: "engineering" },
          { eq: "Q = mcΔT", bottom: "60%", right: "2%", type: "engineering" },
          { eq: "η = W/Q", top: "90%", left: "2%", type: "engineering" },
        ].map((equation, index) => (
          <motion.div
            key={equation.eq}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
              rotate: equation.type === "physics" ? [0, 2, -2, 0] :
                equation.type === "math" ? [0, -2, 2, 0] :
                  [0, 1, -1, 0],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1.5,
            }}
            className={`absolute text-base md:text-lg font-mono whitespace-nowrap ${equation.type === "physics" ? "text-circuitGreen/60" :
                equation.type === "math" ? "text-electricBlue/60" :
                  "text-brushedAluminum/60"
              } ${equation.top ? `top-[${equation.top}]` : ''} ${equation.bottom ? `bottom-[${equation.bottom}]` : ''} ${equation.left ? `left-[${equation.left}]` : ''} ${equation.right ? `right-[${equation.right}]` : ''}`}
          >
            {equation.eq}
          </motion.div>
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0">
        {/* Game Controllers */}
        {[1, 2, 3].map((icon, index) => (
          <motion.div
            key={`game-${icon}`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1.5,
            }}
            className={`absolute text-electricBlue/60 ${index === 0 ? "top-[25%] left-[2%]" :
                index === 1 ? "top-[65%] right-[2%]" :
                  "bottom-[25%] left-[2%]"
              }`}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
              <path
                fill="currentColor"
                d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z"
              />
            </svg>
          </motion.div>
        ))}

        {/* Music Notes */}
        {[1, 2].map((note, index) => (
          <motion.div
            key={`music-${note}`}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1,
            }}
            className={`absolute text-brushedAluminum/60 ${index === 0 ? "top-[45%] right-[2%]" :
                "bottom-[45%] left-[2%]"
              }`}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8">
              <path
                fill="currentColor"
                d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
              />
            </svg>
          </motion.div>
        ))}

        {/* Light Bulbs */}
        {[1, 2].map((bulb, index) => (
          <motion.div
            key={`bulb-${bulb}`}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute text-brushedAluminum/60 ${index === 0 ? "top-[75%] right-[2%]" :
                "bottom-[15%] left-[2%]"
              }`}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
              <path
                fill="currentColor"
                d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Interactive Click Effect */}
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

      {/* Additional Tech Elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Circuit Lines */}
        <motion.div
          animate={{
            pathLength: [0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-16 md:w-24 h-16 md:h-24"
        >
          <svg viewBox="0 0 100 100" className="text-electricBlue/40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M0 50 L100 50 M50 0 L50 100"
            />
          </svg>
        </motion.div>

        {/* Data Flow Lines */}
        <motion.div
          animate={{
            strokeDashoffset: [1000, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-16 md:w-24 h-16 md:h-24"
        >
          <svg viewBox="0 0 100 100" className="text-electricBlue/40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="10 5"
              d="M0 50 L100 50"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default BackgroundPatterns; 