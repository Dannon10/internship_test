import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaxStreem — Transaction Dashboard",
  description: "Monitor and manage transaction records in real time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
