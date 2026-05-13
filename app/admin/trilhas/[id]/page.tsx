import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { TrailDetailClient } from '@/components/admin/TrailDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export default async function TrailDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: trail } = await supabase
    .from('trails')
    .select('*')
    .eq('id', id)
    .single()

  if (!trail) notFound()

  const { data: modules } = await supabase
    .from('modules')
    .select('*, lessons(*)')
    .eq('trail_id', id)
    .order('order_index', { ascending: true })

  const modulesWithLessons = (modules ?? []).map((m) => ({
    ...m,
    lessons: [...(m.lessons ?? [])].sort((a, b) => a.order_index - b.order_index),
  }))

  return (
    <div className="space-y-4">
      <Link
        href="/admin/trilhas"
        className={buttonVariants({ variant: 'ghost', size: 'sm' }) + ' -ml-2'}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar às trilhas
      </Link>

      <TrailDetailClient trail={trail} modules={modulesWithLessons} />
    </div>
  )
}
