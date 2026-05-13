import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Droppable: ({ children }: { children: (provided: unknown) => React.ReactNode }) =>
    children({ innerRef: vi.fn(), droppableProps: {}, placeholder: null }),
  Draggable: ({
    children,
  }: {
    children: (provided: unknown, snapshot: unknown) => React.ReactNode
  }) =>
    children(
      { innerRef: vi.fn(), draggableProps: {}, dragHandleProps: {} },
      { isDragging: false }
    ),
}))

import { DraggableList } from '@/components/admin/DraggableList'

const items = [
  { id: '1', title: 'Módulo A' },
  { id: '2', title: 'Módulo B' },
  { id: '3', title: 'Módulo C' },
]

describe('DraggableList', () => {
  it('renderiza todos os itens', () => {
    render(
      <DraggableList
        droppableId="test"
        items={items}
        onReorder={vi.fn()}
        renderItem={(item) => <span>{item.title}</span>}
      />
    )
    expect(screen.getByText('Módulo A')).toBeInTheDocument()
    expect(screen.getByText('Módulo B')).toBeInTheDocument()
    expect(screen.getByText('Módulo C')).toBeInTheDocument()
  })

  it('renderiza ícone de grip para cada item', () => {
    render(
      <DraggableList
        droppableId="test"
        items={items}
        onReorder={vi.fn()}
        renderItem={(item) => <span>{item.title}</span>}
      />
    )
    const grips = screen.getAllByLabelText('Reordenar')
    expect(grips).toHaveLength(3)
  })
})
