"use client";

import React, { useState } from "react";
import Reveal from "./ui/Reveal";
import { certifications } from "@/data";

const Certifications = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
    console.error(`Failed to load image for certification ID: ${id}`);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
        {certifications.map((cert) => (
          <div 
            key={cert.id} 
            className="group relative bg-black/40 rounded-3xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300 overflow-hidden backdrop-blur-sm"
          >
            {/* Background Image with Animation */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
                alt="Background"
                className="object-cover object-center opacity-10 w-full h-full transition-opacity duration-300 group-hover:opacity-20"
                loading="lazy"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative flex flex-col items-center space-y-2">
              {/* Badge Container */}
              <div className="w-[250px] h-[250px] flex items-center justify-center bg-black/20 rounded-lg">
                <div className="relative w-[200px] h-[200px]">
                  {imageErrors[cert.id] ? (
                    <img
                      src={getFallbackBadgeUrl()}
                      alt={`${cert.title} Badge`}
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={getBadgeUrl(cert.credlyBadgeId)}
                      alt={`${cert.title} Badge`}
                      className="object-contain w-full h-full"
                      loading="lazy"
                      onError={() => handleImageError(cert.id)}
                    />
                  )}
                </div>
              </div>

              {/* Certification Info */}
              <div className="text-center space-y-2 mt-4">
                <h4 className="text-xl font-bold text-white leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {cert.title}
                </h4>
                <p className="text-base font-semibold text-electricBlue-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  {cert.issuer}
                </p>
                <p className="text-sm font-medium text-circuitGreen drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  {cert.date}
                </p>
              </div>

              {/* Verification Link */}
              <a
                href={getCredentialUrl(cert.credlyBadgeId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-electricBlue text-sm font-semibold transition-colors duration-200 mt-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-electricBlue/20 px-4 py-2 rounded-full hover:bg-electricBlue/30"
              >
                Verify on Credly →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
