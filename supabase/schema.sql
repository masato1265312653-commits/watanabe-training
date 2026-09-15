create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  inquiry_type text not null check (inquiry_type in ('reservation', 'general')),
  service_slug text,
  preferred_date date,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'done'))
);

-- If the table already existed before this column was added, run this too:
-- alter table inquiries add column if not exists preferred_date date;

alter table inquiries enable row level security;

create policy "Allow public inserts"
  on inquiries for insert
  to anon
  with check (true);

create table if not exists admin_credentials (
  id int primary key default 1,
  username text not null,
  password_hash text not null,
  created_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

alter table admin_credentials enable row level security;
-- No policies added on purpose: only the service_role key (used server-side
-- in the admin panel) can read or write this table. The public anon key has
-- zero access to it.

create table if not exists admin_auth_attempts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  action text not null check (action in ('login', 'setup')),
  identifier text not null,
  success boolean not null
);

alter table admin_auth_attempts enable row level security;
-- No policies here either: only service_role (server-side) can read/write.
-- Used to lock out repeated failed login/setup attempts.

create index if not exists admin_auth_attempts_lookup
  on admin_auth_attempts (action, identifier, created_at);

create table if not exists closed_dates (
  date date primary key,
  reason text,
  created_at timestamptz not null default now()
);

alter table closed_dates enable row level security;
-- No policies: only service_role (server-side, in contact/page.tsx and the
-- admin panel) can read/write. The public site reads this list on the server
-- and passes only the plain date strings down to the contact form.
