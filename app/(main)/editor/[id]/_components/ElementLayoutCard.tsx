export function ElementLayoutCard({ layout }: { layout: LayoutConfigType }) {
  return (
    <div
      key={layout.label}
      className="flex flex-col items-center justify-center 
                border-[1.5px]  border-dashed rounded-xl p-3 border-gray-300
                 group hover:shadow-md hover:border-indigo-600 cursor-pointer"
      draggable
      onClick={() => {
        console.log(layout.label);
      }}
    >
      <layout.icon
        className="h-9 w-9 p-2 bg-gray-100  border-0 rounded-full
               group-hover:text-indigo-600 group-hover:bg-indigo-100/50"
      />
      <span className="text-sm group-hover:text-indigo-600">{layout.label}</span>
    </div>
  );
}
