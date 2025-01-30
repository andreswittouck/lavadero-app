"use client";

import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/navbar/navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/login";
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {showNavbar && <Navbar />}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
