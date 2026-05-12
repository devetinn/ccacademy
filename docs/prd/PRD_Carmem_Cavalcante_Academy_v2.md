# PRD — Carmem Cavalcante Academy
## Plataforma de Customer Education Exclusiva
**Versão:** 2.0 · **Data:** Maio 2026 · **Product Owner:** John Weverton  
**Stack:** Next.js 15 · Supabase · Vercel · Shadcn/UI · Tailwind · Resend  
**URL:** carmemcavalcanteacademy.com.br  
**Deploy:** GitHub → Vercel (CI/CD contínuo)

---

## NOTA DO CEO DO PROJETO

A CEO pediu um vídeo tutorial. Mas o vídeo é o menor dos problemas.

O problema real é que cada vez que um médico liga perguntando "o que é competência de pagamento?",
a empresa perde tempo, perde dinheiro e — pior — passa a impressão de que o serviço é complexo demais.

A Carmem Cavalcante Academy não é um repositório de vídeos. É a resposta estratégica para três
desafios simultâneos:
  1. Reduzir suporte reativo (custo operacional)
  2. Aumentar adoção e retenção do app (valor percebido)
  3. Coletar NPS de forma orgânica, sem fricção (inteligência de mercado)

Plataformas de customer education reduzem tickets de suporte em até 40% e aumentam
retenção quando o cliente entende o que está pagando. Aqui, o médico não paga pela Academy —
ele paga pelo serviço de contas médicas. A Academy é o que justifica continuar pagando.

---

## 1. VISÃO ESTRATÉGICA

### 1.1 Posicionamento
Não é um curso. Não é um canal do YouTube. Não é um PDF no WhatsApp.

É a plataforma de conhecimento oficial da Carmem Cavalcante — exclusiva para clientes,
com identidade premium, trilhas guiadas, materiais de apoio e recompensas por engajamento.

Nenhum concorrente de faturamento médico em Fortaleza tem isso. Isso é diferencial competitivo.

### 1.2 Objetivos de Negócio
- Reduzir em 40% os chamados de suporte relacionados ao app em 60 dias
- Coletar NPS de pelo menos 60% da base ativa em 90 dias
- Aumentar o tempo médio de sessão do app de contas médicas
- Criar percepção de valor premium no serviço (retenção e upsell)
- Usar o Workshop Reforma Tributária como ativo de recompensa (NPS gate)

### 1.3 Escopo
- Acesso exclusivo: somente médicos clientes do serviço de contas médicas
- Identidade visual 100% Carmem Cavalcante Contabilidade
- Domínio próprio: carmemcavalcanteacademy.com.br
- Custo de infraestrutura: R$ 0/mês + ~R$ 40/ano (domínio)

---

## 2. PERSONAS

### P1 — Dr. Médico Cliente (Usuário Final)
**Perfil:** Profissional de saúde, 30–55 anos, acessa no celular entre atendimentos.  
**Dor:** "Não entendo meu relatório. Sempre preciso ligar pro escritório."  
**Medo:** Estar perdendo dinheiro por não entender o sistema.  
**Desejo:** Autonomia — entender sozinho, sem depender de ninguém.  
**Job-to-be-done:** Saber exatamente o que recebeu, o que foi glosado e o que pode contestar.  
**Comportamento digital:** Mobile-first, baixa tolerância a fricção, prefere vídeo a texto.

### P2 — Equipe Carmem Cavalcante (Administradora)
**Perfil:** Analistas e gestores do escritório.  
**Dor:** Responder as mesmas perguntas repetidas dezenas de vezes por mês.  
**Desejo:** Publicar conteúdo fácil, ver métricas e colher NPS sem esforço manual.  
**Job-to-be-done:** Gerenciar a plataforma sem depender de dev para cada atualização.

---

## 3. BENCHMARKING ESTRATÉGICO

| Dimensão | Hotmart | Kajabi | Teachable | Notion | CC Academy |
|---|---|---|---|---|---|
| Player nativo | ✅ | ✅ | ✅ | ❌ | ✅ |
| Progresso por aula | ✅ | ✅ | ✅ | ❌ | ✅ |
| Materiais de apoio | ✅ | ✅ | ✅ | ✅ | ✅ |
| Q&A por aula | ✅ | ✅ | ✅ | ❌ | ✅ |
| Conteúdo com gate | ✅ | ✅ | ✅ | ❌ | ✅ NPS gate |
| NPS nativo | ❌ | ❌ | ❌ | ❌ | ✅ |
| Badges/gamificação | ❌ | ❌ | ❌ | ❌ | ✅ |
| Acesso exclusivo por cliente | Limitado | ✅ | ✅ | ❌ | ✅ |
| White-label total | ❌ | Pago | Pago | ❌ | ✅ |
| Mobile-first | Parcial | Parcial | Parcial | ❌ | ✅ |
| CMS sem código | Limitado | ✅ | ✅ | ✅ | ✅ |
| Custo mensal | R$97+ | $149+ | $39+ | $16+ | R$ 0 |

