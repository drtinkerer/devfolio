"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavBar from "@/components/ui/NavBar";
import Certifications from "@/components/Certifications";
import CustomCursor from "@/components/ui/CustomCursor";
import BackgroundPatterns from "@/components/ui/BackgroundPatterns";
import { motion } from "framer-motion";
import { useZenMode } from "@/lib/ZenModeContext";

const Home = () => {
  const { zenMode } = useZenMode();

  return (
    // Add overflow-x-hidden to prevent horizontal scrollbar
    <main className={`min-h-screen relative bg-black overflow-x-hidden ${zenMode ? 'zen-mode' : ''}`}>
      <CustomCursor />
      <BackgroundPatterns />

      {/* Content */}
      <div className="relative z-10">
        <NavBar />
        {/* Apply max-width and mx-auto to center the content block */}
        {/* Retain padding for spacing within the centered block */}
        <div className={`w-full max-w-7xl mx-auto ${zenMode ? 'hide-content' : ''}`}>
          <div className="px-5 sm:px-10 md:px-20 lg:px-40"> {/* Adjusted padding slightly for responsiveness */}
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </div>
        </div>
        {/* Make footer full-width by placing it outside the centered wrapper */}
        <Footer />
      </div>
    </main>
  );
};

export default Home;
