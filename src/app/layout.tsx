import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Myla Bundle Ltd - Smart Digital Ventures. Private Capital. Bundled Value Delivery.",
  description: "Myla Bundle Ltd is a privately held CAC-verified company operating at the intersection of digital innovation and strategic capital deployment. We focus on lean, modern digital operations that deliver scalable value across diverse market segments.",
  keywords: "digital ventures, private capital, strategic consulting, deal structuring, venture building, capital bundling",
  authors: [{ name: "Myla Bundle Ltd" }],
  creator: "Myla Bundle Ltd",
  publisher: "Myla Bundle Ltd",
  robots: "index, follow",
  openGraph: {
    title: "Myla Bundle Ltd - Smart Digital Ventures",
    description: "Private Capital. Bundled Value Delivery.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myla Bundle Ltd - Smart Digital Ventures",
    description: "Private Capital. Bundled Value Delivery.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
