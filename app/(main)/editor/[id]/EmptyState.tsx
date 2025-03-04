import { Plus } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "Drop content blocks here" }: EmptyStateProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-purple-300 bg-purple-50/50 p-8">
      <Plus className="mb-2 h-8 w-8 text-purple-500" />
      <p className="text-center text-sm text-purple-500">{message}</p>
    </div>
  );
}
