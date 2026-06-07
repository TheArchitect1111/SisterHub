import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SisterHub | Leadership Platform for Sororities",
  description: "SisterHub empowers sorority chapters with structure, tools, and systems to lead with excellence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
