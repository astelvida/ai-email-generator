"use client";

import { Button } from "@/components/ui/button";
import { useUserDetails } from "@/contexts/user-details-context";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Page = () => {
  const { userDetails } = useUserDetails();

  return (
    <div className="flex flex-col gap-10 px-10 md:px-20 lg:px-56 mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">{`Hello, ${userDetails?.name}!`}</h3>
        <Button>
          <PlusIcon className="w-4 h-4" /> Generate Template
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-primary">Workspace</h3>
        {userDetails?.templates ? (
          userDetails?.templates.map((template) => (
            <div key={template.id}>
              <h2>{template.name}</h2>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-10">
            <Image src="/envelope.svg" alt="Hero" width={300} height={300} />
            <Button>Create your first template</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
