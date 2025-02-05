import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToggleViewProvider } from "@/providers/ToggleViewProvider";
import { DragAndDropProvider } from "@/providers/DragAndDropProvider";
import { TemplateProvider } from "@/providers/TemplateProvider";

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
              <TemplateProvider>
                <div>{children}</div>
              </TemplateProvider>
            </DragAndDropProvider>
          </ToggleViewProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
