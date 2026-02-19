"use client";

import { useState } from "react";
import { ArrowLeftRight, Trash2, Loader2, User, BookText } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function BookCard({ book, onUpdate }) {
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowUntil, setBorrowUntil] = useState("");
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);

  async function handleToggleBorrow() {
    if (book.is_borrowed) {
      // If book is already borrowed, just return it
      await performToggleBorrow();
    } else {
      // If book is available, open the dialog to get borrower info
      setIsBorrowDialogOpen(true);
    }
  }

  async function performToggleBorrow(borrowerInfo = {}) {
    setToggling(true);
    try {
      const res = await fetch(`/api/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_borrowed: !book.is_borrowed,
          ...borrowerInfo,
        }),
      });
      if (res.ok) {
        onUpdate();
        setIsBorrowDialogOpen(false);
        setBorrowerName("");
        setBorrowUntil("");
      }
    } catch {
      // Silently handle
    } finally {
      setToggling(false);
    }
  }

  function handleBorrowSubmit(e) {
    e.preventDefault();
    if (borrowerName && borrowUntil) {
      // Convert to ISO string for backend
      const isoDate = new Date(borrowUntil).toISOString();
      performToggleBorrow({
        borrowed_by: borrowerName,
        borrowed_until: isoDate,
      });
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/books/${book.id}`, { method: "DELETE" });
      if (res.ok) onUpdate();
    } catch {
      // Silently handle
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
      <div className="mb-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-foreground text-pretty">
            {book.title}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              book.is_borrowed
                ? "bg-destructive/15 text-destructive"
                : "bg-primary/15 text-primary"
            }`}
          >
            {book.is_borrowed ? "Borrowed" : "Available"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>{book.author}</span>
        </div>
        {book.is_borrowed && book.borrowed_by && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookText className="h-3.5 w-3.5" />
            <span>
              Borrowed by {book.borrowed_by} until{" "}
              {new Date(book.borrowed_until).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {book.is_borrowed ? (
          <button
            onClick={() => performToggleBorrow()}
            disabled={toggling}
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary/15 text-primary text-xs font-medium transition-colors hover:bg-primary/25 disabled:opacity-50"
          >
            {toggling ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ArrowLeftRight className="h-3.5 w-3.5" />
            )}
            Return
          </button>
        ) : (
          <Dialog
            open={isBorrowDialogOpen}
            onOpenChange={setIsBorrowDialogOpen}
          >
            <DialogTrigger asChild>
              <button
                disabled={toggling}
                className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium transition-colors hover:bg-secondary/80 disabled:opacity-50"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                Borrow
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Borrow Book</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleBorrowSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="borrower-name">Borrower's Name</Label>
                  <Input
                    id="borrower-name"
                    value={borrowerName}
                    onChange={(e) => setBorrowerName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="borrow-until">Borrow Until</Label>
                  <Input
                    id="borrow-until"
                    type="date"
                    value={borrowUntil}
                    onChange={(e) => setBorrowUntil(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={toggling}>
                  {toggling ? "Borrowing..." : "Confirm Borrow"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive disabled:opacity-50"
          aria-label={`Delete ${book.title}`}
        >
          {deleting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
