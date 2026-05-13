import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/app/admin/trilhas/actions', () => ({
  createTrailAction: vi.fn(),
  updateTrailAction: vi.fn(),
}))

import { TrailForm } from '@/components/admin/TrailForm'

describe('TrailForm', () => {
  it('renderiza campos obrigatórios na criação', () => {
    render(<TrailForm />)
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tempo estimado/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar trilha/i })).toBeInTheDocument()
  })

  it('preenche campos com dados da trilha ao editar', () => {
    const trail = {
      id: '1',
      title: 'Declaração de IR',
      description: 'Aprenda tudo sobre IR',
      estimated_min: 120,
      is_active: true,
      cover_image: null,
      order_index: 0,
      created_at: new Date().toISOString(),
    }
    render(<TrailForm trail={trail} />)
    expect(screen.getByDisplayValue('Declaração de IR')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Aprenda tudo sobre IR')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument()
  })

  it('campo de imagem de capa está presente', () => {
    render(<TrailForm />)
    expect(screen.getByLabelText(/imagem de capa/i)).toBeInTheDocument()
  })
})
