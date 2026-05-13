'use client'

import { useState, useTransition } from 'react'
import { DraggableList } from './DraggableList'
import { ModuleForm } from './ModuleForm'
import { LessonForm } from './LessonForm'
import { TrailForm } from './TrailForm'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  Plus, Pencil, Trash2, ChevronRight, Video, Lock,
} from 'lucide-react'
import {
  reorderModulesAction,
  reorderLessonsAction,
  deleteModuleAction,
  deleteLessonAction,
} from '@/app/admin/trilhas/actions'
import type { Database } from '@/lib/supabase/database.types'

type Trail = Database['public']['Tables']['trails']['Row']
type Module = Database['public']['Tables']['modules']['Row']
type Lesson = Database['public']['Tables']['lessons']['Row']

interface TrailDetailClientProps {
  trail: Trail
  modules: (Module & { lessons: Lesson[] })[]
}

export function TrailDetailClient({ trail, modules: initialModules }: TrailDetailClientProps) {
  const [modules, setModules] = useState(initialModules)
  const [, startTransition] = useTransition()

  function handleReorderModules(orderedIds: string[]) {
    const reordered = orderedIds.map((id) => modules.find((m) => m.id === id)!)
    setModules(reordered)
    startTransition(() => { void reorderModulesAction(trail.id, orderedIds) })
  }

  function handleReorderLessons(moduleId: string, orderedIds: string[]) {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== moduleId) return m
        const reordered = orderedIds.map((id) => m.lessons.find((l) => l.id === id)!)
        return { ...m, lessons: reordered }
      })
    )
    startTransition(() => { void reorderLessonsAction(moduleId, trail.id, orderedIds) })
  }

  function handleDeleteModule(moduleId: string) {
    if (!confirm('Deletar este módulo e todas as suas aulas?')) return
    setModules((prev) => prev.filter((m) => m.id !== moduleId))
    startTransition(() => { void deleteModuleAction(moduleId, trail.id) })
  }

  function handleDeleteLesson(lessonId: string, moduleId: string) {
    if (!confirm('Deletar esta aula?')) return
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== moduleId) return m
        return { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
      })
    )
    startTransition(() => { void deleteLessonAction(lessonId, trail.id) })
  }

  return (
    <div className="space-y-6">
      {/* Trail header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {trail.cover_image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={trail.cover_image}
              alt={trail.title}
              className="h-16 w-24 rounded-lg object-cover border border-border"
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{trail.title}</h2>
              <Badge variant={trail.is_active ? 'default' : 'secondary'}>
                {trail.is_active ? 'Ativa' : 'Inativa'}
              </Badge>
            </div>
            {trail.description && (
              <p className="mt-1 text-sm text-muted-foreground">{trail.description}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {trail.estimated_min} min · {modules.length} módulo(s)
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger render={<Button variant="outline" size="sm" />}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar trilha
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Editar trilha</DialogTitle>
            </DialogHeader>
            <TrailForm trail={trail} />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      {/* Modules section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Módulos</h3>
          <Dialog>
            <DialogTrigger render={<Button size="sm" variant="outline" />}>
              <Plus className="mr-2 h-4 w-4" />
              Novo módulo
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo módulo</DialogTitle>
              </DialogHeader>
              <ModuleForm trailId={trail.id} />
            </DialogContent>
          </Dialog>
        </div>

        {modules.length === 0 && (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Nenhum módulo criado ainda.
          </p>
        )}

        <DraggableList
          droppableId={`modules-${trail.id}`}
          items={modules}
          onReorder={handleReorderModules}
          renderItem={(module) => (
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{module.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {module.lessons.length} aula(s)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Dialog>
                    <DialogTrigger render={<Button variant="ghost" size="sm" aria-label="Editar módulo" />}>
                      <Pencil className="h-3.5 w-3.5" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar módulo</DialogTitle>
                      </DialogHeader>
                      <ModuleForm trailId={trail.id} module={module} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Deletar módulo"
                    onClick={() => handleDeleteModule(module.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Lessons inside module */}
              <div className="ml-6 space-y-2">
                <DraggableList
                  droppableId={`lessons-${module.id}`}
                  items={module.lessons}
                  onReorder={(ids) => handleReorderLessons(module.id, ids)}
                  renderItem={(lesson) => (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        {lesson.video_url ? (
                          <Video className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        ) : (
                          <div className="h-3.5 w-3.5 shrink-0" />
                        )}
                        {lesson.is_locked && (
                          <Lock className="h-3 w-3 shrink-0 text-muted-foreground" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                        {lesson.duration_sec > 0 && (
                          <span className="text-xs text-muted-foreground shrink-0">
                            {Math.round(lesson.duration_sec / 60)}min
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Dialog>
                          <DialogTrigger render={<Button variant="ghost" size="sm" aria-label="Editar aula" />}>
                            <Pencil className="h-3.5 w-3.5" />
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Editar aula</DialogTitle>
                            </DialogHeader>
                            <LessonForm
                              moduleId={module.id}
                              trailId={trail.id}
                              lesson={lesson}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Deletar aula"
                          onClick={() => handleDeleteLesson(lesson.id, module.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                />

                <Dialog>
                  <DialogTrigger render={<Button variant="ghost" size="sm" className="h-7 text-xs" />}>
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Adicionar aula
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Nova aula — {module.title}</DialogTitle>
                    </DialogHeader>
                    <LessonForm moduleId={module.id} trailId={trail.id} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
