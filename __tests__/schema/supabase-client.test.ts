import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock @supabase/ssr para não exigir variáveis de ambiente reais nos testes unitários
vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => ({
    auth: { getUser: vi.fn() },
    from: vi.fn(() => ({ select: vi.fn() })),
  })),
}))

describe('Supabase Browser Client', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://jstoiuoxyxrdqogcjhog.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key')
  })

  it('deve instanciar o cliente sem lançar erros', async () => {
    const { createClient } = await import('@/lib/supabase/client')
    expect(() => createClient()).not.toThrow()
  })

  it('createClient deve retornar objeto com método from', async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const client = createClient()
    expect(client).toHaveProperty('from')
  })

  it('createClient deve retornar objeto com auth', async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const client = createClient()
    expect(client).toHaveProperty('auth')
  })
})
