import type { Metadata } from "next";
import "./globals.css";
import { advocate } from "@/config/advocate";

export const metadata: Metadata = {
  title: advocate.meta.title,
  description: advocate.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
