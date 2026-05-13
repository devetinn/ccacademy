'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { createTrailAction, updateTrailAction } from '@/app/admin/trilhas/actions'
import type { Database } from '@/lib/supabase/database.types'

type Trail = Database['public']['Tables']['trails']['Row']

interface TrailFormProps {
  trail?: Trail
  onSuccess?: () => void
}

export function TrailForm({ trail, onSuccess }: TrailFormProps) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (trail) {
        await updateTrailAction(trail.id, formData)
      } else {
        await createTrailAction(formData)
      }
      onSuccess?.()
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={trail?.title ?? ''}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={trail?.description ?? ''}
          rows={3}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimated_min">Tempo estimado (minutos)</Label>
        <Input
          id="estimated_min"
          name="estimated_min"
          type="number"
          min={0}
          defaultValue={trail?.estimated_min ?? 0}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover_image">Imagem de capa</Label>
        {trail?.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trail.cover_image}
            alt="Capa atual"
            className="h-20 w-32 rounded-md object-cover border border-border"
          />
        )}
        <Input
          id="cover_image"
          name="cover_image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="is_active"
          name="is_active"
          defaultChecked={trail?.is_active ?? true}
          value="true"
          disabled={isPending}
        />
        <Label htmlFor="is_active">Trilha ativa</Label>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Salvando...' : trail ? 'Salvar alterações' : 'Criar trilha'}
      </Button>
    </form>
  )
}
