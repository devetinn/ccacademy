import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Carmem Cavalcante Academy
      </h1>
      <p className="text-muted-foreground">Setup concluído — Shadcn/UI com tema Carmem</p>
      <div className="flex gap-4">
        <Button>Botão Primário</Button>
        <Button variant="outline">Botão Outline</Button>
        <Button variant="secondary">Botão Secundário</Button>
      </div>
    </main>
  )
}
