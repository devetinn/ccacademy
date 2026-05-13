'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Users, MessageSquare, BarChart2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/trilhas', label: 'Trilhas', icon: BookOpen },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
  { href: '/admin/perguntas', label: 'Perguntas', icon: MessageSquare },
  { href: '/admin/nps', label: 'NPS', icon: BarChart2 },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-background">
      <div className="flex h-14 items-center border-b border-border px-4">
        <span className="text-sm font-semibold text-primary">Administração</span>
      </div>
      <nav className="py-2">
        <ul className="space-y-0.5 px-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
