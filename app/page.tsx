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

const Home = () => {
  return (
    // Add overflow-x-hidden to prevent horizontal scrollbar
    <main className="min-h-screen relative bg-black overflow-x-hidden">
      <CustomCursor />
      <BackgroundPatterns />

      {/* Content */}
      <div className="relative z-10">
        <NavBar />
        {/* Apply max-width and mx-auto to center the content block */}
        {/* Retain padding for spacing within the centered block */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="px-5 sm:px-10 md:px-20 lg:px-40"> {/* Adjusted padding slightly for responsiveness */}
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Home;
