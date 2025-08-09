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
  // New fields for enhanced design
  gpa?: string; // Grade point average
  honors?: string[]; // Academic honors
  relevantCourses?: string[]; // Key courses
  projects?: string[]; // Academic projects
  completionPercentage?: number; // For progress indicator
  institutionColor?: string; // For theming
}

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Technology in Mechanical Engineering",
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
    institutionLogo: "https://vjti.ac.in/wp-content/uploads/2024/05/logo-light.gif",
    institutionUrl: "http://vjti.ac.in/",
    gpa: "First Class",
    honors: ["First Class Honors", "Dean's List"],
    relevantCourses: [
      "Thermodynamics",
      "Fluid Mechanics", 
      "Machine Design",
      "Manufacturing Technologies",
      "Computer Aided Design",
      "Materials Science"
    ],
    projects: [
      "Automated Manufacturing Systems - Capstone Project",
      "Heat Exchanger Design Optimization",
      "CNC Machine Programming and Operation"
    ],
    completionPercentage: 100,
    institutionColor: "#1E40AF"
  }
];
