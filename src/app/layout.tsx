import "./globals.css";
import Header from "@/components/layout/Header";
import { Metadata } from "next"; // Ensure Metadata is imported from the correct library
import { Khula } from "next/font/google";
import { Providers } from "./Providers";
const khula = Khula({
  weight: ["300", "400", "600", "700", "800"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exerciser",
  description:
    "Exerciser is a platform to practice language vocabulary by unlimited exercises.",
  // Add more meta tags for SEO
  keywords: "language, vocabulary, exercises, practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add meta tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </head>
      <body className={`${khula.className}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
