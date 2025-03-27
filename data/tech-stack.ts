export interface TechStack {
  category: string;
  technologies: string[];
}

export const techStack: TechStack[] = [
  {
    category: "Cloud & DevOps",
    technologies: [
      "Cloud Computing",
      "DevSecOps",
      "CI/CD",
      "Infrastructure as Code",
      "Container Orchestration",
      "Cloud Security"
    ]
  },
  {
    category: "Data & AI",
    technologies: [
      "Big Data Analytics",
      "Generative AI"
    ]
  }
]; 