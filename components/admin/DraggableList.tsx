'use client'

import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DraggableListProps<T extends { id: string }> {
  items: T[]
  onReorder: (orderedIds: string[]) => void
  renderItem: (item: T, index: number) => React.ReactNode
  droppableId: string
  className?: string
}

export function DraggableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  droppableId,
  className,
}: DraggableListProps<T>) {
  function handleDragEnd(result: DropResult) {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    const reordered = Array.from(items)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)

    onReorder(reordered.map((i) => i.id))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn('space-y-1', className)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(drag, snapshot) => (
                  <li
                    ref={drag.innerRef}
                    {...drag.draggableProps}
                    className={cn(
                      'flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2',
                      snapshot.isDragging && 'shadow-md opacity-80'
                    )}
                  >
                    <span
                      {...drag.dragHandleProps}
                      className="cursor-grab text-muted-foreground hover:text-foreground"
                      aria-label="Reordenar"
                    >
                      <GripVertical className="h-4 w-4" />
                    </span>
                    <div className="flex-1 min-w-0">{renderItem(item, index)}</div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
