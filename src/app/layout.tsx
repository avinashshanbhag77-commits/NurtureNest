import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import { AuroraBackground } from "@/components/ui/aurora-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NurtureNest",
  description: "Your Smart Pregnancy Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
            <div style={{ position: 'relative', zIndex: 1000 }}>
              <Header />
            </div>
            <main className="main-content" style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
                <AuroraBackground>
                  <div />
                </AuroraBackground>
              </div>
              <div style={{ position: 'relative', zIndex: 10 }}>
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
