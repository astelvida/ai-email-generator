import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
function Hero() {
  return (
    <div className="px-10 md:px-20 lg:px-40 flex flex-col items-center mt-24">
      <h2 className="text-5xl font-bold text-center">
        AI Powered <span className="text-primary">Email Templates</span>
      </h2>
      <p className="text-lg text-center mt-4">
        Generate email templates in seconds with our AI-powered email template generator.
      </p>

      <div className="flex mt-4 gap-4">
        <Button variant="outline" className="mt-4">
          Try it out
        </Button>
        <Button className="mt-4">Get started</Button>
      </div>

      <Image src="/window.svg" alt="Hero" width={1000} height={1000} />
    </div>
  );
}

export default Hero;
