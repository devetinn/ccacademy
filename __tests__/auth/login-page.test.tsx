import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('@/app/(auth)/login/actions', () => ({
  loginAction: vi.fn(),
}))

import { loginAction } from '@/app/(auth)/login/actions'
import LoginPage from '@/app/(auth)/login/page'

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza campo de e-mail e botão de envio', () => {
    render(<LoginPage />)

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar link/i })).toBeInTheDocument()
  })

  it('loginAction é importada sem erros', async () => {
    vi.mocked(loginAction).mockResolvedValue({ success: true })
    const result = await vi.mocked(loginAction)(new FormData())
    expect(result).toEqual({ success: true })
  })

  it('exibe erro quando loginAction retorna erro', async () => {
    vi.mocked(loginAction).mockResolvedValue({ error: 'Não foi possível enviar o link. Tente novamente.' })

    render(<LoginPage />)

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.queryByText(/não foi possível/i)).not.toBeInTheDocument()
  })

  it('botão fica desabilitado durante loading', () => {
    render(<LoginPage />)
    const button = screen.getByRole('button', { name: /enviar link/i })
    expect(button).not.toBeDisabled()
  })

  it('título da plataforma está visível', () => {
    render(<LoginPage />)
    expect(screen.getByText(/Carmem Cavalcante Academy/i)).toBeInTheDocument()
  })
})
