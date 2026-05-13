import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, BookOpen, Clock, ToggleLeft, ToggleRight } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TrailForm } from '@/components/admin/TrailForm'
import { toggleTrailActiveAction } from './actions'

export default async function AdminTrilhasPage() {
  const supabase = await createClient()

  const { data: trails } = await supabase
    .from('trails')
    .select('*, modules(count)')
    .order('order_index', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Trilhas</h1>
          <p className="text-sm text-muted-foreground">{trails?.length ?? 0} trilha(s) cadastrada(s)</p>
        </div>

        <Dialog>
          <DialogTrigger render={<Button size="sm" />}>
            <Plus className="mr-2 h-4 w-4" />
            Nova trilha
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nova trilha</DialogTitle>
            </DialogHeader>
            <TrailForm />
          </DialogContent>
        </Dialog>
      </div>

      {!trails?.length && (
        <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
          <BookOpen className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p>Nenhuma trilha cadastrada ainda.</p>
          <p className="text-sm">Crie a primeira trilha usando o botão acima.</p>
        </div>
      )}

      <ul className="space-y-3">
        {trails?.map((trail) => {
          const moduleCount = Array.isArray(trail.modules)
            ? trail.modules.length
            : (trail.modules as unknown as { count: number }[])?.[0]?.count ?? 0

          return (
            <li
              key={trail.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-background p-4"
            >
              {trail.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={trail.cover_image}
                  alt={trail.title}
                  className="h-14 w-20 shrink-0 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-muted">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{trail.title}</span>
                  <Badge variant={trail.is_active ? 'default' : 'secondary'}>
                    {trail.is_active ? 'Ativa' : 'Inativa'}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {moduleCount} módulo(s)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {trail.estimated_min} min
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <form
                  action={async () => {
                    'use server'
                    await toggleTrailActiveAction(trail.id, !trail.is_active)
                  }}
                >
                  <Button type="submit" variant="ghost" size="sm" aria-label="Alternar status">
                    {trail.is_active ? (
                      <ToggleRight className="h-5 w-5 text-primary" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </form>

                <Link
                  href={`/admin/trilhas/${trail.id}`}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  Gerenciar
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
