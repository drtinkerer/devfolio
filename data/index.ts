// Re-export all data from separate files
export * from './navigation';
export * from './projects';
export * from './certifications';
export * from './experience';
export * from './tech-stack';

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Certifications", link: "#certifications" },
  { name: "Contact", link: "#contact" },
];

export const myTechStack = [
  "Cloud and Platform Engineering",
  "DevSecOps and Security",
  "Zero Trust Network Architecture",
  "Big Data Analytics and AI",
  "CI/CD",
  "Solutions Architecture",
  "Generative AI",
  "Platform Engineering",
  "Container Orchestration"
];

export const socialMedia = [
  {
    id: 1,
    img: "assets/git.svg",
    link: "https://github.com/drtinkerer",
  },
  {
    id: 2,
    img: "assets/linkedin.svg",
    link: "https://www.linkedin.com/in/drtinkerer/",
  },
];
