-- WebMagic PH Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  industry TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_industry ON portfolio(industry);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Row Level Security (RLS) Policies
-- Enable RLS on tables
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Portfolio: Allow public read access
CREATE POLICY "Allow public read access on portfolio"
  ON portfolio
  FOR SELECT
  TO public
  USING (true);

-- Portfolio: Only service role can insert/update/delete
CREATE POLICY "Allow service role full access on portfolio"
  ON portfolio
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Leads: Only service role can access
CREATE POLICY "Allow service role full access on leads"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Sample data (optional - remove in production)
-- INSERT INTO portfolio (title, industry, description, image_url, live_url)
-- VALUES 
--   ('Cafe del Sol', 'Restaurant', 'A modern website for a local coffee shop featuring online menu and reservations.', NULL, NULL),
--   ('Bistro Manila', 'Restaurant', 'Elegant restaurant website with photo gallery and contact form.', NULL, NULL),
--   ('Seafood Harbor', 'Restaurant', 'Fresh seafood restaurant with online ordering capabilities.', NULL, NULL);
