# EPIC-1: Foundation
**Status:** Ready  
**Semanas PRD:** 1–2  
**Objetivo:** Estabelecer toda a infraestrutura base do projeto — setup, banco de dados, autenticação e layout.

## Contexto
Sem esta fundação nada funciona. É o pré-requisito para todos os outros épicos.
O PRD define stack obrigatória (Next.js 15, Supabase, Shadcn/UI, Tailwind) e o schema completo do banco.

## Histórias

| ID | Título | Status | Prioridade |
|---|---|---|---|
| 1.1 | Setup do Projeto (Next.js 15 + Supabase + Shadcn) | Ready | P0 |
| 1.2 | Schema do Banco de Dados + Migrations + RLS | Ready | P0 |
| 1.3 | Autenticação Magic Link + Middleware de Rotas | Ready | P0 |
| 1.4 | Layout Base + Identidade Visual (Academy) | Ready | P0 |
| 1.5 | Layout Base Admin + Navegação | Ready | P1 |

## Critérios de Saída do Epic
- [ ] Projeto Next.js 15 rodando em Vercel
- [ ] Todas as migrations aplicadas no Supabase com RLS ativo
- [ ] Magic link funcionando end-to-end
- [ ] Middleware protegendo `/academy/*` e `/admin/*`
- [ ] Layout mobile-first com identidade Carmem Cavalcante

## Dependências
- Conta Supabase ativa
- Repositório GitHub criado
- Projeto Vercel conectado ao repositório
- Conta Resend criada (para e-mails)

## Referência PRD
Seções: M1 (Acesso), 7 (Arquitetura), 8 (Tech Stack), 9 (Identidade Visual), 6 (Schema)
