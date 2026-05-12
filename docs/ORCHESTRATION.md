# Orquestração — Carmem Cavalcante Academy
**Criado por:** Orion (AIOS Master Orchestrator)  
**Data:** 2026-05-10  
**PRD:** `docs/prd/PRD_Carmem_Cavalcante_Academy_v2.md`

---

## Status dos Épicos

| Epic | Título | Stories | Status | Semanas |
|---|---|---|---|---|
| E1 | Foundation | 1.1, 1.2, 1.3, 1.4, 1.5 | **Próximo** | 1–2 |
| E2 | CMS Admin | 2.1, 2.2, 2.3 | Aguardando E1 | 2 |
| E3 | Core Learning | 3.1, 3.2, 3.3, 3.4, 3.5 | Aguardando E2 | 3–4 |
| E4 | Engagement | 4.1, 4.2 | Aguardando E3 | 5 |
| E5 | NPS Gate | 5.1, 5.2, 5.3 | Aguardando E4 | 6 |
| E6 | Launch | 6.1, 6.2, 6.3 | Aguardando E5 | 7 |

---

## Mapa de Stories

| Story | Título | Status | Agente | Depende de |
|---|---|---|---|---|
| 1.1 | Setup do Projeto | Ready | @dev | — |
| 1.2 | Schema + Migrations + RLS | Ready | @data-engineer | 1.1 |
| 1.3 | Auth Magic Link + Middleware | Ready | @dev | 1.1, 1.2 |
| 1.4 | Layout Academy + ID Visual | Ready | @dev | 1.1, 1.3 |
| 1.5 | Layout Admin + Navegação | Ready | @dev | 1.1, 1.3 |
| 2.1 | CRUD Trilhas/Módulos/Aulas | Ready | @dev | 1.2, 1.5 |
| 2.2 | Gestão Usuários + Convite | Ready | @dev | 1.2, 1.3 |
| 2.3 | Dashboard Métricas Admin | Ready | @dev | 1.2, 2.2 |
| 3.1 | Home Academy | Ready | @dev | 1.3, 1.4, 1.2 |
| 3.2 | Página de Trilha | Ready | @dev | 1.2, 3.1 |
| 3.3 | Player de Vídeo + Progresso | Ready | @dev | 1.2, 3.2 |
| 3.4 | Materiais de Apoio + PDF | Ready | @dev | 1.2, 3.3 |
| 3.5 | Certificado Digital | Ready | @dev | 1.2, 3.3 |
| 4.1 | Q&A por Aula | Ready | @dev | 1.2, 3.3 |
| 4.2 | E-mails Transacionais | Ready | @dev | 1.1 |
| 5.1 | Formulário NPS + Trigger | Ready | @dev | 1.2, 4.2 |
| 5.2 | Banner NPS Gate + Middleware | Ready | @dev | 3.1, 5.1 |
| 5.3 | Dashboard NPS Admin | Ready | @dev | 5.1 |
| 6.1 | QA Mobile | Ready | @qa | E1-E5 |
| 6.2 | Seed Trilhas V1 | Ready | @dev | 6.1 |
| 6.3 | DNS + Deploy Produção | Ready | @devops | 6.1, 6.2 |

---

## Sequência de Agentes

```
1. @dev → Story 1.1 (Setup do Projeto)
2. @data-engineer → Story 1.2 (Schema + RLS)
3. @dev → Stories 1.3, 1.4, 1.5 (em paralelo)
4. @dev → Stories 2.1, 2.2 (em paralelo)
5. @dev → Story 2.3
6. @dev → Stories 3.1, 4.2 (em paralelo — independentes)
7. @dev → Story 3.2
8. @dev → Story 3.3
9. @dev → Stories 3.4, 3.5 (em paralelo)
10. @dev → Story 4.1
11. @dev → Story 5.1
12. @dev → Stories 5.2, 5.3 (em paralelo)
13. @qa → Story 6.1 (QA Mobile)
14. @dev → Story 6.2 (Seed)
15. @devops → Story 6.3 (Deploy)
```

---

## Pré-requisitos Externos (Humanos)

Antes de iniciar o desenvolvimento, a equipe Carmem precisa:

- [ ] Criar projeto no Supabase e obter as chaves de API
- [ ] Criar conta no Resend e obter API key
- [ ] Criar repositório GitHub
- [ ] Criar projeto no Vercel e conectar ao GitHub
- [ ] Registrar domínio `carmemcavalcanteacademy.com.br` (se ainda não feito)
- [ ] Confirmar cor exata do azul institucional (hex)
- [ ] Gravar vídeos das 3 trilhas iniciais (para o seed)

---

## Próximo Passo

**Ativar @dev → Story 1.1 — Setup do Projeto**

Use: `@dev` e peça para implementar a `docs/stories/1.1.story.md`
