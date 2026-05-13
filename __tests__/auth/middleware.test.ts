import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockGetUser = vi.fn()

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}))

vi.mock('next/server', () => {
  const NextResponse = {
    next: vi.fn(() => ({
      cookies: { set: vi.fn() },
    })),
    redirect: vi.fn((url: URL) => ({ redirected: true, url: url.toString() })),
  }
  return { NextResponse }
})

import { NextResponse } from 'next/server'
import { middleware } from '@/middleware'

const mockRequest = (pathname: string) =>
  ({
    nextUrl: { pathname },
    url: `http://localhost:3000${pathname}`,
    cookies: { getAll: vi.fn(() => []), set: vi.fn() },
  }) as unknown as Parameters<typeof middleware>[0]

describe('Middleware — proteção de rotas', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(NextResponse.next).mockReturnValue({ cookies: { set: vi.fn() } } as never)
  })

  it('rota pública /login passa sem redirecionar', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const req = mockRequest('/login')
    await middleware(req)
    expect(NextResponse.redirect).not.toHaveBeenCalled()
  })

  it('rota pública /auth/callback passa sem redirecionar', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const req = mockRequest('/auth/callback')
    await middleware(req)
    expect(NextResponse.redirect).not.toHaveBeenCalled()
  })

  it('rota protegida sem usuário redireciona para /login', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const req = mockRequest('/academy')
    await middleware(req)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/login' })
    )
  })

  it('rota /admin sem autenticação redireciona para /login', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const req = mockRequest('/admin/dashboard')
    await middleware(req)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/login' })
    )
  })

  it('usuário autenticado em rota protegida não redireciona', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })
    const req = mockRequest('/academy')
    await middleware(req)
    expect(NextResponse.redirect).not.toHaveBeenCalled()
  })

  it('usuário autenticado em /admin não redireciona (role check fica no layout)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })
    const req = mockRequest('/admin/dashboard')
    await middleware(req)
    expect(NextResponse.redirect).not.toHaveBeenCalled()
  })
})
