"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems, socialMedia } from "@/data";
import { User, Briefcase, Code2, Award, Mail, Download, Github, Linkedin, Instagram, BookOpen, Eye, EyeOff, Menu, X } from "lucide-react";
import { useZenMode } from "@/lib/ZenModeContext";
import { smoothScrollTo } from "@/utils/smoothScroll";

const iconMap = {
  About: User,
  Projects: Code2,
  Experience: Briefcase,
  Certifications: Award,
  Contact: Mail,
} as const;

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/drtinkerer",
    color: "hover:text-gray-400"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/drtinkerer",
    color: "hover:text-blue-500"
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/drtinkerer",
    color: "hover:text-pink-500"
  },
  {
    name: "Medium",
    icon: BookOpen,
    href: "https://medium.com/@drtinkerer",
    color: "hover:text-gray-600"
  }
];

const NavBar = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isZenButtonHovered, setIsZenButtonHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { zenMode, toggleZenMode } = useZenMode();

  // Memoize observer options
  const observerOptions = useMemo(() => ({
    root: null,
    rootMargin: "-20% 0px -20% 0px",
    threshold: 0
  }), []);

  // Memoize intersection observer callback
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (id) {
          setActiveSection(id);
        }
      }
    });
  }, []);

  // Handle scroll events to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [observerCallback, observerOptions]);

  // Handle navigation click
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      smoothScrollTo(section, 800, 'easeInOutCubic', 60); 
      setActiveSection(sectionId);
      // Close mobile menu after navigation
      setMobileMenuOpen(false);
    }
  }, []);

  // Memoize handleDownloadCV
  const handleDownloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "assets/CV.pdf";
    link.download = "Bhushan-Rane-CV.pdf";
    link.click();
  }, []);

  // Memoize nav items
  const memoizedNavItems = useMemo(() => navItems, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled && !zenMode ? 'backdrop-blur-sm border-b border-white/5' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {memoizedNavItems.map((item) => {
              const Icon = iconMap[item.name as keyof typeof iconMap];
              const sectionId = item.link.replace("#", "");
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, sectionId)}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium transition-colors",
                    activeSection === sectionId
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Mobile Navigation - Shown only on mobile */}
          <div className={`md:hidden absolute top-16 left-0 right-0 bg-black-100/95 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0 overflow-hidden'}`}>
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {memoizedNavItems.map((item) => {
                const Icon = iconMap[item.name as keyof typeof iconMap];
                const sectionId = item.link.replace("#", "");
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={(e) => handleNavClick(e, sectionId)}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors p-2 rounded-md",
                      activeSection === sectionId
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile social links */}
              <div className="flex items-center space-x-4 pt-2 pb-1 border-t border-white/10 mt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      "text-muted-foreground transition-colors duration-200 p-2",
                      social.color
                    )}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Only show zen mode toggle all the time */}
            <button
              onClick={toggleZenMode}
              onMouseEnter={() => setIsZenButtonHovered(true)}
              onMouseLeave={() => setIsZenButtonHovered(false)}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-all duration-300 rounded-full px-3 py-2 zen-mode-toggle",
                zenMode 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:text-primary",
                isZenButtonHovered && !zenMode
                  ? "bg-primary/10 text-primary"
                  : ""
              )}
              aria-label="Toggle Zen Mode"
            >
              {zenMode ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span className="hidden sm:inline">Exit Zen</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Zen</span>
                </>
              )}
            </button>
            
            {/* Social links - only visible on desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-muted-foreground transition-colors duration-200",
                    social.color
                  )}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            {/* CV button - Simplified on mobile */}
            <button
              onClick={handleDownloadCV}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-all duration-300 rounded-full px-3 py-2",
                isButtonHovered 
                  ? "bg-primary/10 text-primary" 
                  : "text-primary hover:text-primary/80"
              )}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">CV</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
