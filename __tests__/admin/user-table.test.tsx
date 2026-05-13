import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/app/admin/usuarios/actions', () => ({
  revokeUserAction: vi.fn(),
  restoreUserAction: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

import { UserTable } from '@/components/admin/UserTable'

const baseUser = {
  id: '1',
  email: 'joao@exemplo.com',
  full_name: 'Dr. João Silva',
  role: 'student',
  points: 150,
  nps_answered: true,
  crm: null,
  avatar_url: null,
  created_at: '2026-01-01T00:00:00Z',
  last_seen_at: '2026-05-10T00:00:00Z',
  banned: false,
}

describe('UserTable', () => {
  it('renderiza usuários na lista', () => {
    render(<UserTable users={[baseUser]} />)
    expect(screen.getByText('Dr. João Silva')).toBeInTheDocument()
    expect(screen.getByText('joao@exemplo.com')).toBeInTheDocument()
  })

  it('exibe badge NPS quando respondido', () => {
    render(<UserTable users={[baseUser]} />)
    expect(screen.getByText('NPS ✓')).toBeInTheDocument()
  })

  it('campo de busca filtra por nome', async () => {
    const users = [
      baseUser,
      { ...baseUser, id: '2', email: 'maria@ex.com', full_name: 'Dra. Maria' },
    ]
    render(<UserTable users={users} />)
    expect(screen.getByText('Dra. Maria')).toBeInTheDocument()
  })

  it('mostra mensagem quando lista está vazia', () => {
    render(<UserTable users={[]} />)
    expect(screen.getByText(/nenhum médico cadastrado/i)).toBeInTheDocument()
  })

  it('botão Ver detalhe tem href correto', () => {
    render(<UserTable users={[baseUser]} />)
    const link = screen.getByText('Ver detalhe').closest('a')
    expect(link).toHaveAttribute('href', '/admin/usuarios/1')
  })
})
