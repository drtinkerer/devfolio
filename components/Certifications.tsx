import React, { useEffect } from "react";
import { Sparkle } from "./ui/Sparkle";
import Reveal from "./ui/Reveal";
import { certifications } from "@/data";
import Script from "next/script";

const Certifications = () => {
  useEffect(() => {
    // Load Credly embed script
    const script = document.createElement('script');
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="certifications" className="py-20 w-full">
      <Reveal>
        <h3 className="mb-10">
          Professional Certifications{" "}
          <span className="bg-gradient-to-r from-green to-emerald-700 bg-clip-text text-transparent">
            Certifications.
          </span>
        </h3>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {certifications.map((cert) => (
          <Sparkle key={cert.id} duration={Math.floor(Math.random() * 10000) + 10000}>
            <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] transition duration-200 hover:bg-white/[0.08] h-full flex flex-col items-center justify-center">
              <div className="flex flex-col items-center text-center space-y-6 w-full">
                {cert.credlyBadgeId ? (
                  <div 
                    data-iframe-width="150" 
                    data-iframe-height="270" 
                    data-share-badge-id={cert.credlyBadgeId}
                    data-share-badge-host={cert.credlyBadgeHost}
                    className="w-full flex justify-center"
                  />
                ) : (
                  <img
                    src={cert.badgeUrl}
                    alt={`${cert.title} badge`}
                    className="w-32 h-32 object-contain"
                  />
                )}
                <div className="space-y-2 w-full">
                  <h4 className="text-xl font-bold text-white">{cert.title}</h4>
                  <p className="text-white/90">{cert.issuer}</p>
                  <p className="text-sm text-white/70">{cert.date}</p>
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