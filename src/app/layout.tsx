import type { Metadata } from "next";
import "../styles/globals.css";
import Link from "next/link";
import { skranji } from "@/utils/fonts";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/navbar/nav";
import { MuiWrapper } from "@/context/MuiWrapper";

export const metadata: Metadata = {
  title: "Emery - Hone Your Skills",
  description:
    "Welcome to Emery, where you hone your skills and track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <MuiWrapper>
            <header className="py-4">
              <div className="container mx-auto flex justify-between items-center">
                <Navbar />
              </div>
            </header>
            <main className="flex-grow container mx-auto">{children}</main>
            <footer className="pt-20 pb-4 text-center text-xs">
              @tomerikwilliamertvaag
            </footer>
          </MuiWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
