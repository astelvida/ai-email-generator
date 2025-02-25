import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function Hero() {
  return (
    <div className="mt-24 flex flex-col items-center gap-8 px-10 md:px-20 lg:px-40">
      <h2 className="text-center text-5xl font-bold">
        AI Powered <span className="text-primary">Email Templates</span>
      </h2>
      <p className="mt-4 text-center text-lg">
        Generate email templates in seconds with our AI-powered email template generator.
      </p>

      <div className="mt-4 flex gap-4">
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

      <Image src="/landing.png" alt="Hero" width={1000} height={1000} />
    </div>
  );
}
