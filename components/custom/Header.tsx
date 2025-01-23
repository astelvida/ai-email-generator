import React from "react";
import Image from "next/image";
import SignInButton from "./SignInButton";

function Header() {
  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10">
      <Image src="/logo.svg" alt="Logo" width={160} height={120} />
      <div>
        <SignInButton />
      </div>
    </div>
  );
}

export default Header;
