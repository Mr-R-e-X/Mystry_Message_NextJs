import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/context/authProvider";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Mystry || Home",
  description: "Dive into the world of Anonymous Conversations.",
};

const MyPage = () => {
  return (
    <head>
      <link rel="icon" href="/src/app/icon.svg" />
    </head>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MyPage />
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full overflow-x-hidden`}
        >
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
