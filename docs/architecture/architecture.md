# Arquitetura — Carmem Cavalcante Academy

## Visão Geral

Plataforma de Customer Education — Next.js 15 + Supabase + Vercel

```
┌─────────────────────────────────────────────────────────────┐
│                    carmemcavalcanteacademy.com.br            │
│                         (Vercel CDN)                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                     Next.js 15 (App Router)                  │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │  (auth)/     │  │  (academy)/   │  │   (admin)/       │  │
│  │  login/      │  │  home + trilha│  │   backoffice     │  │
│  │  magic link  │  │  aula + perfil│  │   CRUD + métricas│  │
│  └──────────────┘  └───────────────┘  └──────────────────┘  │
│                    middleware.ts (auth guard + NPS gate)      │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                        Supabase                              │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │  Auth        │  │  PostgreSQL   │  │   Storage        │  │
│  │  magic link  │  │  + RLS        │  │   attachments/   │  │
│  │  sessions    │  │  + triggers   │  │   covers/        │  │
│  └──────────────┘  └───────────────┘  └──────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
┌─────────────▼──────┐    ┌────────────▼──────────┐
│  Resend             │    │  YouTube (embed)        │
│  E-mails            │    │  Vídeos não-listados    │
│  transacionais      │    │  react-player           │
└─────────────────────┘    └───────────────────────┘
```

## Camadas

### Frontend (Next.js 15 App Router)
- **SSR:** Server Components para SEO e performance
- **Client Components:** Player de vídeo, Q&A, formulário NPS (interativos)
- **Server Actions:** Mutations (salvar progresso, Q&A, NPS, admin CRUD)
- **Middleware:** Auth guard + NPS gate

### Database (Supabase PostgreSQL)
- **RLS:** Row Level Security em todas as tabelas de dados de usuário
- **Triggers:** 
  - `handle_new_user` → cria profile ao registrar
  - `after_nps_insert` → seta nps_answered = true
  - `check_trail_completion` → emite certificado ao 100%
- **Storage:** Bucket `attachments` (PDFs, XLSX) + `covers` (imagens de trilha)

### Auth (Supabase Auth)
- **Magic Link:** Zero senha, e-mail como único identificador
- **Sessão:** JWT gerenciado pelo `@supabase/ssr`
- **Roles:** `student` (default) | `admin` (manual via SQL)

### E-mail (Resend)
- **Limite free:** 100 e-mails/dia (suficiente para V1)
- **Templates:** React Email components
- **Domínio:** SPF/DKIM configurado para não cair em spam

## Segurança

| Camada | Proteção |
|---|---|
| Rotas | Middleware Next.js verifica sessão JWT |
| Dados | RLS Supabase: usuário acessa apenas seus dados |
| Admin | `role = 'admin'` verificado no middleware |
| Workshop | `nps_answered` verificado antes de servir conteúdo |
| Storage | Buckets com policies (attachments: autenticado; covers: público) |
| Service Role Key | Apenas server-side, nunca exposta ao client |

## Performance

- YouTube embed: zero custo de storage para vídeos
- React-player: lazy load
- Server Components: mínimo JS no client
- Skeleton loading: UX percebida melhor
- Debounce 5s no save de progresso: evita flood de writes

## Diagrama de Fluxo — Autenticação

```
Admin adiciona e-mail
        ↓
Supabase Auth cria usuário
        ↓
Resend: e-mail boas-vindas + magic link
        ↓
Médico clica no link
        ↓
Supabase: valida token → sessão criada
        ↓
Trigger: cria profile (handle_new_user)
        ↓
Middleware: redireciona para home
```
