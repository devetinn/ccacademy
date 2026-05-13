'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ─── Trails ────────────────────────────────────────────────────────────────

export async function createTrailAction(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const estimated_min = Number(formData.get('estimated_min') || 0)
  const is_active = formData.get('is_active') === 'true'

  const { data: trail, error } = await supabase
    .from('trails')
    .insert({ title, description, estimated_min, is_active })
    .select('id')
    .single()

  if (error || !trail) return { error: error?.message ?? 'Erro ao criar trilha.' }

  // Upload cover image if provided
  const coverFile = formData.get('cover_image') as File | null
  if (coverFile && coverFile.size > 0) {
    const ext = coverFile.name.split('.').pop()
    const path = `${trail.id}.${ext}`
    const { data: upload } = await supabase.storage
      .from('covers')
      .upload(path, coverFile, { upsert: true })

    if (upload) {
      const { data: publicUrl } = supabase.storage.from('covers').getPublicUrl(path)
      await supabase
        .from('trails')
        .update({ cover_image: publicUrl.publicUrl })
        .eq('id', trail.id)
    }
  }

  revalidatePath('/admin/trilhas')
  redirect('/admin/trilhas')
}

export async function updateTrailAction(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const estimated_min = Number(formData.get('estimated_min') || 0)
  const is_active = formData.get('is_active') === 'true'

  const updates: Record<string, unknown> = { title, description, estimated_min, is_active }

  const coverFile = formData.get('cover_image') as File | null
  if (coverFile && coverFile.size > 0) {
    const ext = coverFile.name.split('.').pop()
    const path = `${id}.${ext}`
    const { data: upload } = await supabase.storage
      .from('covers')
      .upload(path, coverFile, { upsert: true })

    if (upload) {
      const { data: publicUrl } = supabase.storage.from('covers').getPublicUrl(path)
      updates.cover_image = publicUrl.publicUrl
    }
  }

  const { error } = await supabase.from('trails').update(updates).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/trilhas')
  revalidatePath(`/admin/trilhas/${id}`)
}

export async function toggleTrailActiveAction(id: string, is_active: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('trails').update({ is_active }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/trilhas')
}

// ─── Modules ───────────────────────────────────────────────────────────────

export async function createModuleAction(trailId: string, formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string

  const { data: last } = await supabase
    .from('modules')
    .select('order_index')
    .eq('trail_id', trailId)
    .order('order_index', { ascending: false })
    .limit(1)
    .single()

  const order_index = (last?.order_index ?? -1) + 1

  const { error } = await supabase
    .from('modules')
    .insert({ title, trail_id: trailId, order_index })

  if (error) return { error: error.message }
  revalidatePath(`/admin/trilhas/${trailId}`)
}

export async function updateModuleAction(id: string, trailId: string, formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const { error } = await supabase.from('modules').update({ title }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath(`/admin/trilhas/${trailId}`)
}

export async function deleteModuleAction(id: string, trailId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('modules').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath(`/admin/trilhas/${trailId}`)
}

export async function reorderModulesAction(trailId: string, orderedIds: string[]) {
  const supabase = await createClient()
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from('modules').update({ order_index: index }).eq('id', id)
    )
  )
  revalidatePath(`/admin/trilhas/${trailId}`)
}

// ─── Lessons ───────────────────────────────────────────────────────────────

export async function createLessonAction(moduleId: string, trailId: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const video_url = (formData.get('video_url') as string) || null
  const duration_sec = Number(formData.get('duration_sec') || 0)
  const is_locked = formData.get('is_locked') === 'true'
  const lock_condition = (formData.get('lock_condition') as string) || null

  const { data: last } = await supabase
    .from('lessons')
    .select('order_index')
    .eq('module_id', moduleId)
    .order('order_index', { ascending: false })
    .limit(1)
    .single()

  const order_index = (last?.order_index ?? -1) + 1

  const { error } = await supabase.from('lessons').insert({
    title, description, video_url, duration_sec,
    is_locked, lock_condition, module_id: moduleId, order_index,
  })

  if (error) return { error: error.message }
  revalidatePath(`/admin/trilhas/${trailId}`)
}

export async function updateLessonAction(id: string, trailId: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const video_url = (formData.get('video_url') as string) || null
  const duration_sec = Number(formData.get('duration_sec') || 0)
  const is_locked = formData.get('is_locked') === 'true'
  const lock_condition = (formData.get('lock_condition') as string) || null

  const { error } = await supabase.from('lessons').update({
    title, description, video_url, duration_sec, is_locked, lock_condition,
  }).eq('id', id)

  if (error) return { error: error.message }
  revalidatePath(`/admin/trilhas/${trailId}`)
}

export async function deleteLessonAction(id: string, trailId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('lessons').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath(`/admin/trilhas/${trailId}`)
}

export async function reorderLessonsAction(moduleId: string, trailId: string, orderedIds: string[]) {
  const supabase = await createClient()
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from('lessons').update({ order_index: index }).eq('id', id)
    )
  )
  revalidatePath(`/admin/trilhas/${trailId}`)
}
