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
  }
]; 