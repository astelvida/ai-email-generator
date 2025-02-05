import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function Hero() {
  return (
    <div className="px-10 md:px-20 lg:px-40 flex flex-col items-center mt-24 gap-8">
      <h2 className="text-5xl font-bold text-center">
        AI Powered <span className="text-primary">Email Templates</span>
      </h2>
      <p className="text-lg text-center mt-4">
        Generate email templates in seconds with our AI-powered email template
        generator.
      </p>

      <div className="flex mt-4 gap-4">
        <Link href="/dashboard">
          <Button variant="outline">Try it out</Button>
        </Link>

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </SignedIn>
      </div>

      <Image src="/landing.svg" alt="Hero" width={1000} height={1000} />
    </div>
  );
}
