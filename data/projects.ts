export interface Project {
  id: number;
  title: string;
  description: string;
  className: string;
  titleClassName: string;
  img: string;
  github: string;
  link: string;
  techs: string[];
}

export const projects: Project[] = [
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
    link: "https://github.com/drtinkerer",
    techs: ["React", "TypeScript", "AWS", "GraphQL", "D3.js"]
  }
]; 