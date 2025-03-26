"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const BackgroundPatterns = () => {
  const [clickedPositions, setClickedPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mounted, setMounted] = useState(false);

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
        
        setTimeout(() => {
          setClickedPositions(prev => prev.filter(pos => pos.id !== newPosition.id));
        }, 2000);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const techIcons = [
    { src: "/aws-svgrepo-com.svg", alt: "AWS" },
    { src: "/google-cloud-svgrepo-com.svg", alt: "Google Cloud" },
    { src: "/kubernetes-svgrepo-com.svg", alt: "Kubernetes" },
    { src: "/linux-svgrepo-com.svg", alt: "Linux" },
    { src: "/python-svgrepo-com.svg", alt: "Python" },
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
            key={icon.alt}
            initial={{
              x: `${Math.random() * 80 + 10}vw`,
              y: `${Math.random() * 80 + 10}vh`,
            }}
            animate={{
              rotate: 360,
              x: [`${Math.random() * 80 + 10}vw`, `${Math.random() * 80 + 10}vw`],
              y: [`${Math.random() * 80 + 10}vh`, `${Math.random() * 80 + 10}vh`],
            }}
            transition={{
              rotate: {
                duration: 15 + index * 5,
                repeat: Infinity,
                ease: "linear",
              },
              x: {
                duration: 30 + index * 7,
                repeat: Infinity,
                yoyo: true,
                ease: "easeInOut",
              },
              y: {
                duration: 25 + index * 7,
                repeat: Infinity,
                yoyo: true,
                ease: "easeInOut",
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

      {/* Name in Background with Kubernetes Icon */}
      <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-3xl md:text-5xl font-bold text-electricBlue/10 whitespace-nowrap"
        >
          Hey, I am Bhushan
        </motion.div>
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-12 h-12 md:w-16 md:h-16"
        >
          <Image
            src="/kubernetes.svg"
            alt="Kubernetes"
            width={64}
            height={64}
            className="w-full h-full"
          />
        </motion.div>
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
            className={`absolute text-base md:text-lg font-mono whitespace-nowrap ${
              equation.type === "physics" ? "text-circuitGreen/60" :
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
            className={`absolute text-electricBlue/60 ${
              index === 0 ? "top-[25%] left-[2%]" :
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
            className={`absolute text-brushedAluminum/60 ${
              index === 0 ? "top-[45%] right-[2%]" :
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

        {/* Gears */}
        {[1, 2].map((gear, index) => (
          <motion.div
            key={`gear-${gear}`}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute text-electricBlue/60 ${
              index === 0 ? "top-[35%] right-[2%]" :
              "bottom-[35%] left-[2%]"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
              <path
                fill="currentColor"
                d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
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
            className={`absolute text-brushedAluminum/60 ${
              index === 0 ? "top-[75%] right-[2%]" :
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
                { text: "∑", color: "text-electricBlue/60" },
                { text: "∫", color: "text-electricBlue/60" },
                { text: "π", color: "text-brushedAluminum/60" },
                { text: "∞", color: "text-electricBlue/60" },
                { text: "∇", color: "text-electricBlue/60" },
                { text: "λ", color: "text-brushedAluminum/60" },
                { text: "Ω", color: "text-electricBlue/60" },
                { text: "Φ", color: "text-electricBlue/60" },
                { text: "Ψ", color: "text-brushedAluminum/60" },
                { text: "Δ", color: "text-electricBlue/60" },
                { text: "Γ", color: "text-electricBlue/60" },
                { text: "Θ", color: "text-brushedAluminum/60" },
              ];

              return (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{ 
                    x: Math.cos(angle * Math.PI / 180) * 100,
                    y: Math.sin(angle * Math.PI / 180) * 100,
                    opacity: [1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: i * 0.05,
                  }}
                  className={`absolute font-mono text-xl md:text-2xl ${symbols[i].color}`}
                  style={{
                    transformOrigin: "center center",
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

        {/* Rotating Gears */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[15%] left-[15%] w-20 md:w-32 h-20 md:h-32"
        >
          <svg viewBox="0 0 100 100" className="text-electricBlue/40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10 M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20 M50 10 L50 5 L55 10 L50 15 L45 10 L50 5 M50 90 L50 95 L55 90 L50 85 L45 90 L50 95 M10 50 L5 50 L10 55 L15 50 L10 45 L5 50 M90 50 L95 50 L90 55 L85 50 L90 45 L95 50"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[25%] right-[15%] w-16 md:w-24 h-16 md:h-24"
        >
          <svg viewBox="0 0 100 100" className="text-electricBlue/40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M50 15 A35 35 0 1 1 50 85 A35 35 0 1 1 50 15 M50 25 A25 25 0 1 1 50 75 A25 25 0 1 1 50 25 M50 15 L50 10 L55 15 L50 20 L45 15 L50 10 M50 85 L50 90 L55 85 L50 80 L45 85 L50 90 M15 50 L10 50 L15 55 L20 50 L15 45 L10 50 M85 50 L90 50 L85 55 L80 50 L85 45 L90 50"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[25%] left-[20%] w-24 md:w-36 h-24 md:h-36"
        >
          <svg viewBox="0 0 100 100" className="text-brushedAluminum/40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M50 5 A45 45 0 1 1 50 95 A45 45 0 1 1 50 5 M50 15 A35 35 0 1 1 50 85 A35 35 0 1 1 50 15 M50 5 L50 0 L55 5 L50 10 L45 5 L50 0 M50 95 L50 100 L55 95 L50 90 L45 95 L50 100 M5 50 L0 50 L5 55 L10 50 L5 45 L0 50 M95 50 L100 50 L95 55 L90 50 L95 45 L100 50"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[15%] right-[20%] w-20 md:w-28 h-20 md:h-28"
        >
          <svg viewBox="0 0 100 100" className="text-electricBlue/40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10 M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20 M50 10 L50 5 L55 10 L50 15 L45 10 L50 5 M50 90 L50 95 L55 90 L50 85 L45 90 L50 95 M10 50 L5 50 L10 55 L15 50 L10 45 L5 50 M90 50 L95 50 L90 55 L85 50 L90 45 L95 50"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default BackgroundPatterns; 