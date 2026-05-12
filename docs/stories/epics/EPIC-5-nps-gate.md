# EPIC-5: NPS Gate
**Status:** Ready  
**Semanas PRD:** 6  
**Objetivo:** Coletar NPS de forma orgânica usando o Workshop Reforma Tributária como recompensa.

## Contexto
O NPS gate é o mecanismo mais inteligente do produto: o médico QUER desbloquear o workshop,
e ao fazer isso fornece feedback valioso. É gamificação com valor estratégico real.

## Histórias

| ID | Título | Status | Prioridade |
|---|---|---|---|
| 5.1 | Formulário NPS (0–10 + comentário) + Trigger Supabase | Ready | P0 |
| 5.2 | Banner NPS Gate na Home + Middleware de Proteção do Workshop | Ready | P0 |
| 5.3 | Dashboard NPS no Admin (score, respostas, comentários) | Ready | P1 |

## Critérios de Saída do Epic
- [ ] Banner "Workshop Bloqueado" visível na home para médicos com nps_answered=false
- [ ] Preview de 30s do vídeo do workshop disponível antes do desbloqueio
- [ ] Formulário NPS (0–10 + comentário opcional) funcional
- [ ] Trigger Supabase: `nps_answered = true` imediatamente após submissão
- [ ] Conteúdo desbloqueado instantaneamente no mesmo request
- [ ] E-mail de confirmação enviado
- [ ] Middleware bloqueia acesso ao workshop para `nps_answered=false`
- [ ] Admin vê dashboard com score NPS + distribuição + comentários

## Dependências
- EPIC-1 (trigger Supabase + middleware)
- EPIC-3 (home com banner integrado)
- EPIC-4 (e-mail de workshop desbloqueado)

## Referência PRD
Seção M6 (NPS Gate), fluxo NPS Gate (seção 5)
