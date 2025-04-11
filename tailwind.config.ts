import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Core Palette
        steelGray: {
          DEFAULT: "#71797E", // Base steel gray
          light: "#A9B1B6",   // Lighter shade
          dark: "#4A4F54",    // Darker shade
        },
        brushedAluminum: {
          DEFAULT: "#C0C0C0", // Silver/Aluminum
          light: "#D9D9D9",
          dark: "#A8A8A8",
        },
        electricBlue: {
          DEFAULT: "#00FFFF", // Cyan/Electric Blue
          light: "#7FFFD4",   // Aquamarine shade
          dark: "#00CED1",    // Dark Turquoise
        },
        circuitGreen: {
          DEFAULT: "#39FF14", // Neon Green
          light: "#ADFF2F",   // Green Yellow
          dark: "#008000",    // Standard Green
        },

        // Supporting Palette & Existing (adjust if needed)
        black: {
          DEFAULT: "#0A0A0A", // Slightly off-black for depth
          100: "#141414",
          200: "rgba(20, 20, 20, 0.75)", // Darker overlay
          300: "rgba(200, 200, 200, 0.1)", // Lighter overlay for contrast
        },
        white: {
          DEFAULT: "#F5F5F5", // Off-white for softer text
          100: "#E0E0E0",
          200: "#CCCCCC",
        },
        // Keep purple for potential accents or remove if not needed
        purple: "#9B4D96",

        // Shadcn/ui defaults (can be overridden or removed if not using shadcn heavily)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000",
        foreground: "#FFFFFF",
        primary: "#007AFF",
        secondary: "#5856D6",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Map to new palette, e.g., circuitGreen.light
          foreground: "hsl(var(--accent-foreground))", // e.g., black.DEFAULT
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "muted-foreground": "rgba(255, 255, 255, 0.7)",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        blob: "blob 7s infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;

// Helper function to expose colors as CSS variables
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  // Filter out deprecated colors or adjust keys as needed
  let newVars = Object.fromEntries(
    Object.entries(allColors)
      .filter(([key]) => !['background', 'foreground', 'primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card', 'border', 'input', 'ring'].includes(key)) // Avoid direct mapping of complex objects
      .map(([key, val]) => [`--${key.replace('.', '-')}`, val]) // Replace dots for CSS var compatibility
  );

  // Manually add mappings for complex/hsl colors if needed
  newVars['--background'] = 'hsl(var(--background-hsl))'; // Example if using HSL vars
  newVars['--foreground'] = 'hsl(var(--foreground-hsl))'; // Example

  addBase({
    ":root": {
      // Define HSL values for shadcn/ui compatibility if used
      "--background-hsl": "0 0% 7%", // ~ black.100
      "--foreground-hsl": "0 0% 96%", // ~ white.DEFAULT

      "--card-hsl": "0 0% 7%",
      "--card-foreground-hsl": "0 0% 96%",

      "--popover-hsl": "0 0% 7%",
      "--popover-foreground-hsl": "0 0% 96%",

      "--primary-hsl": "195 100% 50%", // ~ electricBlue.DEFAULT (adjust HSL)
      "--primary-foreground-hsl": "0 0% 5%", // ~ black.DEFAULT

      "--secondary-hsl": "210 6% 70%", // ~ steelGray.light (adjust HSL)
      "--secondary-foreground-hsl": "0 0% 10%", // ~ black.100

      "--muted-hsl": "210 6% 30%", // ~ steelGray.dark
      "--muted-foreground-hsl": "0 0% 70%", // ~ white.100

      "--accent-hsl": "128 100% 54%", // ~ circuitGreen.DEFAULT (adjust HSL)
      "--accent-foreground-hsl": "0 0% 5%", // ~ black.DEFAULT

      "--destructive-hsl": "0 84% 60%",
      "--destructive-foreground-hsl": "0 0% 98%",

      "--border-hsl": "210 6% 40%", // ~ steelGray.dark
      "--input-hsl": "210 6% 50%", // ~ steelGray.DEFAULT
      "--ring-hsl": "195 100% 50%", // ~ electricBlue.DEFAULT

      "--radius": "0.5rem",
      ...newVars // Add the flattened color variables
    },
    // Add .dark class support if needed later
  });
}

export default config;
