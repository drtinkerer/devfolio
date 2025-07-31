// Animation variant types for Framer Motion
export interface AnimationVariants {
  hidden: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    rotateY?: number;
    pathLength?: number;
    width?: string | number;
  };
  visible: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    rotateY?: number;
    pathLength?: number;
    width?: string | number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
      delayChildren?: number;
    };
  };
}

// Timeline animation variants
export interface TimelineAnimationVariants {
  timelineVariants: AnimationVariants;
  itemVariants: AnimationVariants;
  dotVariants: AnimationVariants;
  connectorVariants: AnimationVariants;
}

// Education grid animation variants
export interface EducationAnimationVariants {
  cardVariants: AnimationVariants;
  progressVariants: AnimationVariants;
  badgeVariants: AnimationVariants;
  gridVariants: AnimationVariants;
}

// Theme configuration types
export interface ExperienceThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  timelineColor: string;
  dotColor: string;
  hoverColor: string;
}

export interface EducationThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  progressColor: string;
  badgeColor: string;
}

// Combined theme configuration
export interface SectionThemeConfig {
  experience: ExperienceThemeConfig;
  education: EducationThemeConfig;
}

// Animation timing configuration
export interface AnimationTimingConfig {
  staggerDelay: number;
  itemDuration: number;
  hoverDuration: number;
  scrollThreshold: number;
  easing: string;
}

// Responsive breakpoint configuration
export interface ResponsiveConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  largeDesktop: number;
}

// Complete configuration type
export interface ExperienceEducationConfig {
  themes: SectionThemeConfig;
  animations: AnimationTimingConfig;
  responsive: ResponsiveConfig;
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    keyboardNavigation: boolean;
  };
}