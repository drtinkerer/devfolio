import { personalInfo } from './social-media';

export interface Project {
  id: number;
  title: string;
  description: string;
  className: string;
  titleClassName: string;
  img: string;
  github?: string;
  link?: string;
  techs: string[];
  status?: "in-progress" | "private";
}

export const projects: Project[] = [
  {
    id: 1,
    title: "NetBird Python Client",
    description: "Python SDK for NetBird API with full resource coverage, topology visualization, and type-safe Pydantic models.",
    className: "md:col-span-1",
    titleClassName: "justify-end",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    github: `https://github.com/${personalInfo.github}/netbird-python-client`,
    link: `https://github.com/${personalInfo.github}/netbird-python-client`,
    techs: ["Python", "Pydantic", "REST API", "Graphviz"]
  },
  {
    id: 2,
    title: "Terraform NetBird Network Module",
    description: "Terraform module for provisioning NetBird networks with peer groups, routing, access policies, and device enrollment.",
    className: "md:col-span-1",
    titleClassName: "justify-start",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: `https://github.com/${personalInfo.github}/terraform-netbird-network`,
    link: `https://github.com/${personalInfo.github}/terraform-netbird-network`,
    techs: ["Terraform", "NetBird", "HCL", "SDN"]
  },
  {
    id: 3,
    title: "AWS: Landing Zone",
    description: "Multi-account AWS environment with security guardrails, governance, and networking best practices baked in.",
    className: "md:col-span-1",
    titleClassName: "justify-end",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    github: "https://github.com/ollionorg/aws-landing-zone",
    link: "https://github.com/ollionorg/aws-landing-zone",
    techs: ["AWS", "Terraform", "CloudFormation", "IAM"]
  },
  {
    id: 4,
    title: "AWS Security Comply 360",
    description: "Security and compliance monitoring for AWS environments against NIST, CIS, and regulatory frameworks.",
    className: "md:col-span-1",
    titleClassName: "justify-start",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    techs: ["AWS", "Python", "NIST", "CIS", "Gen AI"],
    status: "private"
  },
  {
    id: 5,
    title: "AI Powered Cloud Sandbox Provisioner",
    description: "Multi-cloud operations platform with a conversational chat interface, enterprise security guardrails, and federated auth.",
    className: "md:col-span-1",
    titleClassName: "justify-end",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    techs: ["Next.js", "FastAPI", "Go", "LiteLLM", "Multi-Cloud"],
    status: "private"
  },
  {
    id: 6,
    title: "The Self Hosted Engineer",
    description: "Homelab guide for building cost-effective infrastructure with Raspberry Pi, Kubernetes, and open-source tools.",
    className: "md:col-span-1",
    titleClassName: "justify-end",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: `https://github.com/${personalInfo.github}/the-self-hosted-engineer`,
    link: `https://github.com/${personalInfo.github}/the-self-hosted-engineer`,
    techs: ["Raspberry Pi", "Kubernetes", "Terraform", "Homelab"],
    status: "in-progress"
  }
];