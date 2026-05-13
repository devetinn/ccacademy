import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/app/(academy)/actions', () => ({
  logoutAction: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  usePathname: vi.fn(() => '/'),
}))

import { Header } from '@/components/academy/Header'

describe('Header', () => {
  it('exibe o nome da plataforma', () => {
    render(<Header userName="Dr. João" userEmail="joao@exemplo.com" />)
    expect(screen.getByText(/Carmem Cavalcante Academy/i)).toBeInTheDocument()
  })

  it('exibe o nome do usuário', () => {
    render(<Header userName="Dr. João Silva" userEmail="joao@exemplo.com" />)
    expect(screen.getByText('Dr. João Silva')).toBeInTheDocument()
  })

  it('exibe o e-mail quando não há nome', () => {
    render(<Header userName="" userEmail="joao@exemplo.com" />)
    expect(screen.getByText('joao@exemplo.com')).toBeInTheDocument()
  })

  it('tem botão de logout', () => {
    render(<Header userName="Dr. João" userEmail="joao@exemplo.com" />)
    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument()
  })
})
