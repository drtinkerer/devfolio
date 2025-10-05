"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useZenMode } from "@/lib/ZenModeContext";

interface Spaceship {
  x: number;
  y: number;
}

interface Bullet {
  id: string;
  x: number;
  y: number;
  velocity: number;
}

interface GameState {
  score: number;
  isActive: boolean;
}

interface ZenSpaceShooterProps {
  techIcons: Array<{ 
    src: string; 
    alt: string; 
    position: { x: number; y: number };
    gamePosition: { x: number; y: number };
    velocity: { x: number; y: number };
  }>;
  onIconDestroy?: (iconSrc: string) => void;
  onResetGame?: () => void;
}

const ZenSpaceShooter: React.FC<ZenSpaceShooterProps> = ({ techIcons, onIconDestroy, onResetGame }) => {
  const { zenMode } = useZenMode();
  const [spaceship, setSpaceship] = useState<Spaceship>({ x: 50, y: 95 }); // Fixed at bottom
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [gameState, setGameState] = useState<GameState>({ score: 0, isActive: false });
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [destroyedIcons, setDestroyedIcons] = useState<Set<string>>(new Set());
  const [showInstructions, setShowInstructions] = useState(false);
  const animationRef = useRef<number>();
  const bulletIdRef = useRef(0);
  const spaceKeyPressedRef = useRef(false);

  // Initialize game when zen mode is activated
  useEffect(() => {
    if (zenMode) {
      setGameState({ score: 0, isActive: true });
      setDestroyedIcons(new Set());
      setShowInstructions(true);
      // Hide instructions after 5 seconds
      setTimeout(() => {
        setShowInstructions(false);
      }, 5000);
    } else {
      setGameState({ score: 0, isActive: false });
      setBullets([]);
      setShowInstructions(false);
    }
  }, [zenMode]);

  // Keyboard input handling
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!zenMode) return;

    // Hide instructions when SPACE is pressed
    if (showInstructions && event.key === ' ') {
      event.preventDefault();
      setShowInstructions(false);
      return;
    }

    // Don't process other keys when instructions are showing
    if (showInstructions) {
      return;
    }

    if (!gameState.isActive) return;

    setKeysPressed(prev => new Set(prev).add(event.key));

    // Shoot with spacebar - only on first press, not when held
    if (event.key === ' ' && !spaceKeyPressedRef.current) {
      event.preventDefault();
      spaceKeyPressedRef.current = true;
      const bulletId = `bullet-${bulletIdRef.current++}`;
      setBullets(prev => [...prev, {
        id: bulletId,
        x: spaceship.x,
        y: spaceship.y - 2,
        velocity: -2.5 // Slightly slower bullets for better gameplay
      }]);
    }
  }, [zenMode, gameState.isActive, showInstructions, spaceship.x, spaceship.y]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setKeysPressed(prev => {
      const newSet = new Set(prev);
      newSet.delete(event.key);
      return newSet;
    });

    // Reset space key flag when released
    if (event.key === ' ') {
      spaceKeyPressedRef.current = false;
    }
  }, []);

  // Update spaceship position
  useEffect(() => {
    if (!zenMode || !gameState.isActive || showInstructions) return;

    const speed = 1.5; // Smoother movement
    
    const updateSpaceship = () => {
      setSpaceship(prev => {
        let newX = prev.x;
        
        if (keysPressed.has('ArrowLeft')) {
          newX = Math.max(2, prev.x - speed);
        }
        if (keysPressed.has('ArrowRight')) {
          newX = Math.min(98, prev.x + speed);
        }
        // Remove Y movement - spaceship locked to bottom
        // if (keysPressed.has('ArrowUp') || keysPressed.has('w') || keysPressed.has('W')) {
        //   return { ...prev, x: newX, y: Math.max(20, prev.y - speed) };
        // }
        // if (keysPressed.has('ArrowDown') || keysPressed.has('s') || keysPressed.has('S')) {
        //   return { ...prev, x: newX, y: Math.min(90, prev.y + speed) };
        // }
        
        return { ...prev, x: newX, y: 95 }; // Keep Y fixed at bottom
      });
    };

    if (keysPressed.size > 0) {
      const interval = setInterval(updateSpaceship, 20); // Slightly slower for smoother movement
      return () => clearInterval(interval);
    }
  }, [keysPressed, zenMode, gameState.isActive, showInstructions]);

  // Bullet movement and collision detection
  useEffect(() => {
    if (!zenMode || !gameState.isActive || showInstructions) return;

    const gameLoop = () => {
      // Update bullets
      setBullets(prev => 
        prev
          .map(bullet => ({ ...bullet, y: bullet.y + bullet.velocity }))
          .filter(bullet => bullet.y > -5 && bullet.y < 105)
      );

      // Check collisions between bullets and tech icons
      setBullets(prevBullets => {
        const remainingBullets: Bullet[] = [];
        let hitIcons: string[] = [];

        prevBullets.forEach(bullet => {
          let bulletHit = false;

          techIcons.forEach(icon => {
            if (destroyedIcons.has(icon.src)) return;

            // Improved collision detection using game position
            const iconX = icon.gamePosition.x;
            const iconY = icon.gamePosition.y;
            const iconSize = 8; // Slightly larger hit area for better detection
            const dx = Math.abs(bullet.x - iconX);
            const dy = Math.abs(bullet.y - iconY);

            // Use circular collision detection for better accuracy
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (
              distance <= iconSize &&
              !bulletHit &&
              !destroyedIcons.has(icon.src) // Double-check not already destroyed
            ) {
              bulletHit = true;
              if (!hitIcons.includes(icon.src)) {
                hitIcons.push(icon.src);
              }
            }
          });

          if (!bulletHit) {
            remainingBullets.push(bullet);
          }
        });

        // Handle destroyed icons - immediate state updates for reliability
        if (hitIcons.length > 0) {
          // Immediately mark icons as destroyed to prevent double hits
          setDestroyedIcons(prev => {
            const newSet = new Set(prev);
            hitIcons.forEach(iconSrc => {
              newSet.add(iconSrc);
            });
            return newSet;
          });

          // Update score immediately
          setGameState(prev => ({
            ...prev,
            score: prev.score + (hitIcons.length * 100)
          }));

          // Notify parent immediately - using requestAnimationFrame for better timing
          requestAnimationFrame(() => {
            hitIcons.forEach(iconSrc => {
              onIconDestroy?.(iconSrc);
            });
          });
        }

        return remainingBullets;
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [zenMode, gameState.isActive, showInstructions, techIcons, destroyedIcons, onIconDestroy]);

  // Reset game function
  const resetGame = useCallback(() => {
    setGameState({ score: 0, isActive: true });
    setDestroyedIcons(new Set());
    setBullets([]);
    // Reset the parent component's destroyed icons
    onResetGame?.();
  }, [onResetGame]);

  // Expose reset function to window for navbar access
  useEffect(() => {
    if (zenMode) {
      (window as any).resetZenGame = resetGame;
    } else {
      delete (window as any).resetZenGame;
    }
    return () => {
      delete (window as any).resetZenGame;
    };
  }, [zenMode, resetGame]);

  // Event listeners
  useEffect(() => {
    if (!zenMode) return;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [zenMode, handleKeyDown, handleKeyUp]);

  // Only render when in zen mode
  if (!zenMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30">

      {/* Game UI */}
      <div className="absolute top-4 left-4 text-electricBlue font-mono text-lg pointer-events-none z-50">
        <div className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded">
          Score: {gameState.score}
        </div>
      </div>

      {/* Simple Instructions Modal when zen mode starts */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/90 backdrop-blur-sm border border-electricBlue/50 rounded-lg p-6 text-center"
            >
              <div className="text-electricBlue text-2xl font-mono mb-4">ZEN SPACE SHOOTER</div>
              <div className="text-white/80 font-mono space-y-2 mb-6">
                <div>←/→: Move • SPACE: Shoot</div>
                <div className="text-electricBlue">Destroy the floating tech icons!</div>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="bg-electricBlue text-black px-6 py-2 rounded font-mono font-semibold hover:bg-electricBlue/80 transition-colors"
              >
                PRESS SPACE TO START
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Spaceship */}
      <motion.div
        className="absolute pointer-events-none z-40"
        style={{
          left: `${spaceship.x}%`,
          top: `${spaceship.y}%`,
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
        animate={{
          y: [0, -3, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Spaceship SVG - Bold and Distinct Design */}
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <svg width="60" height="75" viewBox="0 0 80 100" className="drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">
            <defs>
              {/* Bold gradient for main body */}
              <linearGradient id="shipBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#00FFFF" />
                <stop offset="60%" stopColor="#0099FF" />
                <stop offset="100%" stopColor="#0066CC" />
              </linearGradient>

              {/* Electric blue gradient for wings */}
              <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#39FF14" />
                <stop offset="50%" stopColor="#00FFFF" />
                <stop offset="100%" stopColor="#0088FF" />
              </linearGradient>

              {/* Bright engine core */}
              <radialGradient id="engineCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FF8800" />
                <stop offset="80%" stopColor="#FF0000" />
                <stop offset="100%" stopColor="#CC0000" />
              </radialGradient>

              {/* Strong glow filter */}
              <filter id="shipGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Cockpit glow */}
              <radialGradient id="cockpitGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#87CEEB" />
                <stop offset="100%" stopColor="#00FFFF" />
              </radialGradient>
            </defs>

            {/* Strong shadow for depth */}
            <path
              d="M40 5 L55 35 L50 32 L40 25 L30 32 L25 35 Z"
              fill="#000000"
              opacity="0.6"
              transform="translate(3,3)"
            />

            {/* Main ship body - larger and bolder */}
            <path
              d="M40 5 L55 35 L50 32 L40 25 L30 32 L25 35 Z"
              fill="url(#shipBodyGradient)"
              stroke="#FFFFFF"
              strokeWidth="3"
              filter="url(#shipGlow)"
            />

            {/* Side body panels for depth */}
            <path
              d="M30 32 L25 35 L25 60 L30 55 Z"
              fill="#0088FF"
              stroke="#00FFFF"
              strokeWidth="2"
              opacity="0.9"
            />
            <path
              d="M50 32 L55 35 L55 60 L50 55 Z"
              fill="#0088FF"
              stroke="#00FFFF"
              strokeWidth="2"
              opacity="0.9"
            />

            {/* Large glowing cockpit */}
            <ellipse
              cx="40"
              cy="18"
              rx="8"
              ry="12"
              fill="url(#cockpitGlow)"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              filter="url(#shipGlow)"
            />
            <ellipse
              cx="40"
              cy="18"
              rx="4"
              ry="6"
              fill="#FFFFFF"
              opacity="0.9"
            />

            {/* Bold wings */}
            <path
              d="M25 35 L8 60 L15 56 L25 48 Z"
              fill="url(#wingGradient)"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              filter="url(#shipGlow)"
            />
            <path
              d="M55 35 L72 60 L65 56 L55 48 Z"
              fill="url(#wingGradient)"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              filter="url(#shipGlow)"
            />

            {/* Wing lights - bright and visible */}
            <circle cx="18" cy="54" r="3" fill="#39FF14" stroke="#FFFFFF" strokeWidth="1.5">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="62" cy="54" r="3" fill="#39FF14" stroke="#FFFFFF" strokeWidth="1.5">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite"/>
            </circle>

            {/* Large engine cores */}
            <circle
              cx="30"
              cy="50"
              r="6"
              fill="url(#engineCore)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="6"
              fill="url(#engineCore)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />

            {/* Bright engine inner glow */}
            <circle cx="30" cy="50" r="4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="50" cy="50" r="4" fill="#FFFFFF" opacity="0.95" />

            {/* Central hull accent */}
            <rect
              x="38"
              y="35"
              width="4"
              height="20"
              fill="#00FFFF"
              stroke="#FFFFFF"
              strokeWidth="1"
              rx="2"
            />

            {/* Bright nose cone */}
            <circle cx="40" cy="8" r="3" fill="#FFFFFF" stroke="#00FFFF" strokeWidth="2">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="0.8s" repeatCount="indefinite"/>
            </circle>

            {/* Hull detail lines */}
            <line x1="35" y1="25" x2="35" y2="50" stroke="#00FFFF" strokeWidth="1.5" opacity="0.7"/>
            <line x1="45" y1="25" x2="45" y2="50" stroke="#00FFFF" strokeWidth="1.5" opacity="0.7"/>
          </svg>

          {/* Subtle dual engine trails */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '55%', left: 'calc(50% - 2px)' }}>
            {/* Left engine trail */}
            <motion.div
              className="absolute w-1.5 h-8 bg-gradient-to-b from-orange-400 via-orange-500 to-transparent rounded-full"
              style={{
                left: '-10px',
                top: '0px'
              }}
              animate={{
                scaleY: [0.8, 1.1, 0.8],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Right engine trail */}
            <motion.div
              className="absolute w-1.5 h-8 bg-gradient-to-b from-orange-400 via-orange-500 to-transparent rounded-full"
              style={{
                left: '8px',
                top: '0px'
              }}
              animate={{
                scaleY: [0.8, 1.1, 0.8],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Strong pulsing energy field */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 20px rgba(0,255,255,0.4)",
                "0 0 35px rgba(0,255,255,0.7)",
                "0 0 20px rgba(0,255,255,0.4)"
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Bullets */}
      <AnimatePresence>
        {bullets.map(bullet => (
          <motion.div
            key={bullet.id}
            className="absolute pointer-events-none"
            style={{
              left: `${bullet.x}%`,
              top: `${bullet.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            {/* Energy bullet with glow effect */}
            <div className="relative w-2 h-6 -translate-x-1/2 -translate-y-1/2">
              {/* Core bullet */}
              <div className="absolute inset-0 bg-gradient-to-t from-electricBlue via-cyan-300 to-white rounded-full shadow-[0_0_12px_rgba(0,255,255,0.9)]"></div>

              {/* Outer glow */}
              <motion.div
                className="absolute inset-0 bg-electricBlue/30 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Trail effect */}
              <motion.div
                className="absolute w-1 h-3 top-full left-1/2 -translate-x-1/2 bg-gradient-to-b from-electricBlue/60 to-transparent rounded-full"
                animate={{
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Subtle space particles - reduced for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-6 bg-gradient-to-b from-white/40 to-transparent"
            style={{
              left: `${25 + i * 50}%`,
              top: "-5%",
            }}
            animate={{
              y: ["0vh", "105vh"]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ZenSpaceShooter;