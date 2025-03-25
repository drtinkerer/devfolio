"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems } from "@/data";

const NavBar = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    // Get all sections with IDs
    const sections = document.querySelectorAll("section[id]");
    
    // Set initial active section based on scroll position
    const setInitialActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let activeId = "";
      
      // Check if we're at the top of the page
      if (window.scrollY < 100) {
        setActiveSection("");
        return;
      }
      
      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          activeId = section.id;
        }
      });
      
      if (activeId) {
        setActiveSection(activeId);
      }
    };

    // Set initial active section
    setInitialActiveSection();

    // Observe all sections
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Add scroll event listener for better section detection
    window.addEventListener("scroll", setInitialActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", setInitialActiveSection);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
      className="sticky top-0 left-0 h-screen shadow-lg backdrop-blur-3xl border-r-2 border-white/10 w-10 sm:w-16 flex flex-col z-50 justify-evenly"
    >
      {navItems.map(({ name, link }, index) => {
        const isActive = link === "#" ? !activeSection : `#${activeSection}` === link;

        return (
          <Link
            key={`nav-item-${index}`}
            href={link}
            className={cn(
              "flex items-center justify-center transform rotate-90 transition-all duration-100 ease-in-out",
              isActive && "scale-110"
            )}
          >
            <span
              className={cn(
                "text-sm font-extrabold cursor-pointer",
                isActive
                  ? "bg-slate-900/[0.8] h-full text-white font-extrabold border-t border-white p-2 sm:p-5 items-center flex"
                  : "opacity-50 hover:opacity-100"
              )}
            >
              {name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
