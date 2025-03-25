import React from "react";
import Script from "next/script"; // Import the Script component
import { Sparkle } from "./ui/Sparkle";
import Reveal from "./ui/Reveal";
import { certifications } from "@/data";

const Certifications = () => {
  // Removed the useEffect hook

  return (
    <section id="certifications" className="py-20 w-full">
      {/* Load the Credly embed script using next/script */}
      <Script
        src="//cdn.credly.com/assets/utilities/embed.js"
        strategy="lazyOnload" // Load after other resources, when browser is idle
        onLoad={() => {
          console.log("Credly script loaded successfully.");
          // You could potentially add logic here if needed after load,
          // but the script should automatically find and process the divs.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {certifications.map((cert) => (
          <Sparkle key={cert.id} duration={Math.floor(Math.random() * 5000) + 5000}> {/* Adjusted duration */}
            <div className="p-6 rounded-3xl bg-black-100 border border-steelGray-dark transition duration-300 hover:bg-steelGray-dark/50 hover:border-steelGray-light h-full flex flex-col items-center justify-start"> {/* Adjusted background, border, hover, and alignment */}
              <div className="flex flex-col items-center text-center space-y-4 w-full h-full"> {/* Ensure inner div takes full height */}
                {/* This div is targeted by the Credly script */}
                <div
                  data-iframe-width="150"
                  data-iframe-height="270" // Standard height for Credly badges
                  data-share-badge-id={cert.credlyBadgeId}
                  data-share-badge-host={cert.credlyBadgeHost || "https://www.credly.com"} // Default host if not provided
                  className="w-full flex justify-center mb-4 flex-shrink-0" // Added margin bottom, prevent shrinking
                >
                  {/* The Credly script will replace this content or embed an iframe here */}
                  {/* Optional: Add a placeholder while loading */}
                  <div style={{ width: 150, height: 270, backgroundColor: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '12px' }}>Loading Badge...</div>
                </div>

                {/* Fallback/Display Info - Pushed to the bottom */}
                <div className="space-y-1 w-full mt-auto pt-4 border-t border-steelGray-dark/50"> {/* Added top border, margin-top auto pushes to bottom */}
                  <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
                  <p className="text-brushedAluminum-light text-sm">{cert.issuer}</p>
                  <p className="text-steelGray-light text-xs">{cert.date}</p>
                  {/* Optional: Link to credential if badge doesn't load AND no credly ID */}
                  {!cert.credlyBadgeId && cert.credentialUrl && (
                     <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-electricBlue-light text-xs hover:underline pt-2 block">
                       View Credential
                     </a>
                  )}
                   {/* Link to Credly profile/verification if badge ID exists */}
                   {cert.credlyBadgeId && cert.credentialUrl && (
                     <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-electricBlue-light text-xs hover:underline pt-2 block">
                       Verify on Credly
                     </a>
                   )}
                </div>
              </div>
            </div>
          </Sparkle>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
