'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/perfil', label: 'Perfil', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
      <ul className="flex h-16 items-stretch">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href} className="flex flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-1 flex-col items-center justify-center gap-1 text-xs transition-colors',
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
