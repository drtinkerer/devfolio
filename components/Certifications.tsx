import React from "react";
import Script from "next/script"; // Import the Script component
import Reveal from "./ui/Reveal";
import { certifications } from "@/data";

const Certifications = () => {
  // Removed the useEffect hook

  return (
    <section id="certifications" className="py-20">
      {/* Load the Credly embed script */}
      <Script
        src="//cdn.credly.com/assets/utilities/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Credly script loaded successfully.");
        }}
        onError={(e) => {
          console.error("Error loading Credly script:", e);
        }}
      />

      <Reveal>
        <h3 className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-semibold"> {/* Centered heading */}
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
            className="group relative bg-black/20 rounded-3xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300 overflow-hidden"
          >
            {/* Background Image with Animation */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
                alt="Background"
                className="object-cover object-center opacity-20 w-full h-full transition-opacity duration-300 group-hover:opacity-30"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative flex flex-col items-center space-y-2">
              {/* Badge Container */}
              <div className="w-[250px] h-[250px] flex items-center justify-center">
                <div
                  data-iframe-width="250"
                  data-iframe-height="250"
                  data-share-badge-id={cert.credlyBadgeId}
                  data-share-badge-host={cert.credlyBadgeHost || "https://www.credly.com"}
                />
              </div>

              {/* Certification Info */}
              <div className="text-center space-y-1 mt-2">
                <h4 className="text-base font-semibold text-white leading-tight">{cert.title}</h4>
                <p className="text-sm text-gray-400">{cert.issuer}</p>
                <p className="text-xs text-gray-500">{cert.date}</p>
              </div>

              {/* Verification Link */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electricBlue-light hover:text-electricBlue text-sm transition-colors duration-200 mt-2"
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
