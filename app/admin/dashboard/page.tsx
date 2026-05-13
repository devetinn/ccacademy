import { createClient } from '@/lib/supabase/server'
import { getAdminMetrics } from '@/lib/queries/metrics'
import { Users, Activity, BarChart2, Star } from 'lucide-react'

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
}: {
  label: string
  value: string | number
  icon: React.ElementType
  sub?: string
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const metrics = await getAdminMetrics(supabase)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Métricas de engajamento da plataforma</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total de médicos"
          value={metrics.totalUsers}
          icon={Users}
        />
        <StatCard
          label="Ativos (7 dias)"
          value={metrics.active7}
          icon={Activity}
          sub="via last_seen_at"
        />
        <StatCard
          label="Ativos (30 dias)"
          value={metrics.active30}
          icon={Activity}
          sub="via last_seen_at"
        />
        <StatCard
          label="NPS respondido"
          value={`${metrics.npsPercent}%`}
          icon={BarChart2}
          sub={metrics.npsAvg !== null ? `Score médio: ${metrics.npsAvg}/10` : 'Sem respostas'}
        />
      </div>

      {metrics.npsAvg !== null && (
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Score NPS Geral</span>
          </div>
          <p className="text-3xl font-bold text-primary">{metrics.npsAvg}<span className="text-base font-normal text-muted-foreground">/10</span></p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top 5 aulas */}
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="font-medium mb-3">Top 5 aulas mais concluídas</h2>
          {metrics.top5Lessons.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum dado disponível.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-left font-medium text-muted-foreground">Aula</th>
                  <th className="pb-2 text-right font-medium text-muted-foreground">Conclusões</th>
                </tr>
              </thead>
              <tbody>
                {metrics.top5Lessons.map((l) => (
                  <tr key={l.id} className="border-b border-border last:border-0">
                    <td className="py-2 truncate max-w-[180px]">{l.title}</td>
                    <td className="py-2 text-right font-medium">{l.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Conclusão por trilha */}
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="font-medium mb-3">Taxa de conclusão por trilha</h2>
          {metrics.trailStats.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma trilha ativa.</p>
          ) : (
            <ul className="space-y-3">
              {metrics.trailStats.map((t) => (
                <li key={t.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="truncate max-w-[200px]">{t.title}</span>
                    <span className="font-medium ml-2">{t.completionRate}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full bg-primary transition-all"
                      style={{ width: `${t.completionRate}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
