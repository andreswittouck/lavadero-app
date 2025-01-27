"use client";

import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header>
            <h1>Mi Lavadero</h1>
          </header>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
