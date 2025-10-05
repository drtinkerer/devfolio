export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credlyBadgeId: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Kubestronaut",
    issuer: "The Linux Foundation",
    date: "October 2025",
    credlyBadgeId: "9f98840b-a239-4392-ad38-82bf21ee10cb"
  },
  {
    id: 2,
    title: "CKS: Certified Kubernetes Security Specialist",
    issuer: "The Linux Foundation",
    date: "October 2025",
    credlyBadgeId: "56e06140-1ddc-4f25-b1a1-96043d89e873"
  },
  {
    id: 3,
    title: "Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "December 2024",
    credlyBadgeId: "63e02075-1648-40ee-9515-c070cecb35fa"
  },
  {
    id: 4,
    title: "Professional Cloud Network Engineer Certification",
    issuer: "Google Cloud",
    date: "January 2025",
    credlyBadgeId: "3efd5630-1197-4ce9-a715-dcf576bbb419"
  },
  {
    id: 5,
    title: "Professional Cloud Security Engineer Certification",
    issuer: "Google Cloud",
    date: "January 2025",
    credlyBadgeId: "35ddc817-505c-4fe7-b48e-1aa81f74c48c"
  },
  {
    id: 6,
    title: "Professional Cloud DevOps Engineer Certification",
    issuer: "Google Cloud",
    date: "January 2025",
    credlyBadgeId: "9048650f-b59b-4f35-af9b-2a67d05d336f"
  },
  {
    id: 7,
    title: "CKA: Certified Kubernetes Administrator",
    issuer: "The Linux Foundation",
    date: "October 2022",
    credlyBadgeId: "660fc11a-b2ef-4445-b51f-234cca1aed51"
  },
  {
    id: 8,
    title: "CKAD: Certified Kubernetes Application Developer",
    issuer: "The Linux Foundation",
    date: "March 2025",
    credlyBadgeId: "45498019-a538-4851-b53a-238967709dcb"
  },
  {
    id: 9,
    title: "KCNA: Kubernetes and Cloud Native Associate",
    issuer: "The Linux Foundation",
    date: "February 2025",
    credlyBadgeId: "e0f81c84-ae65-4026-9e2e-6b285d5837f0"
  },
  {
    id: 10,
    title: "KCSA: Kubernetes and Cloud Native Security Associate",
    issuer: "The Linux Foundation",
    date: "March 2025",
    credlyBadgeId: "f1ff45e4-4de6-47ad-99f9-3a2506bd935d"
  },
  {
    id: 11,
    title: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "February 2023",
    credlyBadgeId: "cd0f1d53-2a09-4308-a206-e0604a856ac6"
  },
  {
    id: 12,
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "March 2024",
    credlyBadgeId: "279777b5-af1c-4ecb-b311-74757d3e7184"
  }
];