# EPIC-3: Core Learning
**Status:** Ready  
**Semanas PRD:** 3–4  
**Objetivo:** Experiência completa de aprendizado — trilhas, player de vídeo, materiais de apoio.

## Contexto
O core do produto. O médico precisa assistir vídeos, acompanhar progresso e baixar materiais.
A experiência precisa ser mobile-first e de baixa fricção.

## Histórias

| ID | Título | Status | Prioridade |
|---|---|---|---|
| 3.1 | Home da Academy (listagem de trilhas + progresso + NPS banner) | Ready | P0 |
| 3.2 | Página de Trilha (módulos + lista de aulas com status) | Ready | P0 |
| 3.3 | Player de Vídeo + Progresso Salvo (react-player) | Ready | P0 |
| 3.4 | Materiais de Apoio + Preview PDF + Download Rastreado | Ready | P0 |
| 3.5 | Certificado Digital Automático ao 100% da Trilha | Ready | P1 |

## Critérios de Saída do Epic
- [ ] Home exibe trilhas com barra de progresso real
- [ ] Player salva posição e retoma de onde parou
- [ ] 80% assistido = aula marcada como concluída automaticamente
- [ ] Velocidades: 0.75x, 1x, 1.25x, 1.5x funcionando
- [ ] PDF abre em preview in-browser (sem sair da plataforma)
- [ ] Download rastreado em `attachment_downloads`
- [ ] Certificado gerado ao concluir 100% de uma trilha

## Dependências
- EPIC-1 completo
- EPIC-2 (conteúdo seed mínimo: 1 trilha com 1 módulo e 2 aulas)

## Referência PRD
Seções M2, M3, M4, fluxo de uso recorrente (seção 5)
