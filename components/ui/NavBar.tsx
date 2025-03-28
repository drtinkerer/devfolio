"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems, socialMedia } from "@/data";
import { User, Briefcase, Code2, Award, Mail, Download, Github, Linkedin, Instagram, BookOpen, Eye, EyeOff } from "lucide-react";
import { useZenMode } from "@/lib/ZenModeContext";

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
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
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
    <nav className="fixed top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
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
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleZenMode}
              onMouseEnter={() => setIsZenButtonHovered(true)}
              onMouseLeave={() => setIsZenButtonHovered(false)}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-all duration-300 rounded-full px-4 py-2 zen-mode-toggle",
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
                  <span>Exit Zen Mode</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Zen Mode</span>
                </>
              )}
            </button>
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
            <button
              onClick={handleDownloadCV}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-all duration-300 rounded-full px-4 py-2",
                isButtonHovered 
                  ? "bg-primary/10 text-primary" 
                  : "text-primary hover:text-primary/80"
              )}
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
