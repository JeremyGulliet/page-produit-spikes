import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";



export const metadata: Metadata = {
  title: "Page Produit - Spikes",
  description: "Challenge page produit",
  icons: ["assets/c.png"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
