"use client";

import React from "react";
import Image from "next/image";
import SignInButton from "./SignInButton";
import { useUserDetails } from "@/contexts/user-details-context";
import { Button } from "../ui/button";
import Link from "next/link";

function Header() {
  const { userDetails } = useUserDetails();
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
        {userDetails ? (
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="cursor-pointer">
              <Button>Dashboard</Button>
            </Link>
            <Link href="/profile" className="cursor-pointer">
              <Image
                src={userDetails.picture}
                alt="User"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
            </Link>
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}

export default Header;
