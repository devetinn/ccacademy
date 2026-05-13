import { createClient } from '@/lib/supabase/server'
import { UserTable } from '@/components/admin/UserTable'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { inviteUserAction } from './actions'
import { UserPlus } from 'lucide-react'

export default async function AdminUsuariosPage() {
  const supabase = await createClient()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Usuários</h1>
          <p className="text-sm text-muted-foreground">{profiles?.length ?? 0} médico(s) cadastrado(s)</p>
        </div>

        <Dialog>
          <DialogTrigger render={<Button size="sm" />}>
            <UserPlus className="mr-2 h-4 w-4" />
            Adicionar médico
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar médico</DialogTitle>
            </DialogHeader>
            <form action={async (fd) => { await inviteUserAction(fd) }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome completo</Label>
                <Input id="full_name" name="full_name" placeholder="Dr. João Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input id="email" name="email" type="email" required placeholder="medico@exemplo.com" />
              </div>
              <Button type="submit" className="w-full">
                Criar conta e enviar acesso
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <UserTable users={profiles ?? []} />
    </div>
  )
}
