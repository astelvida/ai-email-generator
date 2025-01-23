import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10">
      <Image src="/logo.svg" alt="Logo" width={160} height={120} />
      <div>
        <Button>
          <Link href="/">Get started</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
