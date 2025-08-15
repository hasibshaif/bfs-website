import type { Metadata } from "next";
import { ubuntu, azeretMono } from "./fonts";
import "./globals.css";
import { GlobalNavigation } from "@/components/navigation/GlobalNavigation";

export const metadata: Metadata = {
  title: "Baruch Full Stack",
  description: "Baruch's premiere project-driven software engineering club, promoting full-stack development for Bearcats and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} ${azeretMono.variable} antialiased`}
      >
        <GlobalNavigation />
        {children}
      </body>
    </html>
  );
}