---

## 4. ARQUITETURA DE FEATURES (MoSCoW)

---

### 🔴 MUST HAVE — V1 (Semanas 1–7)

#### M1 — Acesso Exclusivo por Convite
- Acesso restrito: somente médicos adicionados manualmente pela equipe Carmem no admin
- Login via **magic link** (e-mail, sem senha) — menor fricção possível para o médico
- Ao ser adicionado, médico recebe e-mail de boas-vindas automático com link de acesso
- Supabase Auth gerencia sessão, tokens e refresh
- Middleware Next.js protege todas as rotas de `/academy/*` e `/admin/*`
- Perfil criado automaticamente no primeiro acesso (nome, e-mail, CRM opcional)

#### M2 — Trilhas de Aprendizado (Estrutura Core)
Hierarquia: **Trilha → Módulo → Aula**

Trilhas previstas para V1:
1. **"Primeiros Passos no App"** — como navegar, acessar relatórios, interpretar os dados
2. **"Entendendo Seu Faturamento"** — competência de pagamento, protocolo, ciclo de 60 dias
3. **"Glosas e Recursos"** — o que é uma glosa, como identificar e como contestar

Cada trilha tem:
- Cover image + descrição curta
- Barra de progresso (% de aulas concluídas)
- Estimativa de tempo total
- Certificado digital automático ao 100%

#### M3 — Player de Vídeo com Progresso
- Embed via react-player (YouTube não-listado) ou Supabase Storage para vídeos pequenos
- Capítulos/marcadores dentro do vídeo com timestamps clicáveis
- Controle de velocidade: 0.75x / 1x / 1.25x / 1.5x
- Progresso salvo por aula: assistiu X% → marcado como "em andamento"
- 80% assistido = marcado como "concluído" automaticamente
- Retomar de onde parou no próximo acesso

#### M4 — Materiais de Apoio por Aula
- Upload via CMS Admin de: PDF, XLSX, DOCX, imagem, link externo
- Armazenamento no Supabase Storage
- Preview de PDF in-browser (react-pdf) sem sair da plataforma
- Download rastreado: log de user_id + lesson_id + timestamp + file_name
- Exibição como lista de cards abaixo do player, com ícone por tipo de arquivo

#### M5 — Q&A por Aula (Tira-Dúvidas Assíncrono)
- Campo de pergunta em texto livre em cada aula
- Admin responde via painel (com editor de texto simples)
- Notificação por e-mail ao médico quando a resposta for publicada
- Perguntas e respostas ficam públicas para todos os médicos da base
  → Efeito FAQ orgânico: a 11ª vez que alguém pergunta, a resposta já está lá
- Opção de marcar pergunta como "não pública" (para questões sensíveis)

#### M6 — NPS Gate — Workshop Reforma Tributária
- Seção visível na home como "Conteúdo Exclusivo — Desbloqueie Agora"
- Exibe: título do workshop, descrição, instrutor, duração e preview de 30 segundos do vídeo
- Botão: "Responder pesquisa rápida e desbloquear acesso completo"
- Formulário NPS: escala 0–10 + campo de comentário qualitativo (opcional)
- Submissão → trigger no Supabase seta `nps_answered = true` no perfil
- Conteúdo desbloqueado instantaneamente + e-mail de confirmação enviado
- Lógica de gate em middleware: verifica campo `nps_answered` antes de servir o conteúdo

#### M7 — CMS Admin (Backoffice da Equipe Carmem)
Rota protegida: `/admin` — acesso apenas para e-mails com `role = 'admin'` no Supabase

