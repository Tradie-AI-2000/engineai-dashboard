-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Baseline: Ensure users can only read their own auth data
CREATE POLICY "Users can view own data" ON auth.users
  FOR SELECT USING (auth.uid() = id);

-- Future: Add tenants table and link to user metadata
-- CREATE TABLE public.tenants (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   name TEXT NOT NULL,
--   created_at TIMESTAMPTZ DEFAULT now()
-- );
-- ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
