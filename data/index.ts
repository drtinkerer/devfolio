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
  "Cloud Computing",
  "DevSecOps",
  "Big Data Analytics",
  "CI/CD",
  "Generative AI",
  "Infrastructure as Code",
  "Container Orchestration",
  "Cloud Security"
]

export const projects = [
  {
    id: 1,
    title: "AWS: Landing Zone",
    description: "An AWS Landing Zone is a well-architected, multi-account AWS environment that serves as a secure and scalable starting point for deploying workloads and applications, based on AWS best practices for security, governance, and networking.",
    className: "md:col-span-1",
    titleClassName: "justify-end",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    github: "https://github.com/ollionorg/aws-landing-zone",
    link: "https://github.com/ollionorg/aws-landing-zone",
    techs: ["AWS", "Terraform", "AWS CodePipeline", "Secure Networking", "Cloud Security", "DevSecOps"]
  },
  {
    id: 2,
    title: "Timezone Buddy: Never Miss a Workout",
    description: "You can't train for a marathon if you're confused about timezones! Sync with your squad no matter where they are and never miss a coding session or a yoga flow.",
    className: "md:col-span-1",
    titleClassName: "justify-start",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: "https://github.com/drtinkerer",
    link: "https://www.threads.net/@atzinescandia",
    techs: ["JavaScript", "React", "NodeJS", "AWS", "GitHub", "Jira"]
  },
  {
    id: 3,
    title: "CloudOps Dashboard",
    description: "A comprehensive dashboard for monitoring and managing cloud resources across multiple providers. Built with real-time updates and intuitive controls.",
    className: "md:col-span-1",
    titleClassName: "justify-start",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    github: "https://github.com/drtinkerer",
    link: "https://www.threads.net/@atzinescandia",
    techs: ["TypeScript", "React", "AWS", "Kubernetes", "Docker", "Grafana"]
  },
  {
    id: 4,
    title: "AI-Powered Code Review Assistant",
    description: "An intelligent tool that helps developers review code faster and more effectively. Uses machine learning to identify potential issues and suggest improvements.",
    className: "md:col-span-1",
    titleClassName: "justify-start",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: "https://github.com/drtinkerer",
    link: "https://www.threads.net/@atzinescandia",
    techs: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker"]
  }
];

export const workExperience = [
  {
    id: 1,
    company: "LumoTech",
    title: "UX/UI Sorcerer",
    desc: "Transformed the user dashboard with a sleek design that boosted engagement by 35%. Optimized the onboarding flow to make new users feel like wizards on their first try.",
    className: "md:col-span-2",
    location: "Los Angeles",
    period: "2022 - Present",
    skills: [
      "Figma",
      "Sketch",
      "Prototyping",
      "User Testing",
      "Illustrator",
      "Adobe XD"
    ]
  },
  {
    id: 2,
    company: "PixelMinds",
    title: "Product Design Genius",
    desc: "Revamped the interface with intuitive controls, increasing user retention by 28%. Pioneered AR features for interactive learning experiences—because education should be fun and engaging.",
    className: "md:col-span-2",
    location: "San Francisco",
    period: "2020 - 2022",
    skills: [
      "Figma",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
      "CSS"
    ]
  },
  {
    id: 3,
    company: "DesignHub",
    title: "Design Systems Guru",
    desc: "Crafted design systems that were so organized they could be put in a museum. Pushed for consistent, user-friendly components that made developers' lives easier.",
    className: "md:col-span-2",
    location: "Remote",
    period: "2016 - 2020",
    skills: [
      "Figma",
      "React",
      "Design Tokens",
      "Accessibility",
      "Storybook",
      "Collaboration"
    ]
  }
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

export const skills = ["TypeScript", "React", "Redux", "NodeJS", "NextJS", "Tailwind"];
