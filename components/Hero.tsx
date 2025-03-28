import Button from "./Button";
import Reveal from "./ui/Reveal";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";
import { useState, useEffect } from "react";
import { identities } from "../data/personal";

const Hero = () => {
  const [currentIdentityIndex, setCurrentIdentityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Effect to cycle through identities
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIdentityIndex((prevIndex) => (prevIndex + 1) % identities.length);
        setIsAnimating(false);
      }, 500); // Fade out duration
    }, 1500); // Total time each identity is displayed
    
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="pb-20 pt-36 relative">
      {/* Background Grid - Industrial Touch */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-small-steelGray-dark/[0.2] z-0"></div>

      {/* Spotlights - Tech Aesthetics */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="steelGray" // Use steelGray for a more industrial feel
        />
        <Spotlight
          className="h-[100vh] w-[50vw] top-10 left-full"
          fill="electricBlue" // Use electricBlue from the new palette
        />
        <Spotlight
          className="left-80 top-28 h-[100vh] w-[50vw]"
          fill="circuitGreen" // Use circuitGreen from the new palette
        />
      </div>

      {/* Content Area */}
      <div className="relative text-center my-8 md:my-10 mx-auto max-w-[1000px] justify-center flex flex-col z-10">
        <Reveal>
          <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-extrabold">
            Hey, {''}
            {/* Gradient using new tech colors */}
            <span className="bg-gradient-to-r from-electricBlue-light via-electricBlue to-circuitGreen bg-clip-text text-transparent">
              Bhushan Rane
            </span>
            {' '}here.
          </h1>
        </Reveal>
        {/* Enhanced two-line solution with styled identity text */}
        <div className="my-5 flex flex-col items-center">
          <h2 className="title text-2xl md:text-3xl lg:text-4xl font-semibold text-brushedAluminum-light text-center">
            I&apos;m
          </h2>
          <h2 className="title text-2xl md:text-3xl lg:text-4xl font-semibold text-center h-16 flex items-center">
            <span 
              className={`inline-block ${isAnimating ? 'opacity-0' : 'opacity-100'} bg-gradient-to-r from-brushedAluminum-light via-electricBlue/70 to-circuitGreen/80 bg-clip-text text-transparent px-3`}
              style={{ 
                transition: 'all 0.5s ease-in-out',
                transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)',
                letterSpacing: '0.02em'
              }}
            >
              {identities[currentIdentityIndex]}
            </span>
          </h2>
        </div>
        {/* Description - With reduced font size */}
        <p className="max-w-[800px] mx-auto text-sm md:text-base lg:text-lg text-white-100 mt-4">
          with expertise in building scalable infrastructure, implementing CI/CD pipelines, and leveraging data engineering and data science to drive business innovation. Let&apos;s transform your ideas into robust, data-driven solutions! 🚀
        </p>
      </div>
    </div>
  );
};

export default Hero;
