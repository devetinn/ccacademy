'use client'

import { useTransition, useState } from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { revokeUserAction, restoreUserAction } from '@/app/admin/usuarios/actions'
import { Search, UserX, UserCheck } from 'lucide-react'
import type { Database } from '@/lib/supabase/database.types'

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  banned?: boolean
}

interface UserTableProps {
  users: Profile[]
}

export function UserTable({ users }: UserTableProps) {
  const [query, setQuery] = useState('')
  const [, startTransition] = useTransition()

  const filtered = users.filter((u) => {
    const q = query.toLowerCase()
    return (
      u.full_name?.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })

  function handleRevoke(userId: string) {
    if (!confirm('Revogar acesso deste usuário?')) return
    startTransition(() => { void revokeUserAction(userId) })
  }

  function handleRestore(userId: string) {
    startTransition(() => { void restoreUserAction(userId) })
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou e-mail..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {query ? 'Nenhum médico encontrado.' : 'Nenhum médico cadastrado.'}
        </p>
      )}

      <ul className="space-y-2">
        {filtered.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm truncate">
                  {user.full_name || '—'}
                </span>
                {user.role === 'admin' && (
                  <Badge variant="default" className="text-xs">Admin</Badge>
                )}
                {user.banned && (
                  <Badge variant="secondary" className="text-xs">Suspenso</Badge>
                )}
                {user.nps_answered && (
                  <Badge variant="outline" className="text-xs">NPS ✓</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{user.points} pontos</span>
                {user.last_seen_at && (
                  <span>
                    Último acesso: {new Date(user.last_seen_at).toLocaleDateString('pt-BR')}
                  </span>
                )}
                <span>
                  Cadastro: {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/usuarios/${user.id}`}
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                Ver detalhe
              </Link>
              {user.banned ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestore(user.id)}
                  aria-label="Restaurar acesso"
                >
                  <UserCheck className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRevoke(user.id)}
                  aria-label="Revogar acesso"
                  className="text-destructive hover:text-destructive"
                >
                  <UserX className="h-4 w-4" />
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
