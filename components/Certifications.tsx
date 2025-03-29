"use client";

import React, { useState } from "react";
import Image from 'next/image';
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-20">
        {certifications.map((cert) => (
          <div 
            key={cert.id} 
            className="group relative bg-black/30 rounded-3xl border border-white/10 p-3 hover:border-white/20 transition-all duration-300 overflow-hidden backdrop-blur-sm"
          >
            {/* Background Image with Animation */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
                alt="Background"
                className="object-cover object-center opacity-30 w-full h-full transition-opacity duration-300 group-hover:opacity-40 blur-[1px]"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                priority={false}
                unoptimized={true}
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative flex flex-col items-center space-y-2">
              {/* Badge Container - Now Clickable */}
              <a 
                href={getCredentialUrl(cert.credlyBadgeId)}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                aria-label={`${cert.title} - Click to verify on Credly`}
              >
                <div className="w-[180px] h-[180px] flex items-center justify-center bg-black/15 rounded-lg">
                  <div className="relative w-[150px] h-[150px]">
                    {imageErrors[cert.id] ? (
                      <Image
                        src={getFallbackBadgeUrl()}
                        alt={`${cert.title} Badge`}
                        className="object-contain"
                        fill
                        sizes="150px"
                        priority={false}
                      />
                    ) : (
                      <Image
                        src={getBadgeUrl(cert.credlyBadgeId)}
                        alt={`${cert.title} Badge`}
                        className="object-contain"
                        fill
                        sizes="150px"
                        priority={false}
                        onError={() => handleImageError(cert.id)}
                      />
                    )}
                  </div>
                </div>
              </a>

              {/* Certification Info */}
              <div className="text-center space-y-2 mt-3">
                <h4 className="text-sm font-bold text-white leading-snug tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] line-clamp-2 min-h-[2.5rem]">
                  {cert.title}
                </h4>
                <p className="text-xs font-medium text-electricBlue-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] opacity-90">
                  {cert.issuer}
                </p>
                <p className="text-[11px] font-medium text-circuitGreen drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] opacity-85">
                  {cert.date}
                </p>
              </div>

              {/* Verification Link */}
              <a
                href={getCredentialUrl(cert.credlyBadgeId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-electricBlue text-[11px] font-medium transition-colors duration-200 mt-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-electricBlue/10 px-3 py-1 rounded-full hover:bg-electricBlue/20 opacity-75 hover:opacity-100"
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
