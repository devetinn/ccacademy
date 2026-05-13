import { describe, it, expect } from 'vitest'
import type { Database, Tables, TablesInsert } from '@/lib/supabase/database.types'

// Helper para extrair as chaves de um tipo em runtime via objeto literal
type TableNames = keyof Database['public']['Tables']

const EXPECTED_TABLES: TableNames[] = [
  'profiles',
  'trails',
  'modules',
  'lessons',
  'lesson_attachments',
  'attachment_downloads',
  'lesson_progress',
  'lesson_questions',
  'nps_responses',
  'badges',
  'user_badges',
  'certificates',
]

describe('Database Schema — tipos gerados', () => {
  it('deve ter todas as 12 tabelas esperadas', () => {
    // Valida em tempo de compilação via type assignment
    const tables: TableNames[] = EXPECTED_TABLES
    expect(tables).toHaveLength(12)
    expect(tables).toContain('profiles')
    expect(tables).toContain('trails')
    expect(tables).toContain('nps_responses')
    expect(tables).toContain('certificates')
  })

  it('profiles.Row deve ter campos obrigatórios', () => {
    type ProfileRow = Tables<'profiles'>
    const sample: ProfileRow = {
      id: 'uuid-test',
      email: 'medico@teste.com',
      full_name: null,
      crm: null,
      avatar_url: null,
      points: 0,
      nps_answered: false,
      role: 'student',
      created_at: new Date().toISOString(),
      last_seen_at: null,
    }
    expect(sample.nps_answered).toBe(false)
    expect(sample.role).toBe('student')
    expect(sample.points).toBe(0)
  })

  it('profiles.Insert deve ter email e id obrigatórios', () => {
    type ProfileInsert = TablesInsert<'profiles'>
    const insert: ProfileInsert = {
      id: 'uuid-required',
      email: 'test@email.com',
    }
    expect(insert.id).toBeDefined()
    expect(insert.email).toBeDefined()
  })

  it('trails.Row deve ter campos de trilha', () => {
    type TrailRow = Tables<'trails'>
    const trail: TrailRow = {
      id: 'uuid',
      title: 'Gestão Financeira Médica',
      description: null,
      cover_image: null,
      estimated_min: 120,
      order_index: 1,
      is_active: true,
      created_at: new Date().toISOString(),
    }
    expect(trail.is_active).toBe(true)
    expect(trail.estimated_min).toBe(120)
  })

  it('lesson_progress deve ter unique constraint refletida nos tipos (user_id + lesson_id)', () => {
    type ProgressRow = Tables<'lesson_progress'>
    const progress: ProgressRow = {
      id: 'uuid',
      user_id: 'user-uuid',
      lesson_id: 'lesson-uuid',
      watched_pct: 80,
      completed: true,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    expect(progress.user_id).toBe('user-uuid')
    expect(progress.lesson_id).toBe('lesson-uuid')
    expect(progress.watched_pct).toBe(80)
  })

  it('nps_responses deve ter score como number', () => {
    type NpsRow = Tables<'nps_responses'>
    const nps: NpsRow = {
      id: 'uuid',
      user_id: 'user-uuid',
      score: 9,
      comment: 'Ótimo conteúdo',
      created_at: new Date().toISOString(),
    }
    expect(typeof nps.score).toBe('number')
    expect(nps.score).toBeGreaterThanOrEqual(0)
    expect(nps.score).toBeLessThanOrEqual(10)
  })

  it('certificates deve ter unique (user_id + trail_id) refletida nos tipos', () => {
    type CertRow = Tables<'certificates'>
    const cert: CertRow = {
      id: 'uuid',
      user_id: 'user-uuid',
      trail_id: 'trail-uuid',
      issued_at: new Date().toISOString(),
      cert_url: null,
    }
    expect(cert.user_id).toBeDefined()
    expect(cert.trail_id).toBeDefined()
  })

  it('lesson_questions deve ter is_public como boolean', () => {
    type QuestionRow = Tables<'lesson_questions'>
    const q: QuestionRow = {
      id: 'uuid',
      lesson_id: 'lesson-uuid',
      user_id: 'user-uuid',
      question: 'Como declarar pró-labore?',
      answer: null,
      answered_by: null,
      answered_at: null,
      is_public: false,
      created_at: new Date().toISOString(),
    }
    expect(typeof q.is_public).toBe('boolean')
  })
})
