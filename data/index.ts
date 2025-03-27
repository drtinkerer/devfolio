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

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  badgeUrl: string; // Can be kept for fallback or removed if not needed
  credentialUrl: string;
  credlyBadgeId?: string;
  credlyBadgeHost?: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "March 2024",
    badgeUrl: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-b866-a1e76fdd2018/image.png",
    credentialUrl: "https://www.credly.com/badges/279777b5-af1c-4ecb-b311-74757d3e7184/public_url",
    credlyBadgeId: "279777b5-af1c-4ecb-b311-74757d3e7184",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 2,
    title: "Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "December 2024",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/badges/63e02075-1648-40ee-9515-c070cecb35fa/public_url",
    credlyBadgeId: "63e02075-1648-40ee-9515-c070cecb35fa",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 3,
    title: "Professional Cloud Network Engineer Certification",
    issuer: "Google Cloud",
    date: "January 2025",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/badges/3efd5630-1197-4ce9-a715-dcf576bbb419",
    credlyBadgeId: "3efd5630-1197-4ce9-a715-dcf576bbb419",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 4,
    title: "Professional Cloud Security Engineer Certification",
    issuer: "Google Cloud",
    date: "January 2025",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/badges/35ddc817-505c-4fe7-b48e-1aa81f74c48c/public_url",
    credlyBadgeId: "35ddc817-505c-4fe7-b48e-1aa81f74c48c",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 5,
    title: "Professional Cloud DevOps Engineer Certification",
    issuer: "Google Cloud",
    date: "January 2025",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/badges/9048650f-b59b-4f35-af9b-2a67d05d336f/public_url",
    credlyBadgeId: "9048650f-b59b-4f35-af9b-2a67d05d336f",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 6,
    title: "CKA: Certified Kubernetes Administrator",
    issuer: "The Linux Foundation",
    date: "October 2022",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/badges/660fc11a-b2ef-4445-b51f-234cca1aed51/public_url",
    credlyBadgeId: "660fc11a-b2ef-4445-b51f-234cca1aed51",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 7,
    title: "KCNA: Kubernetes and Cloud Native Associate",
    issuer: "The Linux Foundation",
    date: "February 2025",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/badges/e0f81c84-ae65-4026-9e2e-6b285d5837f0/public_url",
    credlyBadgeId: "e0f81c84-ae65-4026-9e2e-6b285d5837f0",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 8,
    title: "KCSA: Kubernetes and Cloud Native Security Associate",
    issuer: "The Linux Foundation",
    date: "March 2025",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/badges/f1ff45e4-4de6-47ad-99f9-3a2506bd935d/public_url",
    credlyBadgeId: "f1ff45e4-4de6-47ad-99f9-3a2506bd935d",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 9,
    title: "CKAD: Certified Kubernetes Application Developer",
    issuer: "The Linux Foundation",
    date: "March 2025",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/badges/45498019-a538-4851-b53a-238967709dcb/public_url",
    credlyBadgeId: "45498019-a538-4851-b53a-238967709dcb",
    credlyBadgeHost: "https://www.credly.com"
  },
];
