import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const mockUsePathname = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

import { AdminSidebar } from '@/components/admin/AdminSidebar'

describe('AdminSidebar', () => {
  it('renderiza todos os itens de navegação', () => {
    mockUsePathname.mockReturnValue('/admin/dashboard')
    render(<AdminSidebar />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Trilhas')).toBeInTheDocument()
    expect(screen.getByText('Usuários')).toBeInTheDocument()
    expect(screen.getByText('Perguntas')).toBeInTheDocument()
    expect(screen.getByText('NPS')).toBeInTheDocument()
  })

  it('todos os links têm hrefs corretos', () => {
    mockUsePathname.mockReturnValue('/admin/dashboard')
    render(<AdminSidebar />)

    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/admin/dashboard')
    expect(screen.getByText('Trilhas').closest('a')).toHaveAttribute('href', '/admin/trilhas')
    expect(screen.getByText('Usuários').closest('a')).toHaveAttribute('href', '/admin/usuarios')
    expect(screen.getByText('Perguntas').closest('a')).toHaveAttribute('href', '/admin/perguntas')
    expect(screen.getByText('NPS').closest('a')).toHaveAttribute('href', '/admin/nps')
  })

  it('Dashboard está ativo em /admin/dashboard', () => {
    mockUsePathname.mockReturnValue('/admin/dashboard')
    render(<AdminSidebar />)
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink?.className).toContain('bg-primary')
  })

  it('Trilhas está ativo em /admin/trilhas', () => {
    mockUsePathname.mockReturnValue('/admin/trilhas')
    render(<AdminSidebar />)
    const trilhasLink = screen.getByText('Trilhas').closest('a')
    expect(trilhasLink?.className).toContain('bg-primary')
  })

  it('item não-ativo não tem bg-primary', () => {
    mockUsePathname.mockReturnValue('/admin/dashboard')
    render(<AdminSidebar />)
    const trilhasLink = screen.getByText('Trilhas').closest('a')
    expect(trilhasLink?.className).not.toContain('bg-primary')
  })

  it('exibe título Administração', () => {
    mockUsePathname.mockReturnValue('/admin/dashboard')
    render(<AdminSidebar />)
    expect(screen.getByText('Administração')).toBeInTheDocument()
  })
})
