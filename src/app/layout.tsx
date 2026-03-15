import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free 30-Day Content Challenge | GoLocal Group",
  description:
    "Join the free 30-Day Content Challenge and build a consistent content habit that grows your brand, attracts clients, and builds your authority.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
