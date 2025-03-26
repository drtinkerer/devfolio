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

const Home = () => {
  return (
    <main className="min-h-screen relative cursor-none bg-black">
      <CustomCursor />
      <BackgroundPatterns />

      {/* Content */}
      <div className="relative z-10">
        <NavBar />
        <div className="w-full">
          <div className="px-5 sm:px-40">
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
