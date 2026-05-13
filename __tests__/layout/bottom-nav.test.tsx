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

import { BottomNav } from '@/components/academy/BottomNav'

describe('BottomNav', () => {
  it('renderiza links de Home e Perfil', () => {
    mockUsePathname.mockReturnValue('/')
    render(<BottomNav />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Perfil')).toBeInTheDocument()
  })

  it('Home tem href correto', () => {
    mockUsePathname.mockReturnValue('/')
    render(<BottomNav />)
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('Perfil tem href correto', () => {
    mockUsePathname.mockReturnValue('/')
    render(<BottomNav />)
    const perfilLink = screen.getByText('Perfil').closest('a')
    expect(perfilLink).toHaveAttribute('href', '/perfil')
  })

  it('Home está ativo na rota /', () => {
    mockUsePathname.mockReturnValue('/')
    render(<BottomNav />)
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink?.className).toContain('text-primary')
  })

  it('Perfil está ativo na rota /perfil', () => {
    mockUsePathname.mockReturnValue('/perfil')
    render(<BottomNav />)
    const perfilLink = screen.getByText('Perfil').closest('a')
    expect(perfilLink?.className).toContain('text-primary')
  })
})
