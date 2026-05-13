-- ============================================================
-- 001_initial_schema.sql
-- Carmem Cavalcante Academy — Schema inicial completo
-- ============================================================

-- ============================================================
-- PROFILES
-- ============================================================
create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text,
  email        text unique not null,
  crm          text,
  avatar_url   text,
  points       integer not null default 0,
  nps_answered boolean not null default false,
  role         text not null default 'student' check (role in ('student', 'admin')),
  created_at   timestamptz not null default now(),
  last_seen_at timestamptz
);

-- ============================================================
-- TRAILS (trilhas)
-- ============================================================
create table if not exists trails (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text,
  cover_image    text,
  estimated_min  integer not null default 0,
  order_index    integer not null default 0,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- MODULES
-- ============================================================
create table if not exists modules (
  id          uuid primary key default gen_random_uuid(),
  trail_id    uuid not null references trails(id) on delete cascade,
  title       text not null,
  order_index integer not null default 0
);

-- ============================================================
-- LESSONS
-- ============================================================
create table if not exists lessons (
  id             uuid primary key default gen_random_uuid(),
  module_id      uuid not null references modules(id) on delete cascade,
  title          text not null,
  description    text,
  video_url      text,
  duration_sec   integer not null default 0,
  is_locked      boolean not null default false,
  lock_condition text,
  order_index    integer not null default 0,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- LESSON ATTACHMENTS
-- ============================================================
create table if not exists lesson_attachments (
  id              uuid primary key default gen_random_uuid(),
  lesson_id       uuid not null references lessons(id) on delete cascade,
  file_name       text not null,
  file_url        text not null,
  file_type       text not null check (file_type in ('pdf', 'doc', 'xls', 'ppt', 'zip', 'other')),
  file_size_kb    integer not null default 0,
  download_count  integer not null default 0,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- ATTACHMENT DOWNLOADS
-- ============================================================
create table if not exists attachment_downloads (
  user_id         uuid not null references profiles(id) on delete cascade,
  attachment_id   uuid not null references lesson_attachments(id) on delete cascade,
  downloaded_at   timestamptz not null default now(),
  primary key (user_id, attachment_id)
);

-- ============================================================
-- LESSON PROGRESS
-- ============================================================
create table if not exists lesson_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references profiles(id) on delete cascade,
  lesson_id    uuid not null references lessons(id) on delete cascade,
  watched_pct  numeric(5,2) not null default 0 check (watched_pct >= 0 and watched_pct <= 100),
  completed    boolean not null default false,
  completed_at timestamptz,
  updated_at   timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- ============================================================
-- LESSON QUESTIONS (Q&A)
-- ============================================================
create table if not exists lesson_questions (
  id          uuid primary key default gen_random_uuid(),
  lesson_id   uuid not null references lessons(id) on delete cascade,
  user_id     uuid not null references profiles(id) on delete cascade,
  question    text not null,
  answer      text,
  answered_by uuid references profiles(id),
  answered_at timestamptz,
  is_public   boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- NPS RESPONSES
-- ============================================================
create table if not exists nps_responses (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  score      integer not null check (score >= 0 and score <= 10),
  comment    text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- BADGES
-- ============================================================
create table if not exists badges (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  icon_url    text,
  condition   text not null,
  created_at  timestamptz not null default now()
);

create table if not exists user_badges (
  user_id    uuid not null references profiles(id) on delete cascade,
  badge_id   uuid not null references badges(id) on delete cascade,
  earned_at  timestamptz not null default now(),
  primary key (user_id, badge_id)
);

-- ============================================================
-- CERTIFICATES
-- ============================================================
create table if not exists certificates (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references profiles(id) on delete cascade,
  trail_id     uuid not null references trails(id) on delete cascade,
  issued_at    timestamptz not null default now(),
  cert_url     text,
  unique (user_id, trail_id)
);

-- ============================================================
-- TRIGGER: after_nps_insert → set nps_answered = true
-- ============================================================
create or replace function set_nps_answered()
returns trigger
language plpgsql
security definer
as $$
begin
  update profiles
  set nps_answered = true
  where id = new.user_id;
  return new;
end;
$$;

drop trigger if exists after_nps_insert on nps_responses;
create trigger after_nps_insert
  after insert on nps_responses
  for each row
  execute function set_nps_answered();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles           enable row level security;
alter table lesson_progress    enable row level security;
alter table lesson_questions   enable row level security;
alter table nps_responses      enable row level security;
alter table attachment_downloads enable row level security;
alter table user_badges        enable row level security;
alter table certificates       enable row level security;

-- profiles: each user sees/edits only their own row
create policy own_profile_select on profiles
  for select using (auth.uid() = id);

create policy own_profile_update on profiles
  for update using (auth.uid() = id);

-- admin: full access to all profiles
create policy admin_profiles on profiles
  for all using (auth.jwt() ->> 'role' = 'admin');

-- lesson_progress: own rows only
create policy own_progress on lesson_progress
  for all using (auth.uid() = user_id);

-- lesson_questions: insert own, read public or own
create policy qa_insert on lesson_questions
  for insert with check (auth.uid() = user_id);

create policy qa_read on lesson_questions
  for select using (is_public = true or auth.uid() = user_id);

create policy admin_qa on lesson_questions
  for all using (auth.jwt() ->> 'role' = 'admin');

-- nps_responses: insert own, select own
create policy own_nps_insert on nps_responses
  for insert with check (auth.uid() = user_id);

create policy own_nps_select on nps_responses
  for select using (auth.uid() = user_id);

create policy admin_nps on nps_responses
  for all using (auth.jwt() ->> 'role' = 'admin');

-- attachment_downloads: own rows
create policy own_downloads on attachment_downloads
  for all using (auth.uid() = user_id);

-- user_badges: select own
create policy own_badges on user_badges
  for select using (auth.uid() = user_id);

-- certificates: select own
create policy own_certificates on certificates
  for select using (auth.uid() = user_id);
