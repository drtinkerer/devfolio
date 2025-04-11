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
    institution: "Veermata Jijabai Technological Institute",
    location: "Mumbai, India",
    startDate: "July 2011",
    endDate: "May 2015",
    description: [
      "Specialized in Mechanical Engineering",
      "Completed coursework in Thermodynamics, Fluid Mechanics, Machine Design, and Manufacturing Technologies"
    ],
    achievements: [
      "Graduated with First Class Honors",
      "Completed a capstone project on Automated Manufacturing Systems"
    ],
    institutionLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Veermata_Jijabai_Technological_Institute_logo.png/220px-Veermata_Jijabai_Technological_Institute_logo.png",
    institutionUrl: "http://vjti.ac.in/"
  }
];