Funcionalidades:
- **Trilhas:** Criar, editar, reordenar, ativar/desativar
- **Módulos e Aulas:** CRUD completo com drag-and-drop para reordenar
- **Vídeos:** Input de URL do YouTube ou upload de arquivo
- **Materiais:** Upload de arquivos por aula, com gestão de arquivos
- **Usuários:** Adicionar médico (nome + e-mail), remover acesso, ver progresso individual
- **Q&A:** Ver todas as perguntas abertas, responder, publicar/ocultar
- **NPS:** Ver respostas, score geral, comentários — dashboard simples
- **Métricas:** Aulas mais assistidas, taxas de conclusão, usuários ativos últimos 7/30 dias

#### M8 — E-mails Transacionais (Resend)
- **Boas-vindas:** Enviado quando admin adiciona novo médico.
  Conteúdo: nome, link de acesso, trilha recomendada para começar
- **Dúvida respondida:** "Sua pergunta foi respondida pela equipe Carmem"
- **Workshop desbloqueado:** "Seu acesso ao Workshop de Reforma Tributária foi liberado!"
- Templates com identidade visual da Carmem Cavalcante (logo, cores, assinatura)

---

### 🟡 SHOULD HAVE — V1.5 (30–60 dias pós-lançamento)

#### S1 — Gamificação com Badges
Sistema de pontos e conquistas para criar hábito de retorno:

Pontos por ação:
- Primeiro acesso: +20 pts
- Assistir aula completa: +10 pts
- Baixar material: +5 pts
- Fazer pergunta no Q&A: +15 pts
- Concluir trilha: +50 pts
- Responder NPS: +30 pts

Badges:
- 🏁 "Bem-vindo(a) à Academy" — primeiro login
- 📱 "Expert no App" — trilha "Primeiros Passos" concluída
- 💰 "Mestre do Faturamento" — trilha "Faturamento" concluída
- 🛡️ "Defensor dos seus Direitos" — trilha "Glosas e Recursos" concluída
- ❓ "Curioso(a)" — primeira pergunta no Q&A
- 🤝 "Parceiro(a) Carmem" — NPS respondido
- 🏆 "Aluno Completo" — todas as trilhas V1 concluídas

Exibição: barra de nível + badges conquistados no perfil do médico

#### S2 — Notificações de Engajamento (E-mails Automáticos)
- **Inatividade 7 dias:** "Continue de onde parou — sua trilha está esperando"
- **Nova aula publicada:** "Novo conteúdo disponível na sua Academy"
- **Progresso semanal:** "Você está a X aulas de completar [trilha]"
- Todos configuráveis no admin (ativar/desativar por tipo)

#### S3 — Busca Global
- Campo de busca acessível via header
- Busca em: títulos de trilhas, módulos, aulas, materiais e Q&A
- Resultado com snippet e link direto para o item
- Implementação: busca full-text nativa do PostgreSQL (Supabase)

#### S4 — Perfil do Médico
- Foto de perfil (upload ou inicial do nome)
- Progresso consolidado (% de conclusão por trilha)
- Badges conquistados
- Histórico de atividade (últimas aulas assistidas)
- Pontuação total

---

### 🟢 COULD HAVE — V2 (90+ dias)

#### C1 — Integração com App de Contas Médicas
- Notificação dentro do app: "Tem uma aula sobre isso na Academy"
- Deep link contextual: médico consulta relatório de competência
  → banner sugere a aula "Entendendo Competência de Pagamento"
- SSO: mesmo login do app acessa automaticamente a Academy

#### C2 — Legendas Automáticas
- Geração via OpenAI Whisper API (~R$0,03/minuto)
- Acessibilidade + pesquisa interna de conteúdo por transcrição

#### C3 — PWA (Modo Offline)
- Service Worker com cache de aulas já assistidas
- Médico assiste sem internet (consultório com sinal ruim)

#### C4 — Multi-tenant (Expansão)
- A Academy se torna um produto white-label
- Outros escritórios de faturamento médico licenciam a plataforma
- Modelo SaaS B2B — nova vertical de receita para a Carmem Cavalcante

#### C5 — IA de Perguntas
- Chatbot treinado com o conteúdo da Academy
- Responde dúvidas instantaneamente antes de criar ticket humano
- Implementação: RAG com pgvector (Supabase) + OpenAI GPT-4o

---

## 5. FLUXO DE USUÁRIO COMPLETO

