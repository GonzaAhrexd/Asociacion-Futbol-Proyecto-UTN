import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "../components/NavBar/NavBar";
import "./globals.css";
import SessionWrapper from "@/components/General/SessionWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Asociación de Fútbol Resistencia",
  description: "Proyecto Integrador DABD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Agregar icono de public/footbal_icon-icons.ico */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/footbal_icon-icons.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <NavBar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
