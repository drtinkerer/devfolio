import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ZenModeProvider } from "@/lib/ZenModeContext";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { personalInfo } from '@/data';

// Adjust weights for balance: lighter for body, bolder for headings
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600", "700", '800'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Consider adding 'dark' class if implementing theme switching later
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      {/* Apply base background and font */}
      <body className={`${poppins.className} bg-black-100`}>
        <ZenModeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ZenModeProvider>
      </body>
    </html>
  );
}


// Change this data with your own 🤭
export const metadata: Metadata = {
  title: {
    default: 'Bhushan Rane ✷ Portfolio',
    template: '%s - Bhushan Rane',
  },
  description:
    'Bhushan Rane Portfolio showcasing expertise in DevOps, Cloud, AI, and Mechanical Engineering.', // Updated description
  icons: {
    icon: '/favicon.ico', // Updated path to match the actual file
  },
  applicationName: 'Bhushan Rane Portfolio',
  authors: [
    {
      name: 'Bhushan Rane',
      url: `https://www.linkedin.com/in/${personalInfo.linkedin}/`, // Verify URL
    },
  ],
  generator: 'Next.js',
  referrer: 'origin',
  creator: 'Bhushan Rane',
  publisher: 'The Plum Up', // Consider changing if not applicable
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#4A4F54', // steelGray.dark
};
