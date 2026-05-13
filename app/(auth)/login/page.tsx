'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction } from './actions'

export default function LoginPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    setErrorMsg('')

    const result = await loginAction(formData)

    if (result?.error) {
      setErrorMsg(result.error)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-[--primary]">
            Carmem Cavalcante Academy
          </h1>
          <p className="text-sm text-muted-foreground">
            Acesso exclusivo para médicos clientes
          </p>
        </div>

        {status === 'sent' ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center space-y-2">
            <p className="font-medium text-green-800">Link enviado!</p>
            <p className="text-sm text-green-700">
              Verifique seu e-mail e clique no link para acessar a plataforma.
            </p>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com.br"
                required
                autoComplete="email"
                disabled={status === 'loading'}
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-destructive">{errorMsg}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[--primary] hover:bg-[--primary]/90"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar link de acesso'}
            </Button>
          </form>
        )}
      </div>
    </main>
  )
}
