import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Springiva Pharma | Quality Medicines & Pharmaceutical Solutions",
  description: "Springiva Pharma — Quality Medicines. Trusted Partnerships. Better Healthcare.",
  openGraph: {
    title: "Springiva Pharma",
    description: "Quality Medicines. Trusted Partnerships. Better Healthcare.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
