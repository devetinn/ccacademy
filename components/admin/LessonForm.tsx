'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { createLessonAction, updateLessonAction } from '@/app/admin/trilhas/actions'
import type { Database } from '@/lib/supabase/database.types'

type Lesson = Database['public']['Tables']['lessons']['Row']

interface LessonFormProps {
  moduleId: string
  trailId: string
  lesson?: Lesson
  onSuccess?: () => void
}

export function LessonForm({ moduleId, trailId, lesson, onSuccess }: LessonFormProps) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (lesson) {
        await updateLessonAction(lesson.id, trailId, formData)
      } else {
        await createLessonAction(moduleId, trailId, formData)
      }
      onSuccess?.()
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="lesson-title">Título da aula *</Label>
        <Input
          id="lesson-title"
          name="title"
          defaultValue={lesson?.title ?? ''}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lesson-desc">Descrição</Label>
        <Textarea
          id="lesson-desc"
          name="description"
          defaultValue={lesson?.description ?? ''}
          rows={2}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="video_url">URL do vídeo (YouTube)</Label>
        <Input
          id="video_url"
          name="video_url"
          type="url"
          placeholder="https://youtu.be/..."
          defaultValue={lesson?.video_url ?? ''}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration_sec">Duração (segundos)</Label>
        <Input
          id="duration_sec"
          name="duration_sec"
          type="number"
          min={0}
          defaultValue={lesson?.duration_sec ?? 0}
          disabled={isPending}
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="is_locked"
          name="is_locked"
          defaultChecked={lesson?.is_locked ?? false}
          value="true"
          disabled={isPending}
        />
        <Label htmlFor="is_locked">Aula bloqueada</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lock_condition">Condição de desbloqueio</Label>
        <Input
          id="lock_condition"
          name="lock_condition"
          placeholder="ex: complete_lesson:uuid"
          defaultValue={lesson?.lock_condition ?? ''}
          disabled={isPending}
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Salvando...' : lesson ? 'Salvar' : 'Criar aula'}
      </Button>
    </form>
  )
}