```
──── ONBOARDING ────────────────────────────────────────────────────
Admin adiciona e-mail do médico no painel
  → Supabase cria usuário com role 'student'
  → Resend dispara e-mail de boas-vindas com magic link
  → Médico clica no link → autenticado automaticamente
  → Perfil criado → Redirecionado para home da Academy
  → Trilha "Primeiros Passos no App" sugerida em destaque

──── USO RECORRENTE ─────────────────────────────────────────────────
Home (trilhas disponíveis + progresso)
  → Clica em trilha → Vê módulos e aulas
  → Abre aula → Assiste vídeo (progresso salvo em tempo real)
  → Baixa material de apoio (PDF/planilha)
  → Faz pergunta no Q&A (se tiver dúvida)
  → Conclui aula → Badge/pontos desbloqueados se aplicável
  → Conclui trilha → Certificado gerado + e-mail enviado

──── NPS GATE ──────────────────────────────────────────────────────
Home → Banner "Workshop Bloqueado — Desbloqueie Agora"
  → Médico clica em "Quero desbloquear"
  → Abre formulário NPS (0–10 + comentário opcional)
  → Submete resposta
  → Supabase trigger: nps_answered = true → acesso liberado
  → E-mail: "Seu acesso ao Workshop foi liberado!"
  → Médico acessa o workshop completo
```

---

## 6. SCHEMA COMPLETO DO BANCO (Supabase / PostgreSQL)

```sql
-- ══════════════════════════════════════════
-- PERFIS DE USUÁRIO
-- ══════════════════════════════════════════
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  crm           TEXT,
  avatar_url    TEXT,
  points        INTEGER DEFAULT 0,
  nps_answered  BOOLEAN DEFAULT FALSE,
  role          TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at  TIMESTAMPTZ
);

-- ══════════════════════════════════════════
-- TRILHAS, MÓDULOS E AULAS
-- ══════════════════════════════════════════
CREATE TABLE trails (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  cover_image   TEXT,
  estimated_min INTEGER,         -- duração estimada em minutos
  order_index   INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE modules (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_id      UUID NOT NULL REFERENCES trails(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  order_index   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE lessons (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id      UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  description    TEXT,
  video_url      TEXT,
  duration_sec   INTEGER,
  is_locked      BOOLEAN DEFAULT FALSE,
  lock_condition TEXT CHECK (lock_condition IN ('nps', NULL)),
  order_index    INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════
-- MATERIAIS DE APOIO
-- ══════════════════════════════════════════
CREATE TABLE lesson_attachments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id     UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  file_name     TEXT NOT NULL,
  file_url      TEXT NOT NULL,
  file_type     TEXT CHECK (file_type IN ('pdf','xlsx','docx','image','link')),
  file_size_kb  INTEGER,
  download_count INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Log de downloads rastreados
CREATE TABLE attachment_downloads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES profiles(id),
  attachment_id UUID REFERENCES lesson_attachments(id),
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════
-- PROGRESSO POR AULA
-- ══════════════════════════════════════════
CREATE TABLE lesson_progress (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id     UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  watched_pct   INTEGER DEFAULT 0 CHECK (watched_pct BETWEEN 0 AND 100),
  completed     BOOLEAN DEFAULT FALSE,
  completed_at  TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

-- ══════════════════════════════════════════
-- Q&A POR AULA
-- ══════════════════════════════════════════
CREATE TABLE lesson_questions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id     UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES profiles(id),
  question      TEXT NOT NULL,
  answer        TEXT,
  answered_by   UUID REFERENCES profiles(id),
  answered_at   TIMESTAMPTZ,
  is_public     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════
-- NPS
-- ══════════════════════════════════════════
CREATE TABLE nps_responses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES profiles(id),
  score         INTEGER NOT NULL CHECK (score BETWEEN 0 AND 10),
  comment       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: ao inserir nps_response → atualiza profiles.nps_answered = true
CREATE OR REPLACE FUNCTION set_nps_answered()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET nps_answered = TRUE WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_nps_insert
AFTER INSERT ON nps_responses
FOR EACH ROW EXECUTE FUNCTION set_nps_answered();

-- ══════════════════════════════════════════
-- GAMIFICAÇÃO
-- ══════════════════════════════════════════
CREATE TABLE badges (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  description     TEXT,
  icon_emoji      TEXT,
  condition_type  TEXT NOT NULL,
  condition_value TEXT,
  points_reward   INTEGER DEFAULT 0
);

CREATE TABLE user_badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id    UUID NOT NULL REFERENCES badges(id),
  earned_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- ══════════════════════════════════════════
-- CERTIFICADOS
-- ══════════════════════════════════════════
CREATE TABLE certificates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id),
  trail_id    UUID NOT NULL REFERENCES trails(id),
  issued_at   TIMESTAMPTZ DEFAULT NOW(),
  cert_url    TEXT,
  UNIQUE(user_id, trail_id)
);

-- ══════════════════════════════════════════
-- RLS (Row Level Security)
-- ══════════════════════════════════════════
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nps_responses ENABLE ROW LEVEL SECURITY;

-- Médico vê apenas seus próprios dados
CREATE POLICY "own_profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "own_progress" ON lesson_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "own_nps" ON nps_responses
  FOR ALL USING (auth.uid() = user_id);

-- Q&A: médico vê as próprias + as públicas
CREATE POLICY "qa_read" ON lesson_questions
  FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "qa_insert" ON lesson_questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## 7. ARQUITETURA DO PROJETO (Next.js 15)

```
carmem-cavalcante-academy/
├── app/
│   ├── (auth)/
│   │   └── login/               → magic link login page
│   ├── (academy)/
│   │   ├── page.tsx             → home: trilhas + progresso + NPS gate banner
│   │   ├── trilha/[id]/
│   │   │   └── page.tsx         → módulos + aulas da trilha
│   │   ├── aula/[id]/
│   │   │   └── page.tsx         → player + materiais + Q&A
│   │   ├── perfil/
│   │   │   └── page.tsx         → progresso, badges, pontos, histórico
│   │   └── certificado/[id]/
│   │       └── page.tsx         → certificado digital gerado
│   └── (admin)/
│       ├── dashboard/           → métricas gerais
│       ├── trilhas/             → CRUD trilhas/módulos/aulas
│       ├── usuarios/            → gerenciar médicos
│       ├── perguntas/           → responder Q&A
│       └── nps/                 → dashboard NPS
├── components/
│   ├── academy/
│   │   ├── VideoPlayer.tsx      → react-player + progresso
│   │   ├── TrailCard.tsx        → card de trilha com progresso
│   │   ├── LessonList.tsx       → lista de aulas com status
│   │   ├── AttachmentList.tsx   → materiais de apoio + download
│   │   ├── QASection.tsx        → perguntas + respostas
│   │   ├── BadgeCard.tsx        → badge com animação de desbloqueio
│   │   ├── NPSGateBanner.tsx    → banner do workshop bloqueado
│   │   ├── NPSForm.tsx          → formulário NPS (0–10 + comentário)
│   │   └── ProgressBar.tsx      → barra de progresso de trilha
│   └── admin/
│       ├── LessonEditor.tsx     → editor de aula (título, vídeo, materiais)
│       ├── UserTable.tsx        → tabela de médicos + ações
│       └── QAPanel.tsx          → painel de respostas Q&A
├── lib/
│   ├── supabase/
│   │   ├── client.ts            → createBrowserClient
│   │   ├── server.ts            → createServerClient
│   │   └── middleware.ts        → updateSession + proteção de rotas
│   ├── resend.ts                → cliente de e-mail
│   └── utils.ts                 → helpers gerais
├── middleware.ts                 → proteção global de rotas
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

