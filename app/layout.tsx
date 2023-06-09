import "./globals.css";
import { Montserrat } from "next/font/google";
import React from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "In-N-Out Clock App",
  description:
    "In-N-Out Clock App is an hour tracking app for Team 5924, Golden Gate Robotics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-900 font-montserrat text-white">
        {children}
      </body>
    </html>
  );
}
