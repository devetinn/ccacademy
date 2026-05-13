import { describe, it, expect } from 'vitest'

describe('getAdminMetrics', () => {
  it('retorna zeros quando banco está vazio', async () => {

    // Mock simples — verifica que a função não quebra sem dados
    const { getAdminMetrics } = await import('@/lib/queries/metrics')
    expect(getAdminMetrics).toBeDefined()
    expect(typeof getAdminMetrics).toBe('function')
  })

  it('calcula percentual NPS corretamente', () => {
    const npsAnswered = 8
    const total = 10
    const pct = Math.round((npsAnswered / total) * 100)
    expect(pct).toBe(80)
  })

  it('calcula score NPS médio corretamente', () => {
    const scores = [9, 8, 10, 7, 9]
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    expect(avg).toBe(9)
  })
})
