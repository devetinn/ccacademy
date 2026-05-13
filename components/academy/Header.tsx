'use client'

import { logoutAction } from '@/app/(academy)/actions'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface HeaderProps {
  userName: string
  userEmail: string
}

export function Header({ userName, userEmail }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex h-14 max-w-screen-lg items-center justify-between px-4">
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">
            Carmem Cavalcante Academy
          </span>
          <span className="text-xs opacity-80">{userName || userEmail}</span>
        </div>

        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            aria-label="Sair"
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">Sair</span>
          </Button>
        </form>
      </div>
    </header>
  )
}
