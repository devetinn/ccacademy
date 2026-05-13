import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock next/server
vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn(() => ({ cookies: { set: vi.fn() } })),
    redirect: vi.fn((url: URL) => ({ redirected: true, url: url.toString() })),
  },
}))

// Mock updateSession
vi.mock('@/lib/supabase/middleware', () => ({
  updateSession: vi.fn(),
}))

import { NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { middleware } from '@/middleware'

const mockRequest = (pathname: string) =>
  ({
    nextUrl: { pathname },
    url: `http://localhost:3000${pathname}`,
    cookies: { getAll: vi.fn(() => []) },
  }) as unknown as Parameters<typeof middleware>[0]

const mockSupabaseResponse = { type: 'supabaseResponse' }

describe('Middleware — proteção de rotas', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rota pública /login passa sem verificação de autenticação', async () => {
    vi.mocked(updateSession).mockResolvedValue({
      supabaseResponse: mockSupabaseResponse as never,
      user: null,
      supabase: {} as never,
    })

    const req = mockRequest('/login')
    const res = await middleware(req)

    expect(res).toBe(mockSupabaseResponse)
    expect(NextResponse.redirect).not.toHaveBeenCalled()
  })

  it('rota pública /auth/callback passa sem verificação', async () => {
    vi.mocked(updateSession).mockResolvedValue({
      supabaseResponse: mockSupabaseResponse as never,
      user: null,
      supabase: {} as never,
    })

    const req = mockRequest('/auth/callback')
    const res = await middleware(req)

    expect(res).toBe(mockSupabaseResponse)
    expect(NextResponse.redirect).not.toHaveBeenCalled()
  })

  it('rota protegida sem usuário redireciona para /login', async () => {
    vi.mocked(updateSession).mockResolvedValue({
      supabaseResponse: mockSupabaseResponse as never,
      user: null,
      supabase: {} as never,
    })

    const req = mockRequest('/academy')
    await middleware(req)

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/login' })
    )
  })

  it('rota /admin/* com role=student redireciona para /', async () => {
    const mockSupabase = {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => ({ data: { role: 'student' } })),
          })),
        })),
      })),
    }

    vi.mocked(updateSession).mockResolvedValue({
      supabaseResponse: mockSupabaseResponse as never,
      user: { id: 'user-1' } as never,
      supabase: mockSupabase as never,
    })

    const req = mockRequest('/admin/dashboard')
    await middleware(req)

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/' })
    )
  })

  it('rota /admin/* com role=admin libera acesso', async () => {
    const mockSupabase = {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => ({ data: { role: 'admin' } })),
          })),
        })),
      })),
    }

    vi.mocked(updateSession).mockResolvedValue({
      supabaseResponse: mockSupabaseResponse as never,
      user: { id: 'user-1' } as never,
      supabase: mockSupabase as never,
    })

    const req = mockRequest('/admin/dashboard')
    const res = await middleware(req)

    expect(res).toBe(mockSupabaseResponse)
    expect(NextResponse.redirect).not.toHaveBeenCalled()
  })

  it('usuário autenticado em rota não-admin retorna supabaseResponse', async () => {
    vi.mocked(updateSession).mockResolvedValue({
      supabaseResponse: mockSupabaseResponse as never,
      user: { id: 'user-1' } as never,
      supabase: {} as never,
    })

    const req = mockRequest('/academy')
    const res = await middleware(req)

    expect(res).toBe(mockSupabaseResponse)
  })
})
