-- Bite & Brew — Supabase schema
-- Run in Supabase Dashboard → SQL Editor. Safe to run once on a fresh project.

create extension if not exists "pgcrypto";

-- ============ MENU ============
create table if not exists menu_categories (
  id text primary key,
  name text not null,
  blurb text,
  photo text,
  icon text,
  sort_order int not null default 0
);

create table if not exists menu_items (
  id text primary key,
  category_id text not null references menu_categories(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  is_veg boolean not null default true,
  is_bestseller boolean not null default false,
  available boolean not null default true,
  image_url text,
  photo text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============ CUSTOMERS & ORDERS ============
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  customer_name text not null,
  phone text not null,
  address text not null,
  notes text,
  payment_method text not null check (payment_method in ('cod', 'online')),
  subtotal numeric(10,2) not null,
  delivery_fee numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  menu_item_id text,
  name text not null,
  unit_price numeric(10,2) not null,
  quantity int not null check (quantity > 0)
);

-- ============ RESERVATIONS, MESSAGES, NEWSLETTER ============
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  email text not null,
  reservation_date date not null,
  reservation_time time not null,
  guests int not null check (guests between 1 and 50),
  special_requests text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists orders_status_idx on orders(status, created_at desc);
create index if not exists reservations_date_idx on reservations(reservation_date, reservation_time);

-- ============ ROW LEVEL SECURITY ============
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table reservations enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public website (anon key): read the menu, and INSERT-only for customer submissions.
create policy "public read categories" on menu_categories for select to anon, authenticated using (true);
create policy "public read menu" on menu_items for select to anon, authenticated using (available = true);

create policy "public create orders" on orders for insert to anon, authenticated with check (status = 'pending');
create policy "public create order items" on order_items for insert to anon, authenticated with check (true);
create policy "public create reservations" on reservations for insert to anon, authenticated with check (status = 'pending');
create policy "public create messages" on contact_messages for insert to anon, authenticated with check (true);
create policy "public subscribe" on newsletter_subscribers for insert to anon, authenticated with check (true);

-- Staff (signed-in users, i.e. your future admin dashboard): full access.
-- IMPORTANT: before building the admin dashboard, restrict these to specific staff
-- accounts (e.g. a `staff` table or an `app_metadata.role = 'admin'` claim), because
-- "authenticated" includes any user who can sign up on your project.
create policy "staff manage categories" on menu_categories for all to authenticated using (true) with check (true);
create policy "staff manage menu" on menu_items for all to authenticated using (true) with check (true);
create policy "staff read customers" on customers for all to authenticated using (true) with check (true);
create policy "staff read orders" on orders for select to authenticated using (true);
create policy "staff update orders" on orders for update to authenticated using (true) with check (true);
create policy "staff read order items" on order_items for select to authenticated using (true);
create policy "staff read reservations" on reservations for select to authenticated using (true);
create policy "staff update reservations" on reservations for update to authenticated using (true) with check (true);
create policy "staff read messages" on contact_messages for select to authenticated using (true);
create policy "staff update messages" on contact_messages for update to authenticated using (true) with check (true);
create policy "staff read subscribers" on newsletter_subscribers for select to authenticated using (true);
