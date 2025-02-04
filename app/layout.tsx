import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/shared/Header";
import { ToggleViewProvider } from "@/components/contexts/ToggleViewContext";
import { DragAndDropProvider } from "@/components/contexts/DragAndDropContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Email Generator",
  description: "Generate professional emails with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <ToggleViewProvider>
            <DragAndDropProvider>
              <div>{children}</div>
            </DragAndDropProvider>
          </ToggleViewProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
