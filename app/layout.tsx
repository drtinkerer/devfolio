import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "400", "700", '900'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className={`${poppins.className}`}>
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
    'A customizable portfolio template for frontend developers, created by Bhushan Rane. Showcase your skills, projects, and experience with a clean and modern design.',
  icons: {
    icon: './favicon.ico',
  },
  applicationName: 'Frontend Portfolio Template by Bhushan Rane',
  authors: [
    {
      name: 'Bhushan Rane',
      url: 'https://www.linkedin.com/in/atzin-escandia/',
    },
  ],
  generator: 'Next.js',
  referrer: 'origin',
  themeColor: '#120012',
  colorScheme: 'dark',
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Bhushan Rane',
  publisher: 'The Plum Up',
};
