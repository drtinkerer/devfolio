"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import Reveal from "./ui/Reveal";
import { certifications } from "@/data";

// Declare global Credly type
declare global {
  interface Window {
    Credly?: {
      init: () => void;
      addBadges: () => void;
    };
  }
}

const Certifications = () => {
  useEffect(() => {
    // Function to initialize badges
    const initBadges = () => {
      const script = document.createElement('script');
      script.src = "//cdn.credly.com/assets/utilities/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.Credly) {
          window.Credly.init();
          // Add a small delay to ensure DOM is ready
          setTimeout(() => {
            if (window.Credly && window.Credly.addBadges) {
              window.Credly.addBadges();
            }
          }, 1000);
        }
      };
      document.body.appendChild(script);
    };

    initBadges();

    return () => {
      // Cleanup script on unmount
      const script = document.querySelector('script[src="//cdn.credly.com/assets/utilities/embed.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
                <div
                  className="credly-badge"
                  data-iframe-width="250"
                  data-iframe-height="250"
                  data-share-badge-id={cert.credlyBadgeId}
                  data-share-badge-host="https://www.credly.com"
                />
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
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-electricBlue text-sm font-semibold transition-colors duration-200 mt-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-electricBlue/20 px-4 py-2 rounded-full hover:bg-electricBlue/30"
                >
                  Verify on Credly →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