---

## 8. TECH STACK DETALHADO

| Camada | Tecnologia | Justificativa | Custo |
|---|---|---|---|
| Framework | Next.js 15 App Router | SSR nativo, performance, já conhecido | Grátis |
| UI | Shadcn/UI + Tailwind CSS | Componentes prontos, customizáveis, sem overhead | Grátis |
| Banco | Supabase PostgreSQL | Já usado no app principal, RLS nativo | Grátis (500MB) |
| Auth | Supabase Auth magic link | Zero fricção, sem senha, seguro | Grátis |
| Storage | Supabase Storage | PDFs e vídeos pequenos centralizados | Grátis (1GB) |
| Vídeo | YouTube não-listado + react-player | Sem custo de storage para vídeos longos | Grátis |
| PDF viewer | react-pdf | Preview in-browser sem sair da plataforma | Grátis |
| E-mail | Resend | 100 e-mails/dia grátis, templates HTML | Grátis |
| Deploy | Vercel | CI/CD automático do GitHub, já usado | Grátis |
| Domínio | carmemcavalcanteacademy.com.br | Identidade própria | ~R$40/ano |

**CUSTO TOTAL: ~R$ 40/ano**

---

## 9. IDENTIDADE VISUAL

- **Logo:** Carmem Cavalcante Contabilidade (existente)
- **Cores:** Azul institucional da Carmem como cor primária, branco e cinza claro
- **Tipografia:** Seguir tipografia dos materiais institucionais da empresa
- **Tom de voz:** Profissional, acolhedor, direto — como se o escritório estivesse explicando pessoalmente
- **Mobile-first:** Layout otimizado para 375px+ (iPhone SE como base)
- **Componentes:** Shadcn/UI com tokens customizados para a paleta da Carmem
- **Microanimações:** Framer Motion para desbloqueio de badges e transições de progresso

