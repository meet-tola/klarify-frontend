import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/auth-provider";
import { Toaster } from "@/components/ui/sonner";

// Google Font (Urbanist)
const urbanist = Geist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

// Local Font (Roca) using .ttf files
const roca = localFont({
  src: [
    {
      path: "../public/fonts/Roca Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Roca Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Roca Two Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Roca Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-roca",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klarify",
  description:
    "Klarify is a career assessment tool that helps you find your dream job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${roca.variable} antialiased`}
    >
      <AuthProvider>
        <body>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
