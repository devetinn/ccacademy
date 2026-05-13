'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function inviteUserAction(formData: FormData) {
  const email = formData.get('email') as string
  const full_name = (formData.get('full_name') as string) || null

  if (!email) return { error: 'E-mail é obrigatório.' }

  const admin = createAdminClient()

  // Cria usuário no Auth (envia magic link de boas-vindas)
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: full_name ?? '' },
  })

  if (error) return { error: error.message }

  // Garante que o perfil existe (trigger deveria criar, mas garante)
  if (data.user) {
    await admin.from('profiles').upsert({
      id: data.user.id,
      email,
      full_name,
    })

    // Dispara magic link de boas-vindas
    await admin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })
  }

  revalidatePath('/admin/usuarios')
  return { success: true }
}

export async function revokeUserAction(userId: string) {
  const admin = createAdminClient()
  // Desabilita o usuário sem deletar dados
  const { error } = await admin.auth.admin.updateUserById(userId, {
    ban_duration: '876600h', // ~100 anos
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/usuarios')
  return { success: true }
}

export async function restoreUserAction(userId: string) {
  const admin = createAdminClient()
  const { error } = await admin.auth.admin.updateUserById(userId, {
    ban_duration: 'none',
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/usuarios')
  return { success: true }
}
