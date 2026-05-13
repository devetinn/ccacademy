import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { UserDetail } from '@/components/admin/UserDetail'

interface Props {
  params: Promise<{ id: string }>
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (!profile) notFound()

  const [{ data: progress }, { data: userBadges }, { count: totalLessons }] = await Promise.all([
    supabase
      .from('lesson_progress')
      .select('*, lessons(title, module_id)')
      .eq('user_id', id)
      .order('updated_at', { ascending: false }),
    supabase
      .from('user_badges')
      .select('awarded_at, badges(title, description, icon_url)')
      .eq('user_id', id),
    supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true }),
  ])

  return (
    <div className="space-y-4">
      <Link
        href="/admin/usuarios"
        className={buttonVariants({ variant: 'ghost', size: 'sm' }) + ' -ml-2'}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar aos usuários
      </Link>

      <UserDetail
        profile={profile}
        progress={progress ?? []}
        badges={(userBadges ?? []).map((ub) => ({
          badges: (ub.badges as unknown) as { title: string; description: string | null; icon_url: string | null } | null,
          awarded_at: ub.awarded_at,
        }))}
        totalLessons={totalLessons ?? 0}
      />
    </div>
  )
}
