import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DragAndDropProvider } from "@/providers/DragAndDropProvider";
import { EmailTemplateProvider } from "@/providers/EmailTemplateProvider";
import { SelectedElementProvider } from "@/providers/SelectedElementProvider";

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
            <DragAndDropProvider>
              <EmailTemplateProvider>
                <SelectedElementProvider>
                  <div>{children}</div>
                </SelectedElementProvider>
              </EmailTemplateProvider>
            </DragAndDropProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
