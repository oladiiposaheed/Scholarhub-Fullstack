import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ... font configurations ...

export const metadata: Metadata = {
  title: "ScholarHub",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}