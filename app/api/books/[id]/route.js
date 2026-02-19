import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// PATCH - toggle borrow status
export async function PATCH(request, { params }) {
  const supabase = await createClient();
  const { id } = await params;
  const body = await request.json();
  const { is_borrowed, borrowed_by, borrowed_until } = body;

  if (typeof is_borrowed !== "boolean") {
    return NextResponse.json(
      { error: "is_borrowed must be a boolean" },
      { status: 400 }
    );
  }

  // If borrowing, validate borrowed_by and borrowed_until
  if (is_borrowed) {
    if (!borrowed_by || typeof borrowed_by !== "string" || !borrowed_by.trim()) {
      return NextResponse.json(
        { error: "borrowed_by is required when borrowing a book" },
        { status: 400 }
      );
    }
    if (!borrowed_until || isNaN(Date.parse(borrowed_until))) {
      return NextResponse.json(
        { error: "borrowed_until must be a valid date when borrowing a book" },
        { status: 400 }
      );
    }
  }

  const updateData = {
    is_borrowed,
    borrowed_by: is_borrowed ? borrowed_by : null,
    borrowed_until: is_borrowed ? new Date(borrowed_until).toISOString() : null,
  };

  const { data, error } = await supabase
    .from("books")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return the first updated row (or null if not found)
  return NextResponse.json(Array.isArray(data) ? data[0] : data);
}

// DELETE a book
export async function DELETE(request, { params }) {
  const supabase = await createClient();
  const { id } = await params;

  const { error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
