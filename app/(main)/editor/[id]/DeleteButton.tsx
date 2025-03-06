import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteButton({ removeElement }: { removeElement: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute -right-6 -top-6 z-10 h-10 w-10 rounded-full bg-indigo-300 text-gray-100 transition-all hover:scale-105 hover:bg-indigo-600 hover:text-white"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        removeElement();
      }}
    >
      <Trash2
        style={{
          height: "24px",
          width: "24px",
          strokeWidth: "2px",
        }}
      />
      <span className="sr-only">Remove layout</span>
    </Button>
  );
}
