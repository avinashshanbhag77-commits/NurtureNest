import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Providers from "../components/Providers";

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
          <div className="app-container">
            <Header />
            <main className="main-content" style={{ minHeight: 'calc(100vh - 70px - 200px)' }}>
              {children}
            </main>
            <footer style={{ backgroundColor: 'var(--secondary-color)', padding: '3rem 0', marginTop: 'auto' }}>
              <div className="container" style={{ textAlign: 'center', color: 'var(--text-color)' }}>
                <h3 style={{ margin: '0 0 1rem' }}>NurtureNest</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <a href="#">About Us</a>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Contact</a>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>&copy; 2026 NurtureNest. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
