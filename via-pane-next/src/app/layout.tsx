import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Via Pane - Fermentando Sonhos",
  description: "A excelência da panificação premium que alimenta o Brasil há gerações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
