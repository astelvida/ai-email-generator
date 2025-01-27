"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

function Header() {
  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={100}
        style={{ width: "auto", height: "auto" }}
        className="cursor-pointer"
      />
      <div>
        <SignedIn>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="cursor-pointer">
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
