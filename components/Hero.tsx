import Button from "./Button";
import Reveal from "./ui/Reveal";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";

const Hero = () => {
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
      <div className="relative text-center my-20 mx-auto max-w-[900px] justify-center flex flex-col z-10">
        <Reveal>
          <h1 className="text-center text-4xl md:text-6xl lg:text-8xl font-extrabold">
            Hey, I&apos;m {''}
            {/* Gradient using new tech colors */}
            <span className="bg-gradient-to-r from-electricBlue-light via-electricBlue to-circuitGreen bg-clip-text text-transparent">
              Bhushan Rane!
            </span>
          </h1>
        </Reveal>
        {/* Subtitle - Adjusted styling */}
        <h2 className="title my-6 text-2xl md:text-4xl lg:text-5xl font-semibold text-brushedAluminum-light">
          I&apos;m a DevOps & Cloud Specialist
        </h2>
        {/* Description - Adjusted styling */}
        <p className="max-w-[700px] mx-auto text-white-100">
          A DevOps engineer and cloud architect with expertise in building scalable infrastructure, implementing CI/CD pipelines, and leveraging data engineering and data science to drive business innovation. Let&apos;s transform your ideas into robust, data-driven solutions! 🚀
        </p>
        {/* Button - Ensure it uses new theme colors (may need Button component update later) */}
        <a className="mt-10 mx-auto" href="#contact">
          <Button
            title="Contact me"
            icon={
              <div className="relative w-6 h-6">
                <Image 
                  src="/assets/send.svg" 
                  alt="Send Icon" 
                  fill
                  priority={true}
                />
              </div>
            }
            position="right"
            // Optional: Add specific classes if Button doesn't inherit theme
            // otherClasses="bg-electricBlue hover:bg-electricBlue-dark text-black-100"
          />
        </a>
      </div>
    </div>
  );
};

export default Hero;
