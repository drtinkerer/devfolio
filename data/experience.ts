export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
  // New fields for enhanced design
  companyColor?: string; // For timeline dot customization
  isCurrentPosition?: boolean; // For special current position styling
  achievements?: string[]; // Key achievements for this role
  teamSize?: string; // Team size information
}

export const experience: Experience[] = [
  {
    id: 1,
    title: "Sr DevOps/Platform Engineer",
    company: "Ollion (CloudCover)",
    location: "Pune, India",
    startDate: "June 2022",
    endDate: "Present",
    description: [
      "Led the secure migration of multi-tiered applications from Hetzner and Azure to Google Cloud for a Swiss WealthTech client, provisioning GKE clusters with Envoy Gateway, managed databases following industry-standard security best practices",
      "Developed a multi-cloud AI sandbox provisioner (GCP, AWS, Azure, OCI) with chat and Slack/CLI integration. Enabled natural language cloud provisioning with security and approval workflows, achieving 95% cost savings",
      "Implemented ArgoCD Autopilot for GitOps-driven deployments, managing 15+ GKE clusters from a single Argo CD instance while maintaining high availability and scalability",
      "Implemented zero-trust network access for remote teams, initially with Cloudflare Tunnels and later migrating to a self-hosted NetBird VPN solution for private network connectivity",
      "Built CI/CD pipelines on GitLab to provision GCP Landing Zone infrastructure using Terraform, enabling multi-project, multi-environment deployments with consistent governance",
      "Deployed AWS Landing Zone Accelerator for multi-account governance with organization-wide security baselines and compliance guardrails (Typescript CDK)",
      "Deployed OCI Landing Zone for a client, establishing compartment hierarchy, IAM policies, networking, and security baselines (Terraform)"
    ],
    technologies: ["AWS", "GCP", "OCI", "Kubernetes", "Terraform", "Argo Stack", "Envoy Gateway", "NetBird", "Cloudflare", "GitLab CI"],
    companyLogo: "https://ollion.com/imgs/logo.svg",
    companyUrl: "https://ollion.com",
    companyColor: "#0066CC",
    isCurrentPosition: true,
    achievements: [
      "95% cost savings with multi-cloud AI Sandbox Provisioner",
      "Managed 15+ GKE clusters from a single ArgoCD instance",
      "Generated $200K+ revenue as sole engineer on 2-year client engagement"
    ],
    teamSize: "5-8 engineers"
  },
  {
    id: 2,
    title: "Sr DevOps Engineer",
    company: "Sugarbox Networks",
    location: "Mumbai, India",
    startDate: "February 2021",
    endDate: "June 2022",
    description: [
      "Architected and deployed an on-premises data platform from scratch — 15-node Hadoop cluster, 10-node Kubernetes cluster with Kafka, NiFi, and supporting services, increasing data processing throughput by 60%",
      "Managed Kubernetes workloads including Airflow and Jupyter with GitOps delivery using Argo CD, implementing OAuth 2.0 SSO for platform-wide access control",
      "Built HealthD, an automated incident detection system in Python that identified edge failures and auto-created JIRA tickets, reducing mean time to resolution by 70%",
      "Implemented real-time change data capture using Debezium and Kafka Connect, streaming MySQL events into the data platform for downstream processing"
    ],
    technologies: ["Kubernetes", "Hadoop", "Apache Kafka", "Argo CD", "Python", "Debezium", "Apache Airflow", "Apache NiFi"],
    companyLogo: "https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2020/04/SUGARBOX-1.jpg",
    companyUrl: "https://sugarboxnetworks.com"
  },
  {
    id: 3,
    title: "Systems Engineer",
    company: "Sugarbox Networks",
    location: "Mumbai, India",
    startDate: "April 2020",
    endDate: "February 2021",
    description: [
      "Designed and implemented a high-availability monitoring and alerting platform for 200+ edge and CDN nodes using Prometheus, Grafana, and ELK, improving system reliability",
      "Improved CDN deployment efficiency by 30% by standardizing base configurations with custom Debian OS images",
      "Developed data ingestion pipelines using Apache NiFi and PySpark for real-time edge telemetry processing",
      "Automated node provisioning and configuration management across the edge fleet using Ansible and Salt Stack"
    ],
    technologies: ["Prometheus", "Grafana", "ELK", "Apache NiFi", "PySpark", "Ansible", "Salt Stack", "Debian"],
    companyLogo: "https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2020/04/SUGARBOX-1.jpg",
    companyUrl: "https://sugarboxnetworks.com"
  },
  {
    id: 4,
    title: "Sr Support Quality Engineer",
    company: "Alfa Laval",
    location: "Pune, India",
    startDate: "July 2015",
    endDate: "April 2020",
    description: [
      "Automated complex data ingestion, processing, and visualization workflows using Microsoft Excel, AccessDB, and Power BI, resulting in 95% of time and cost savings.",
      "Designed, developed, and manufactured precision mechanical components utilizing diverse manufacturing processes and operations.",
      "Enhanced manufacturing efficiency by optimizing workflows, tooling, and process parameters, leading to improved productivity and reduced waste.",
      "Authored detailed Standard Operating Procedures (SOPs) for critical manufacturing processes to ensure consistency, quality, and compliance.",
      "Provided expert technical guidance to shop floor personnel on advanced machining operations and quality control protocols, enhancing overall process reliability."
    ],
    technologies: ["Lean Six Sigma", "Manufacturing", "Quality", "Grafana", "Microsoft Excel", "AccessDB", "Power BI"],
    companyLogo: "https://www.alfalaval.com/ui/css/img/logo-alfalaval.svg",
    companyUrl: "https://www.alfalaval.com/"
  }
]; 