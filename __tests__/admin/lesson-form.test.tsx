import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/app/admin/trilhas/actions', () => ({
  createLessonAction: vi.fn(),
  updateLessonAction: vi.fn(),
}))

import { LessonForm } from '@/components/admin/LessonForm'

describe('LessonForm', () => {
  it('renderiza campos da aula', () => {
    render(<LessonForm moduleId="mod-1" trailId="trail-1" />)
    expect(screen.getByLabelText(/título da aula/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/url do vídeo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/duração/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar aula/i })).toBeInTheDocument()
  })

  it('preenche campos ao editar aula', () => {
    const lesson = {
      id: 'l1',
      module_id: 'mod-1',
      title: 'Introdução ao IR',
      description: 'Conceitos básicos',
      video_url: 'https://youtu.be/abc',
      duration_sec: 900,
      is_locked: false,
      lock_condition: null,
      order_index: 0,
      created_at: new Date().toISOString(),
    }
    render(<LessonForm moduleId="mod-1" trailId="trail-1" lesson={lesson} />)
    expect(screen.getByDisplayValue('Introdução ao IR')).toBeInTheDocument()
    expect(screen.getByDisplayValue('https://youtu.be/abc')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument()
  })
})
