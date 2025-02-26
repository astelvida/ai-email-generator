"use client";

import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import { createTemplate } from "@/app/(main)/actions";
import { useTransition } from "react";

export function CreateTemplateButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await createTemplate({ name: "Untitled", content: "" });
        });
      }}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <>
          <PlusIcon className="w-4 h-4 mr-2" />
          Create template
        </>
      )}
    </Button>
  );
}
