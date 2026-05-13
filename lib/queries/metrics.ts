import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types'

type Client = SupabaseClient<Database>

export async function getAdminMetrics(supabase: Client) {
  const now = new Date()
  const minus7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const minus30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { count: totalUsers },
    { count: active7 },
    { count: active30 },
    { count: npsAnswered },
    { count: totalNps },
    npsScores,
    topLessons,
    trailCompletion,
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_seen_at', minus7),
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_seen_at', minus30),
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('nps_answered', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('nps_responses').select('score'),
    supabase
      .from('lesson_progress')
      .select('lesson_id, lessons(title)')
      .eq('completed', true),
    supabase
      .from('trails')
      .select('id, title, modules(lessons(lesson_progress(completed)))'),
  ])

  // NPS score médio
  const npsAvg =
    npsScores.data && npsScores.data.length > 0
      ? Math.round(
          npsScores.data.reduce((sum, r) => sum + r.score, 0) / npsScores.data.length
        )
      : null

  // Top 5 aulas mais concluídas
  const lessonCounts: Record<string, { id: string; title: string; count: number }> = {}
  topLessons.data?.forEach((lp) => {
    const lesson = lp.lessons as unknown as { title: string } | null
    if (!lessonCounts[lp.lesson_id]) {
      lessonCounts[lp.lesson_id] = {
        id: lp.lesson_id,
        title: lesson?.title ?? 'Aula sem título',
        count: 0,
      }
    }
    lessonCounts[lp.lesson_id].count++
  })
  const top5Lessons = Object.values(lessonCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Taxa de conclusão por trilha
  const trailStats = (trailCompletion.data ?? []).map((trail) => {
    const modules = (trail.modules as unknown as Array<{
      lessons: Array<{ lesson_progress: Array<{ completed: boolean }> }>
    }>) ?? []

    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
    const completedByUser: Record<string, number> = {}

    modules.forEach((m) => {
      m.lessons.forEach((l) => {
        l.lesson_progress.forEach((lp) => {
          if (lp.completed) completedByUser[trail.id] = (completedByUser[trail.id] ?? 0) + 1
        })
      })
    })

    const completionRate =
      totalLessons > 0 && totalUsers
        ? Math.round(
            (Object.values(completedByUser).reduce((a, b) => a + b, 0) /
              (totalLessons * (totalUsers ?? 1))) *
              100
          )
        : 0

    return { id: trail.id, title: trail.title, completionRate, totalLessons }
  })

  return {
    totalUsers: totalUsers ?? 0,
    active7: active7 ?? 0,
    active30: active30 ?? 0,
    npsPercent:
      totalNps ? Math.round(((npsAnswered ?? 0) / totalNps) * 100) : 0,
    npsAvg,
    top5Lessons,
    trailStats,
  }
}
