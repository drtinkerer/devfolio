export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  achievements: string[];
  institutionLogo?: string;
  institutionUrl?: string;
}

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Engineering in Mechanical Engineering",
    institution: "University of Pune",
    location: "Pune, India",
    startDate: "August 2011",
    endDate: "May 2015",
    description: [
      "Specialized in Design Engineering and Manufacturing Technology",
      "Completed coursework in Thermodynamics, Fluid Mechanics, Machine Design, and Manufacturing Processes"
    ],
    achievements: [
      "Graduated with First Class Honors",
      "Completed a capstone project on Automated Manufacturing Systems"
    ],
    institutionLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Savitribai_Phule_Pune_University_Logo.svg/1200px-Savitribai_Phule_Pune_University_Logo.svg.png",
    institutionUrl: "http://www.unipune.ac.in/"
  },
  {
    id: 2,
    degree: "Diploma in Mechanical Engineering",
    institution: "Government Polytechnic",
    location: "Pune, India",
    startDate: "June 2008",
    endDate: "May 2011",
    description: [
      "Focused on practical applications of mechanical engineering principles",
      "Gained hands-on experience with various manufacturing tools and techniques"
    ],
    achievements: [
      "Ranked in the top 5% of the class",
      "Participated in state-level technical competitions"
    ],
    institutionLogo: "https://gpnashik.ac.in/assets/img/logo.png",
    institutionUrl: "https://gpnashik.ac.in/"
  }
];
