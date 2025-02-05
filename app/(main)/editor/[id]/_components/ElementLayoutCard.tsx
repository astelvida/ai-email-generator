import { LayoutConfig, ElementConfig } from "@/lib/types/config.types";

export function ElementLayoutCard({
  layout,
}: {
  layout: LayoutConfig | ElementConfig;
}) {
  return (
    <div className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed border-gray-300 p-3 hover:border-indigo-600 hover:shadow-md">
      <layout.icon className="h-9 w-9 rounded-full border-0 bg-gray-100 p-2 group-hover:bg-indigo-100/50 group-hover:text-indigo-600" />
      <span className="text-sm group-hover:text-indigo-600">
        {layout.label}
      </span>
    </div>
  );
}
