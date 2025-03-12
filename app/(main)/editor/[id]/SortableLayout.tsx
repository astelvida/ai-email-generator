import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";

// import { forwardRef } from "react";

// export const Item = forwardRef(
//   (
//     props: { children: React.ReactNode; className?: string; style?: React.CSSPropertiesM },
//     ref: React.Ref<HTMLDivElement>,
//   ) => {
//     return (
//       <div ref={ref} className={cn(props.className)} style={props.style}>
//         {props.children}
//       </div>
//     );
//   },
// );

// Item.displayName = "Item";

interface SortableLayoutProps {
  id: string;
  children: React.ReactNode;
  data?: any;
  className?: string;
  style?: React.CSSProperties;
}

export function SortableLayout({ id, data, className, ...props }: SortableLayoutProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({
      id,
      data: {
        layout: data,
        type: "layout",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
    ...(props.style || {}),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={cn(
        `relative mb-2 cursor-grab active:cursor-grabbing ${isSorting ? "z-10" : ""}`,
        className,
      )}
    >
      {props.children}
    </div>
  );
}
