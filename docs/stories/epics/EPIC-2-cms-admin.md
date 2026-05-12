# EPIC-2: CMS Admin
**Status:** Ready  
**Semanas PRD:** 2  
**Objetivo:** Backoffice completo para a equipe Carmem gerenciar conteúdo e usuários sem depender de dev.

## Contexto
O médico não pode acessar conteúdo que não existe. O CMS é prerequisito para todo o fluxo de aprendizado.
A equipe Carmem precisa publicar trilhas, módulos e aulas de forma autônoma.

## Histórias

| ID | Título | Status | Prioridade |
|---|---|---|---|
| 2.1 | CRUD Trilhas + Módulos + Aulas (com drag-and-drop) | Ready | P0 |
| 2.2 | Gestão de Usuários (adicionar/remover médicos + invite) | Ready | P0 |
| 2.3 | Dashboard de Métricas (aulas, conclusão, ativos) | Ready | P1 |

## Critérios de Saída do Epic
- [ ] Admin pode criar trilha → módulo → aula em fluxo único
- [ ] Admin pode reordenar aulas via drag-and-drop
- [ ] Admin pode adicionar médico e trigger dispara e-mail de boas-vindas
- [ ] Admin pode ver progresso individual de cada médico
- [ ] Dashboard exibe métricas: aulas mais assistidas, conclusão, ativos 7/30 dias

## Dependências
- EPIC-1 completo (schema + auth + layout admin)

## Referência PRD
Seção M7 (CMS Admin), M8 (E-mails boas-vindas)
