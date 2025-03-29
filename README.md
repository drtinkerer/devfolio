<div align="center">

# DevFolio

### A sleek, modern developer portfolio with dark theme & smooth animations

[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animated%20with-Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**[✨ Live Demo](https://devfolio-ten-plum.vercel.app/) • [🔍 Source Code](https://github.com/drtinkerer/devfolio)

</div>

<hr>

<div align="center">
<p>A developer portfolio featuring floating interactive icons, transparent certification badges, and zen mode — all with a touch-optimized mobile experience.</p>
</div>


## 🌟 Features

- **Responsive Design**: Looks great on all devices - mobile, tablet, and desktop
- **Dynamic Floating Icons**: Interactive animations with customizable tech icons that represent your skills
- **Zen Mode**: Toggle to hide text and focus on the visual elements
- **Local Credly Badge Display**: Uses transparent Openbadge 3.0 PNG images instead of iframes for a cleaner look
- **Smooth Animations**: Beautiful transitions and scroll effects using Framer Motion
- **Circuit Pattern Background**: Animated elements that create a tech-focused aesthetic
- **Touch-Optimized**: Enhanced mobile experience with responsive touch targets
- **Dark Theme**: Modern dark theme with gradient accents

## 🙏 Credits and Inspirations

This project is created on the top of excellent work by [Atzin Escandia](https://github.com/atzinescandia). 
Original repository: [atzin-escandia-devfolio](https://github.com/atzinescandia/atzin-escandia-devfolio)

## 🚀 Getting Started

1. Clone this repository
```bash
git clone https://github.com/{{ personalInfo.github }}/devfolio.git
```

2. Navigate to the project directory
```bash
cd devfolio
```

3. Install dependencies
```bash
yarn install
```

4. Run the development server
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Customization

### Personalizing Your Portfolio

All the content of your portfolio can be customized by editing the files in the `data/` directory:

#### 1. Personal Information (`data/personal.ts`)

Update your identities and professional description:

```typescript
// Array of professional identities to display in the hero section
export const identities = [
  "a Developer 💻",
  "a Designer 🎨",
  // Add your own identities
];

// Professional description paragraphs for the hero section
export const professionalDescription = {
  paragraph1: "With X years of professional experience, I specialize in... [your main professional paragraph]",
  paragraph2: "Let's transform your ideas into reality! 🚀"
};
```

#### 2. Projects (`data/projects.ts`)

Showcase your projects by editing this file with your project details, including:
- Title, description, and image URL
- Technologies used
- GitHub repository and live demo links

#### 3. Experience (`data/experience.ts`)

Edit your work experience history with:
- Company names, positions, and durations
- Responsibilities and achievements
- Company logos and links

#### 4. Certifications (`data/certifications.ts`)

Add your professional certifications:

```typescript
export const certifications: Certification[] = [
  {
    id: 1,
    title: "Your Certification Name",
    issuer: "Certification Issuer",
    date: "Month Year",
    credlyBadgeId: "your-credly-badge-id" // From your Credly badge URL
  },
  // Add more certifications...
];
```

#### 5. Tech Stack (`data/tech-stack.ts`)

Update the technologies you're proficient in.

#### 6. Navigation (`data/navigation.ts`)

Customize the navigation menu items if needed.

### Setting Up Credly Badges

This portfolio uses local PNG images instead of iFrames for Credly badges:

1. **Get your badge ID**: For each certification on Credly, get the badge ID from your public URL (e.g., `https://www.credly.com/badges/1a2b3c4d-5e6f-7g8h-9i0j/public_url` → badge ID is `1a2b3c4d-5e6f-7g8h-9i0j`)

2. **Download badge images**: 
   - Go to your Credly badge page
   - Click on "Share" and then "Download" to get the badge in OpenBadge 3.0 format
   - OpenBadge 3.0 is an open standard for verifiable digital credentials that includes transparent PNGs with embedded metadata about the achievement.
   - Save the transparent PNG with your badge ID as the filename (e.g., `1a2b3c4d-5e6f-7g8h-9i0j.png`)

3. **Add badges to your project**:
   - Place all badge PNG files in the `/public/credly-badges/` directory
   - Each badge should be named exactly with the badge ID and .png extension

### Adding Your Own Tech Icons

1. Place your SVG icons in the `public/floating-icons` directory
2. The icons will be automatically loaded and displayed in the background
3. Icons will inherit the floating animation and click interactions

### Modifying Colors

The color scheme can be customized in the `tailwind.config.js` file:
```js
theme: {
  extend: {
    colors: {
      electricBlue: {...},
      circuitGreen: {...},
      steelGray: {...},
      brushedAluminum: {...}
    }
  }
}
```

## 🛠️ Technologies & Tools

### Frontend Framework
- [Next.js](https://nextjs.org/) - React framework for production-grade applications

### Styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

### Vibe Coding Stack
- [Windsurf](https://windsurf.ai) - Agentic AI IDE
- [Cursor](https://cursor.sh) - AI-powered code editor
- [Bolt.DIY](https://bolt.diy) - AI coding assistant
- [Gemini 2.5](https://deepmind.google/technologies/gemini/) - Advanced AI thinking model

### Deployment
- [Vercel](https://vercel.com/) - Cloud platform for static and serverless deployment

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deployment

This portfolio can be easily deployed to various platforms:

### Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Click 'Import' and follow the prompts

### Netlify

1. Create an account on [Netlify](https://netlify.com)
2. Click 'New site from Git'
3. Connect your GitHub repository

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t devfolio .
```

2. Run the Docker container:
```bash
docker run -p 3000:3000 devfolio
```

#### Docker Deployment Options

##### Local Development
- Builds and runs the Next.js application in a containerized environment
- Useful for consistent development across different machines

##### Production Deployment
- Can be used with container orchestration platforms like:
  - Kubernetes
  - AWS ECS
  - Google Cloud Run

**Note**: Ensure you have a `Dockerfile` in your project root configured for Next.js deployment.

## 📱 Mobile Optimization

This portfolio is optimized for mobile devices with:
- Single tap navigation (no more double-tapping required)
- Larger touch targets for better accessibility
- Custom cursor disabled on touch devices
- Responsive layouts that adapt to screen size

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 💫 Show your support

Give a ⭐️ if you like this project!
