import { personalInfo } from './social-media';

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
    github: `https://github.com/${personalInfo.github}/aws-landing-zone`,
    link: `https://github.com/${personalInfo.github}/aws-landing-zone`,
    techs: ["AWS", "Terraform", "AWS DevOps", "Secure Networking", "Cloud Security", "DevSecOps", "Platform Management"]
  },
  {
    id: 2,
    title: "AWS Security Comply 360",
    description: "AWS Security Comply 360 is a comprehensive security and compliance solution that helps organizations manage and monitor their AWS environments, ensuring compliance with security and regulatory requirements.",
    className: "md:col-span-1",
    titleClassName: "justify-start",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: `https://github.com/${personalInfo.github}/aws-security-comply-360.git`,
    link: `https://github.com/${personalInfo.github}/aws-security-comply-360.git`,
    techs: ["AWS", "Python","CyberSecurity", "Vulnerability Assessments", "Compliance", "Python", "NIST", "CIS", "Benchmarking", "MCP", "LLM", "Gen AI"]
  },
  {
    id: 3,
    title: "AI Powered Cloud Sandbox Provisiner",
    description: "A cloud sandbox provisioner is a API service that allows users to create and manage temporary, isolated environments for testing, development, or training purposes, based on Google Cloud.",
    className: "md:col-span-1",
    titleClassName: "justify-end",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    github: `https://github.com/${personalInfo.github}/gcp-sandbox-provisioner-infra`,
    link: `https://github.com/${personalInfo.github}/gcp-sandbox-provisioner-infra`,
    techs: ["Google Cloud", "Terraform", "Python", "FastAPI", "Gen AI", "DevSecOps", "Platform Management"]
  },
  {
    id: 4,
    title: "The Self Hosted Engineer",
    description: "The Self-Hosted Engineer explores building cost-effective homelabs using open-source tools, Raspberry Pi clusters, and free-tier cloud services. It blends technical guidance with real-world insights, helping tech enthusiasts and aspiring DevOps engineers experiment with Kubernetes, automation, and cloud integration.",
    className: "md:col-span-1",
    titleClassName: "justify-end",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: `https://github.com/${personalInfo.github}/the-self-hosted-engineer`,
    link: `https://github.com/${personalInfo.github}/the-self-hosted-engineer`,
    techs: ["Raspberry Pi", "Debian", "Oracle Cloud", "Terraform", "Python", "Traefik", "Cloudflare", "Netbird", "Kubernetes", "Ollama", "DevSecOps", "Homelab"]
  }
];