import { LayoutConfig } from "@/lib/types/config.types";

export function ColumnLayout({ layout }: { layout: LayoutConfig }) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.numOfCol}, 1fr)`,
        }}
      >
        {Array.from({ length: layout.numOfCol }).map((_, index) => (
          <div
            key={index}
            className="flex justify-center border-4 border-dashed border-red-300 p-2"
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
}
