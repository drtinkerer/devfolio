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
    'Bhushan Rane Portfolio to showcase his skills and projects.',
  icons: {
    icon: './favicon.ico',
  },
  applicationName: 'Bhushan Rane Portfolio',
  authors: [
    {
      name: 'Bhushan Rane',
      url: 'https://www.linkedin.com/in/drtinkerer/',
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
