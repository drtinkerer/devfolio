export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
}

export const experience: Experience[] = [
  {
    id: 1,
    title: "Cloud Engineer",
    company: "Tech Company",
    location: "Remote",
    startDate: "2023",
    endDate: "Present",
    description: [
      "Led the implementation of AWS Landing Zone architecture",
      "Developed and maintained CI/CD pipelines",
      "Implemented infrastructure as code using Terraform"
    ],
    technologies: ["AWS", "Terraform", "GitHub Actions", "Docker", "Kubernetes"]
  },
  {
    id: 2,
    title: "DevOps Engineer",
    company: "Another Tech Company",
    location: "Remote",
    startDate: "2022",
    endDate: "2023",
    description: [
      "Managed cloud infrastructure across multiple environments",
      "Automated deployment processes",
      "Implemented monitoring and logging solutions"
    ],
    technologies: ["AWS", "Jenkins", "Prometheus", "Grafana"]
  }
]; 