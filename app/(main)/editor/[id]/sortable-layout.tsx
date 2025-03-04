import type React from "react"
import { SortableItem } from "./sortable-item"
import { DroppableZone } from "./droppable-zone"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SortableLayoutProps {
  layoutSection: {
    id: string
    layout: {
      id: string
      name: string
      columns: number[]
    }
  }
  blocks: any[]
  renderBlock: (block: any) => React.ReactNode
  onRemove: () => void
}

export function SortableLayout({ layoutSection, blocks, renderBlock, onRemove }: SortableLayoutProps) {
  // Get blocks for each column
  const getColumnBlocks = (columnIndex: number) => {
    return blocks.filter((block) => block.layoutId === layoutSection.id && block.column === columnIndex)
  }

  return (
    <SortableItem id={layoutSection.id}>
      <div className="relative rounded-lg border border-gray-200 bg-white p-2 shadow-sm hover:border-purple-300 transition-colors group">
        <Button
          variant="destructive"
          size="sm"
          className="absolute -right-3 -top-3 z-20 h-7 w-7 rounded-full bg-red-500 p-0 text-white hover:bg-red-600"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onRemove()
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove layout</span>
        </Button>
        <div className="flex gap-4">
          {layoutSection.layout.columns.map((width, columnIndex) => {
            const columnBlocks = getColumnBlocks(columnIndex)
            const columnBlockIds = columnBlocks.map((block) => block.id)

            return (
              <DroppableZone
                key={`column-${layoutSection.id}-${columnIndex}`}
                id={`column-${layoutSection.id}-${columnIndex}`}
                className="flex-grow"
                style={{ flexBasis: `${(width / 12) * 100}%` }}
                items={columnBlockIds}
              >
                {columnBlocks.map(renderBlock)}
              </DroppableZone>
            )
          })}
        </div>
      </div>
    </SortableItem>
  )
}

