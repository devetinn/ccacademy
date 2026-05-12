# Carmem Cavalcante Academy — Contexto do Projeto

## Visão
Plataforma de Customer Education exclusiva para médicos clientes da Carmem Cavalcante Contabilidade.
Não é um curso. É o diferencial competitivo que reduz suporte, aumenta retenção e coleta NPS.

## Stack Obrigatória
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Backend:** Supabase (Auth magic link, PostgreSQL, Storage, RLS)
- **UI:** Shadcn/UI + Tailwind CSS
- **E-mails:** Resend
- **Deploy:** Vercel (CI/CD automático via GitHub)
- **Vídeo:** YouTube não-listado + react-player
- **PDF:** react-pdf
- **Animações:** Framer Motion

## Identidade Visual
- Azul institucional Carmem Cavalcante como cor primária
- Branco e cinza claro como secundários
- Mobile-first: 375px como breakpoint base (iPhone SE)
- Tom: profissional, acolhedor, direto

## Estrutura de Pastas (App Router)
```
app/
├── (auth)/login/          → magic link login
├── (academy)/
│   ├── page.tsx           → home: trilhas + progresso + NPS gate
│   ├── trilha/[id]/       → módulos + aulas da trilha
│   ├── aula/[id]/         → player + materiais + Q&A
│   ├── perfil/            → progresso, badges, pontos
│   └── certificado/[id]/  → certificado digital
└── (admin)/
    ├── dashboard/         → métricas gerais
    ├── trilhas/           → CRUD trilhas/módulos/aulas
    ├── usuarios/          → gerenciar médicos
    ├── perguntas/         → responder Q&A
    └── nps/               → dashboard NPS
```

## Regras de Desenvolvimento
- Sempre rodar `npm run lint` e `npm run typecheck` antes de marcar task como concluída
- RLS ativado em todas as tabelas com dados de usuário
- Magic link: zero senha, zero fricção para o médico
- Progresso de vídeo: 80% assistido = concluído automaticamente
- NPS gate: `nps_answered = true` no profile desbloqueia conteúdo via middleware

## Documentação
- PRD: `docs/prd/PRD_Carmem_Cavalcante_Academy_v2.md`
- Architecture: `docs/architecture/architecture.md`
- Stories: `docs/stories/`
- Epics: `docs/stories/epics/`

## Domínio
`carmemcavalcanteacademy.com.br`

## AIOS
- Metodologia: Story Development Cycle (SDC)
- PRD fonte: `docs/prd/PRD_Carmem_Cavalcante_Academy_v2.md`
