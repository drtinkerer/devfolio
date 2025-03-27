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
    title: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    badgeUrl: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-b866-a1e2fda5c446/image.png",
    credentialUrl: "https://www.credly.com/org/aws/badge/aws-solutions-architect-associate",
    credlyBadgeId: "aws-solutions-architect-associate",
    credlyBadgeHost: "aws"
  },
  {
    id: 2,
    title: "AWS Developer Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    badgeUrl: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-b866-a1e2fda5c446/image.png",
    credentialUrl: "https://www.credly.com/org/aws/badge/aws-developer-associate",
    credlyBadgeId: "aws-developer-associate",
    credlyBadgeHost: "aws"
  }
]; 