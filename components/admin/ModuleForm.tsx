'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createModuleAction, updateModuleAction } from '@/app/admin/trilhas/actions'
import type { Database } from '@/lib/supabase/database.types'

type Module = Database['public']['Tables']['modules']['Row']

interface ModuleFormProps {
  trailId: string
  module?: Module
  onSuccess?: () => void
}

export function ModuleForm({ trailId, module, onSuccess }: ModuleFormProps) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (module) {
        await updateModuleAction(module.id, trailId, formData)
      } else {
        await createModuleAction(trailId, formData)
      }
      onSuccess?.()
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="module-title">Título do módulo *</Label>
        <Input
          id="module-title"
          name="title"
          defaultValue={module?.title ?? ''}
          required
          disabled={isPending}
        />
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Salvando...' : module ? 'Salvar' : 'Criar módulo'}
      </Button>
    </form>
  )
}
