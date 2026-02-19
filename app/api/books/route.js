import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET all books, with optional search query
export async function GET(request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  let query = supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,author.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST a new book
export async function POST(request) {
  const supabase = await createClient();
  const body = await request.json();
  const { title, author } = body;

  if (!title || !author) {
    return NextResponse.json(
      { error: "Title and author are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("books")
    .insert({ title: title.trim(), author: author.trim() })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
