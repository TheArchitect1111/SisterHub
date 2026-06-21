import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "SisterHub | Leadership Platform for Sororities",
  description: "SisterHub empowers sorority chapters with structure, tools, and systems to lead with excellence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/login"
      signInFallbackRedirectUrl="/portal"
      signUpFallbackRedirectUrl="/portal"
    >
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
