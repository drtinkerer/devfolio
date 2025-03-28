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
}

export const experience: Experience[] = [
  {
    id: 1,
    title: "Sr DevOps Engineer/Platform Specialist",
    company: "Ollion (formerly CloudCover)",
    location: "Pune, India (Remote)",
    startDate: "June 2022",
    endDate: "Present",
    description: [
      "Led the secure migration of multi-tiered applications from diverse data centers (Exoscale, Hetzner, Azure) to Google Cloud for a Swiss-based asset management client by implementing GKE clusters, virtual machines, databases, and load balancers",
      "Implemented ArgoCD Autopilot for GitOps across multiple GKE clusters, enhancing deployment efficiency and maintaining a highly-available, scalable platform",
      "Set up Cloudflare tunnels to securely access private networks over the internet, ensuring robust security and seamless connectivity for remote teams",
      "Implemented a data processing platform on Kubernetes using Argo Workflows, Dagster, and Airflow",
      "Developed CI/CD pipelines on GitLab DevOps to deploy GCP Landing Zone infrastructure using Terraform",
      "Developed a Sandbox Provisioner system for Google Cloud with Slack integration enabling on-demand ephemeral GCP Projects, resulting in 95% cost savings",
      "Deployed AWS Landing Zone accelerator on AWS Control Tower-enabled environment using CloudFormation/CDK"
    ],
    technologies: ["AWS", "GCP", "Kubernetes", "GitHub Actions", "GitLab DevOps", "Terraform", "Argo Stack", "Cloudflare Tunnels"],
    companyLogo: "https://ollion.com/imgs/logo.svg",
    companyUrl: "https://ollion.com"
  },
  {
    id: 2,
    title: "Sr DevOps Engineer/System Engineer",
    company: "Sugarbox Networks",
    location: "Mumbai, India (Remote)",
    startDate: "April 2020",
    endDate: "June 2022",
    description: [
      "Single-handedly bootstrapped a comprehensive data platform on-premises, that included a 15-node Hadoop cluster, 10-node Kubernetes, with Kafka, ELK, Grafana, and NiFi, resulting in a 60% increase in data processing efficiency",
      "Deployed Airflow, Redash, Jupyter, Grafana on Kubernetes with remote storage, orchestrating them using Argo CD and enhancing security with OAuth 2.0 SSO user logins resulting in increased developer productivity",
      "Developed HealthD, a Python-based program to detect Edge issues, automating JIRA ticket creation and assignment, resulting in a 70% reduction in resolution time",
      "Implemented Debezium change database capturing against MySQL database using Kafka connect libraries",
      "Implemented an end-to-end high-availability real-time monitoring and alerting system for edge and CDN systems in the e-commerce industry, resulting in a 30% improvement in system reliability and reduced downtime",
      "Developed NiFi pipelines and PySpark data processing applications",
      "Automated routine administrative tasks using Ansible, Salt Stack"
    ],
    technologies: ["Linux", "Python", "Hadoop", "Apache Spark", "Apache Kafka", "Elasticsearch", "MongoDB", "Grafana", "Apache NiFi", "Apache Airflow", "Jupyter", "Prometheus", "Ansible", "Salt Stack"],
    companyLogo: "https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2020/04/SUGARBOX-1.jpg",
    companyUrl: "https://sugarboxnetworks.com"
  },
  {
    id: 3,
    title: "Sr Support Quality Engineer",
    company: "Alfa Laval",
    location: "Pune, India (On-site)",
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