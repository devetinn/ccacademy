import type { Database } from '@/lib/supabase/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type LessonProgress = Database['public']['Tables']['lesson_progress']['Row'] & {
  lessons: { title: string; module_id: string } | null
}
type UserBadge = {
  badges: { title: string; description: string | null; icon_url: string | null } | null
  awarded_at: string
}

interface UserDetailProps {
  profile: Profile
  progress: LessonProgress[]
  badges: UserBadge[]
  totalLessons: number
}

export function UserDetail({ profile, progress, badges, totalLessons }: UserDetailProps) {
  const completedCount = progress.filter((p) => p.completed).length
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="rounded-lg border border-border bg-background p-4">
        <h2 className="font-semibold">{profile.full_name || profile.email}</h2>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
        {profile.crm && <p className="text-sm text-muted-foreground">CRM: {profile.crm}</p>}
        <div className="mt-3 flex items-center gap-4 text-sm">
          <span className="font-medium">{profile.points} pontos</span>
          <span className="text-muted-foreground">
            Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR')}
          </span>
          {profile.last_seen_at && (
            <span className="text-muted-foreground">
              Último acesso: {new Date(profile.last_seen_at).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-lg border border-border bg-background p-4">
        <h3 className="font-medium mb-3">Progresso geral</h3>
        <div className="flex items-center gap-4 mb-3">
          <div className="text-2xl font-bold text-primary">{progressPct}%</div>
          <div className="text-sm text-muted-foreground">
            {completedCount} de {totalLessons} aulas concluídas
          </div>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Completed lessons */}
      {completedCount > 0 && (
        <div className="rounded-lg border border-border bg-background p-4">
          <h3 className="font-medium mb-3">Aulas concluídas ({completedCount})</h3>
          <ul className="space-y-1.5">
            {progress
              .filter((p) => p.completed)
              .map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="truncate">{p.lessons?.title ?? 'Aula removida'}</span>
                  {p.completed_at && (
                    <span className="text-xs text-muted-foreground ml-2 shrink-0">
                      {new Date(p.completed_at).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Badges */}
      {badges.length > 0 && (
        <div className="rounded-lg border border-border bg-background p-4">
          <h3 className="font-medium mb-3">Badges ({badges.length})</h3>
          <ul className="flex flex-wrap gap-2">
            {badges.map((ub, i) => (
              <li key={i} className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm">
                {ub.badges?.icon_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ub.badges.icon_url} alt="" className="h-4 w-4" />
                )}
                <span>{ub.badges?.title ?? '—'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
