-- Create books table for the library management system
CREATE TABLE IF NOT EXISTS public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  is_borrowed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Disable RLS since this is a public library app with no auth
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Allow all operations publicly (no auth required)
CREATE POLICY "Allow public read" ON public.books FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.books FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.books FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.books FOR DELETE USING (true);

-- Seed some sample books
INSERT INTO public.books (title, author, is_borrowed) VALUES
  ('To Kill a Mockingbird', 'Harper Lee', false),
  ('1984', 'George Orwell', true),
  ('The Great Gatsby', 'F. Scott Fitzgerald', false),
  ('Pride and Prejudice', 'Jane Austen', false),
  ('The Catcher in the Rye', 'J.D. Salinger', true),
  ('Brave New World', 'Aldous Huxley', false);
