export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Certifications", link: "#certifications" },
  { name: "Contact", link: "#contact" },
];

export const myTechStack = [
  "Linux",
  "Kubernetes",
  "Python",
  "Amazon Web Services",
  "Google Cloud Platform"
]

export const projects = [
  {
    id: 1,
    title: "FitLife: Your Gym Buddy in Code",
    description: "What if your fitness app could help you design websites while tracking your push-ups? This is it. Built with love, sweat, and a bit of JavaScript magic!",
    className: "md:col-span-1",
    titleClassName: "justify-end",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    github: "https://github.com/atzin-escandia",
    link: "https://www.instagram.com/atzinescandia",
    techs: ["JavaScript", "React", "NodeJS", "Express", "MongoDB", "Tailwind"]
  },
  {
    id: 2,
    title: "Timezone Buddy: Never Miss a Workout",
    description: "You can't train for a marathon if you're confused about timezones! Sync with your squad no matter where they are and never miss a coding session or a yoga flow.",
    className: "md:col-span-1",
    titleClassName: "justify-start",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: "https://github.com/atzin-escandia",
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
    github: "https://github.com/atzin-escandia",
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
    github: "https://github.com/atzin-escandia",
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
    link: "https://github.com/atzin-escandia",
  },
  {
    id: 2,
    img: "assets/linkedin.svg",
    link: "https://www.linkedin.com/in/atzin-escandia/",
  },
  {
    id: 3,
    img: "assets/link.svg",
    link: "https://theplumup.com/",
  },
];

export const skills = ["TypeScript", "React", "Redux", "NodeJS", "NextJS", "Tailwind"];

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  badgeUrl: string;
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
    credentialUrl: "https://www.credly.com/org/aws/badge/your-badge-id",
    credlyBadgeId: "279777b5-af1c-4ecb-b311-74757d3e7184",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 2,
    title: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "February 2024",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/org/google-cloud/badge/your-badge-id",
    credlyBadgeId: "dummy-badge-id-2",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 3,
    title: "Azure Solutions Architect Expert",
    issuer: "Microsoft",
    date: "January 2024",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/org/microsoft/badge/your-badge-id",
    credlyBadgeId: "dummy-badge-id-3",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 4,
    title: "Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "December 2023",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/org/cncf/badge/your-badge-id",
    credlyBadgeId: "dummy-badge-id-4",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 5,
    title: "Terraform Associate",
    issuer: "HashiCorp",
    date: "November 2023",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/org/hashicorp/badge/your-badge-id",
    credlyBadgeId: "dummy-badge-id-5",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 6,
    title: "Docker Certified Associate",
    issuer: "Docker",
    date: "October 2023",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/org/docker/badge/your-badge-id",
    credlyBadgeId: "dummy-badge-id-6",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 7,
    title: "AWS Certified DevOps Engineer",
    issuer: "Amazon Web Services",
    date: "September 2023",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/org/aws/badge/your-badge-id",
    credlyBadgeId: "dummy-badge-id-7",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 8,
    title: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud",
    date: "August 2023",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/org/google-cloud/badge/your-badge-id",
    credlyBadgeId: "dummy-badge-id-8",
    credlyBadgeHost: "https://www.credly.com"
  },
  {
    id: 9,
    title: "Azure DevOps Engineer Expert",
    issuer: "Microsoft",
    date: "July 2023",
    badgeUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credentialUrl: "https://www.credly.com/org/microsoft/badge/your-badge-id",
    credlyBadgeId: "dummy-badge-id-9",
    credlyBadgeHost: "https://www.credly.com"
  }
];
