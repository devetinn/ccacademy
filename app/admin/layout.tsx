import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { logoutAction } from '@/app/(academy)/actions'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  const displayName = profile?.full_name || profile?.email || user.email || ''

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-primary px-6 text-primary-foreground">
        <span className="text-sm font-semibold">
          Admin — Carmem Cavalcante Academy
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs opacity-80">{displayName}</span>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label="Sair"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </header>

      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
