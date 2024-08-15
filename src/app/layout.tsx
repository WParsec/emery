import type { Metadata } from "next";
import "../styles/globals.css";
import Link from "next/link";
import { skranji } from "@/utils/fonts";
import { AuthProvider } from "@/context/AuthContext"; // Import your AuthProvider

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
          <header className="p-4">
            <div className="container mx-auto flex justify-start">
              <Link href="/">
                <p className={`text-2xl font-bold ${skranji.className}`}>
                  Emery
                </p>
              </Link>
            </div>
          </header>
          <main className="flex-grow container mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
