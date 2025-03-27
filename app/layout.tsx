import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Adjust weights for balance: lighter for body, bolder for headings
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600", "700", '800'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Consider adding 'dark' class if implementing theme switching later
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      {/* Apply base background and font */}
      <body className={`${poppins.className} bg-black-100`}>
        {children}
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
      url: 'https://www.linkedin.com/in/drtinkerer/', // Verify URL
    },
  ],
  generator: 'Next.js',
  referrer: 'origin',
  colorScheme: 'dark', // Set to dark as per base theme
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Bhushan Rane',
  publisher: 'The Plum Up', // Consider changing if not applicable
};

export const viewport = {
  // Use a color from the new palette
  themeColor: '#4A4F54', // steelGray.dark
};
