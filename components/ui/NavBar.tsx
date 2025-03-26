"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems, socialMedia } from "@/data";
import { User, Briefcase, Code2, Award, Mail, Download } from "lucide-react";

const iconMap = {
  About: User,
  Projects: Code2,
  Experience: Briefcase,
  Certifications: Award,
  Contact: Mail,
};

const NavBar = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Handle initial scroll position
    const handleInitialScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    handleInitialScroll();
    window.addEventListener("scroll", handleInitialScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleInitialScroll);
    };
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "assets/CV.pdf";
    link.download = "Atzin-Escandia-CV.pdf";
    link.click();
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
      className="fixed top-0 left-0 right-0 h-16 shadow-lg backdrop-blur-3xl border-b-2 border-white/10 flex items-center justify-between z-50 px-4"
    >
      <div className="flex items-center space-x-4 sm:space-x-8">
        {navItems.map(({ name, link }, index) => {
          const isActive = link === "#" ? !activeSection : `#${activeSection}` === link;
          const Icon = iconMap[name as keyof typeof iconMap];

          return (
            <Link
              key={`nav-item-${index}`}
              href={link}
              onClick={(e) => {
                e.preventDefault();
                const sectionId = link.replace('#', '');
                if (sectionId === '') {
                  setActiveSection('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setActiveSection(sectionId);
                  const element = document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ease-in-out",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline-block">
                {name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center space-x-4">
        {socialMedia.map(({ id, link, img }) => (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 cursor-pointer flex justify-center items-center transform transition-all duration-300 ease-in-out hover:scale-110"
          >
            <img src={img} alt="social-icon" width={16} height={16} />
          </a>
        ))}
        <button
          onClick={handleDownloadCV}
          className="group relative flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 text-white transition-all duration-300 hover:bg-transparent"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
          <span className="absolute inset-0 rounded-full border border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <Download className="w-4 h-4 relative z-10" />
          <span className="text-sm font-medium hidden sm:inline-block relative z-10">
            My CV
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
