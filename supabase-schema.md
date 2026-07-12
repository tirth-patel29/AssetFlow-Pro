# Supabase schema for AssetFlow

This file contains the inferred table schema and SQL statements to create the tables used by the AssetFlow frontend.

Use the Supabase SQL editor or Table Editor to create these tables in the `public` schema.

## How to use

1. Open your Supabase project dashboard.
2. Go to `SQL Editor`.
3. Paste the SQL below and run it.
4. Optionally seed sample data with the `INSERT` statements.

---

## Create tables

```sql
-- Assets
CREATE TABLE IF NOT EXISTS public.assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text,
  tag text,
  serial text,
  status text DEFAULT 'Available',
  location text,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Asset categories used by Organization setup
CREATE TABLE IF NOT EXISTS public.asset_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  fields text,
  status text DEFAULT 'Active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Departments used by Organization setup
CREATE TABLE IF NOT EXISTS public.departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  head text,
  parent text,
  status text DEFAULT 'Active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Employees used by Organization setup
CREATE TABLE IF NOT EXISTS public.employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  department text,
  role text,
  status text DEFAULT 'Active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Maintenance requests
CREATE TABLE IF NOT EXISTS public.maintenance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request text,
  title text,
  asset_name text,
  asset text,
  priority text,
  severity text,
  status text DEFAULT 'Pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Bookings / reservations
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource text,
  user_name text,
  booked_by text,
  booker text,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  status text DEFAULT 'Confirmed',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Audit cycles
CREATE TABLE IF NOT EXISTS public.audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text DEFAULT 'Active',
  state text,
  discrepancies integer DEFAULT 0,
  discrepancy_count integer DEFAULT 0,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Asset allocations / transfers
CREATE TABLE IF NOT EXISTS public.allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_name text,
  asset text,
  current_holder text,
  current_user text,
  requested_by text,
  requester text,
  status text DEFAULT 'Requested',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Notifications / activity log
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text,
  title text,
  "when" text,
  timestamp timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- User profiles stored by AuthProvider
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  email text,
  full_name text,
  role text DEFAULT 'Employee',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
```

---

## Sample inserts

```sql
INSERT INTO public.assets (name, category, tag, serial, status, location) VALUES
('Laptop AF-0042', 'Electronics', 'AF-0042', 'LX-1290', 'Available', 'HQ - 3rd Floor'),
('Projector AF-0015', 'AV', 'AF-0015', 'PJ-4021', 'Reserved', 'Conference Room 2');

INSERT INTO public.asset_categories (name, fields, status) VALUES
('Electronics', 'Warranty period', 'Active'),
('Furniture', '-', 'Active'),
('Vehicles', 'Insurance expiry', 'Active');

INSERT INTO public.departments (name, head, parent, status) VALUES
('Facilities', 'Alex Kim', 'Corporate', 'Active'),
('IT Services', 'Priya Mehta', 'Corporate', 'Active'),
('Logistics', 'Marcus Lee', 'Operations', 'Inactive');

INSERT INTO public.employees (name, email, department, role, status) VALUES
('Nina Ford', 'nina.ford@assetflow.com', 'Facilities', 'Employee', 'Active'),
('Avery Cole', 'avery.cole@assetflow.com', 'IT Services', 'Department Head', 'Active'),
('Jordan Price', 'jordan.price@assetflow.com', 'Logistics', 'Asset Manager', 'Inactive');

INSERT INTO public.maintenance_requests (request, asset_name, priority, status) VALUES
('Replace battery', 'Laptop AF-0042', 'High', 'Pending');

INSERT INTO public.bookings (resource, booked_by, start_time, end_time, status) VALUES
('Meeting Room 2', 'Emma Reed', now() + interval '1 hour', now() + interval '2 hour', 'Confirmed');

INSERT INTO public.audits (status, discrepancies, discrepancy_count) VALUES
('Active', 2, 2),
('Completed', 0, 0);

INSERT INTO public.allocations (asset_name, current_holder, requested_by, status) VALUES
('Laptop AF-0021', 'Morgan Shaw', 'Avery Cole', 'Requested');

INSERT INTO public.notifications (message, "when", timestamp) VALUES
('Maintenance request approved for Printer 7.', '2 hours ago', now() - interval '2 hour'),
('Booking confirmed for Meeting Room 1.', 'Yesterday', now() - interval '1 day');
```

---

## Notes for Supabase Table Editor

- In Supabase Table Editor, create each table under the `public` schema.
- Use `id` as the primary key for each table.
- For `profiles.id`, the value should match the Supabase auth user `id`.
- `created_at` and `updated_at` can remain with default values.
- If you need only one command to run, use the `CREATE TABLE` statements above in the SQL editor.

If you want, I can also generate a `supabase-schema.sql` file containing just the SQL. 