---

## 10. MÉTRICAS DE SUCESSO

| KPI | Meta | Prazo | Como medir |
|---|---|---|---|
| Conclusão da trilha inicial | > 60% dos usuários | 30 dias | lesson_progress |
| NPS coletado | > 60% dos usuários ativos | 90 dias | nps_responses |
| Redução de chamados suporte | -40% | 60 dias | Comparativo mensal |
| Workshop desbloqueado | > 50% dos usuários | 90 dias | profiles.nps_answered |
| Tempo médio de sessão | > 8 minutos | 30 dias | Vercel Analytics |
| Usuários ativos semanais | > 70% da base | 60 dias | profiles.last_seen_at |

---

## 11. ROADMAP DE ENTREGA

| Semana | Sprint | Entregas |
|---|---|---|
| 1 | Foundation | Setup Next.js · Schema migrations · Auth magic link · Middleware rotas · Layout base identidade CC |
| 2 | Foundation | CMS Admin: CRUD trilhas/módulos/aulas · Gestão de usuários |
| 3 | Core Learning | Player de vídeo + progresso salvo · Listagem de trilhas na home · Barra de progresso |
| 4 | Core Learning | Upload e preview de materiais de apoio · Download rastreado |
| 5 | Engagement | Q&A por aula (perguntar + responder) · E-mails transacionais (Resend) |
| 6 | NPS Gate | Formulário NPS · Lógica de gate do workshop · Desbloqueio automático via trigger · Banner na home |
| 7 | Launch | QA em dispositivos móveis reais · Seed das primeiras trilhas · DNS + domínio · Deploy produção |
| 8+ | V1.5 | Gamificação (badges + pontos) · Notificações de inatividade · Busca global |

---

## 12. PROMPT COMPLETO PARA O CLAUDE CODE

Cole exatamente no Claude Code para iniciar:

---

Construa a Carmem Cavalcante Academy — plataforma exclusiva de Customer Education
para médicos clientes da Carmem Cavalcante Contabilidade.

STACK OBRIGATÓRIA:
- Next.js 15 (App Router, TypeScript)
- Supabase (Auth magic link, PostgreSQL, Storage, RLS)
- Shadcn/UI + Tailwind CSS
- Resend (e-mails transacionais)
- Vercel (deploy)
- react-player (player de vídeo)
- react-pdf (preview de PDF)

IDENTIDADE VISUAL:
- Seguir identidade da Carmem Cavalcante Contabilidade
- Azul institucional como cor primária, branco, cinza claro
- Mobile-first (375px como base)
- Tipografia profissional e acolhedora

ESTRUTURA DE PASTAS:
app/(auth)/login → magic link
app/(academy)/page → home com trilhas
app/(academy)/trilha/[id] → módulos + aulas
app/(academy)/aula/[id] → player + materiais + Q&A
app/(academy)/perfil → progresso e badges
app/(admin)/dashboard → métricas
app/(admin)/trilhas → CRUD conteúdo
app/(admin)/usuarios → gestão de médicos
app/(admin)/perguntas → responder Q&A

BANCO DE DADOS:
Execute as migrations conforme o schema do PRD (profiles, trails, modules, lessons,
lesson_attachments, attachment_downloads, lesson_progress, lesson_questions,
nps_responses, badges, user_badges, certificates) com RLS ativado.

ORDEM DE IMPLEMENTAÇÃO:
1. Migrations do banco + RLS
2. Autenticação magic link + middleware proteção de rotas (admin vs student)
3. Home da Academy: listagem de trilhas com progresso
4. Página da trilha: módulos + lista de aulas
5. Página da aula: player com progresso salvo + materiais de apoio + Q&A
6. CMS Admin: CRUD trilhas/módulos/aulas + gestão de usuários + responder Q&A
7. NPS Gate: banner na home + formulário + trigger de desbloqueio automático
8. E-mails transacionais via Resend (boas-vindas, Q&A respondido, workshop desbloqueado)

---

*PRD v2.0 — Carmem Cavalcante Academy — Maio 2026*
