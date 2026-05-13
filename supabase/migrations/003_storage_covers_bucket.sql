-- Bucket público para imagens de capa das trilhas
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'covers',
  'covers',
  true,
  5242880, -- 5MB
  array['image/jpeg','image/png','image/webp','image/gif']
)
on conflict (id) do nothing;

-- Política: admin pode fazer upload
create policy "admin_upload_covers"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'covers'
  and exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Política: leitura pública
create policy "public_read_covers"
on storage.objects for select
using (bucket_id = 'covers');

-- Política: admin pode deletar
create policy "admin_delete_covers"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'covers'
  and exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);
