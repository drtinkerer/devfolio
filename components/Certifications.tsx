"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Reveal from "./ui/Reveal";
import { certifications } from "@/data";

const Certifications = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
    console.error(`Failed to load image for certification ID: ${id}`);
  };

  // Animation variants for the certification cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.3
      }
    }
  };

  // Helper functions to derive URLs from badge ID
  const getBadgeUrl = (badgeId: string) => {
    // First try to use the specific badge ID PNG file if it exists
    // Fallback to the AWS badge we know exists
    return `/credly-badges/${badgeId}.png`;
  };

  const getCredentialUrl = (badgeId: string) => {
    return `https://www.credly.com/badges/${badgeId}/public_url`;
  };

  const getFallbackBadgeUrl = () => {
    // Use the AWS badge as fallback
    return "/credly-badges/279777b5-af1c-4ecb-b311-74757d3e7184.png";
  };

  return (
    <section id="certifications" className="py-20">
      <Reveal>
        <h3 className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
          Professional{" "}
          <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
            Certifications
          </span>
        </h3>
      </Reveal>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {certifications.map((cert, index) => (
          <motion.div 
            key={cert.id} 
            className="group relative bg-black/30 rounded-3xl border border-white/10 p-3 hover:border-white/20 transition-all duration-300 overflow-hidden backdrop-blur-sm"
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(0, 212, 255, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Image with Animation */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Image
                src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
                alt="Background"
                className="object-cover object-center opacity-30 w-full h-full transition-opacity duration-300 group-hover:opacity-40 blur-[1px]"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                priority={false}
                unoptimized={true}
              />
            </motion.div>

            {/* Gradient Overlay */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black/30"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Animated border glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-electricBlue/0"
              whileHover={{
                borderColor: "rgba(0, 212, 255, 0.3)",
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <motion.div 
              className="relative flex flex-col items-center space-y-2"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {/* Badge Container - Now Clickable */}
              <motion.a 
                href={getCredentialUrl(cert.credlyBadgeId)}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-transform duration-300 hover:scale-105 block"
                aria-label={`${cert.title} - Click to verify on Credly`}
                variants={badgeVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-[160px] h-[160px] flex items-center justify-center bg-black/15 rounded-lg"
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)"
                  }}
                >
                  <div className="relative w-[130px] h-[130px]">
                    {imageErrors[cert.id] ? (
                      <Image
                        src={getFallbackBadgeUrl()}
                        alt={`${cert.title} Badge`}
                        className="object-contain"
                        fill
                        sizes="130px"
                        priority={false}
                      />
                    ) : (
                      <Image
                        src={getBadgeUrl(cert.credlyBadgeId)}
                        alt={`${cert.title} Badge`}
                        className="object-contain"
                        fill
                        sizes="130px"
                        priority={false}
                        onError={() => handleImageError(cert.id)}
                      />
                    )}
                  </div>
                </motion.div>
              </motion.a>

              {/* Certification Info */}
              <motion.div 
                className="text-center space-y-2 mt-3"
                variants={textVariants}
              >
                <motion.h4 
                  className="text-sm font-bold text-white leading-snug tracking-wide"
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {cert.title}
                </motion.h4>
                <motion.p 
                  className="text-xs font-medium text-electricBlue-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] opacity-90"
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { 
                      opacity: 0.9, 
                      y: 0,
                      transition: { delay: 0.1 }
                    }
                  }}
                >
                  {cert.issuer}
                </motion.p>
                <motion.p 
                  className="text-[11px] font-medium text-circuitGreen drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] opacity-85"
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { 
                      opacity: 0.85, 
                      y: 0,
                      transition: { delay: 0.2 }
                    }
                  }}
                >
                  {cert.date}
                </motion.p>
              </motion.div>

              {/* Verification Link */}
              <motion.a
                href={getCredentialUrl(cert.credlyBadgeId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-electricBlue text-[11px] font-medium transition-colors duration-200 mt-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-electricBlue/10 px-3 py-1 rounded-full hover:bg-electricBlue/20 opacity-75 hover:opacity-100"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { 
                    opacity: 0.75, 
                    scale: 1,
                    transition: { delay: 0.4 }
                  }
                }}
                whileHover={{ 
                  opacity: 1,
                  scale: 1.05,
                  backgroundColor: "rgba(0, 212, 255, 0.25)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Verify on Credly →
              </motion.a>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Certifications;
