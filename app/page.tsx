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

const Home = () => {
  return (
    <main className="min-h-screen relative cursor-none">
      <CustomCursor />
      {/* Animated background elements */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

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
