import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/academy/Header'
import { BottomNav } from '@/components/academy/BottomNav'

export default async function AcademyLayout({
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
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  const userName = profile?.full_name ?? ''
  const userEmail = profile?.email ?? user.email ?? ''

  return (
    <div className="flex min-h-screen flex-col">
      <Header userName={userName} userEmail={userEmail} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  )
}
