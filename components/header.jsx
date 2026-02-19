"use client";

import { BookOpen } from "lucide-react";

export default function Header({ totalBooks, borrowedBooks }) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              LibTrack
            </h1>
            <p className="text-xs text-muted-foreground">
              Library Management System
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{totalBooks}</p>
            <p className="text-xs text-muted-foreground">Total Books</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{borrowedBooks}</p>
            <p className="text-xs text-muted-foreground">Borrowed</p>
          </div>
        </div>
      </div>
    </header>
  );
}
