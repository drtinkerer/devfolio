export const personalInfo = {
  email: 'eulersidentity2718@gmail.com',
  github: 'drtinkerer',
  linkedin: 'drtinkerer',
};

export const socialMedia = [
  {
    id: 1,
    img: "assets/git.svg",
    link: `https://github.com/${personalInfo.github}`,
  },
  {
    id: 2,
    img: "assets/linkedin.svg",
    link: `https://www.linkedin.com/in/${personalInfo.github}/`,
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    icon: "Github",
    href: `https://github.com/${personalInfo.github}`,
    color: "hover:text-gray-400"
  },
  {
    name: "LinkedIn",
    icon: "Linkedin",
    href: `https://linkedin.com/in/${personalInfo.github}`,
    color: "hover:text-blue-500"
  },
  {
    name: "Medium",
    icon: "BookOpen",
    href: `https://medium.com/@${personalInfo.github}`,
    color: "hover:text-gray-600"
  }
];
