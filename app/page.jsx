"use client";

import { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import Header from "@/components/header";
import SearchBar from "@/components/search-bar";
import AddBookForm from "@/components/add-book-form";
import BookList from "@/components/book-list";
import FilterTabs from "@/components/filter-tabs";
import BorrowersList from "@/components/borrowers-list";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const {
    data: booksData,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/books", fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
  });

  const handleRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const filteredBooks = useMemo(() => {
    if (!Array.isArray(booksData)) return [];

    if (filter === "borrowers") {
      return booksData.filter((book) => book.is_borrowed);
    }

    let result = booksData;

    if (filter !== "all") {
      result = result.filter((book) => {
        if (filter === "available") return !book.is_borrowed;
        if (filter === "borrowed") return book.is_borrowed;
        return true;
      });
    }

    if (search) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [booksData, search, filter]);

  const totalBooks = Array.isArray(booksData) ? booksData.length : 0;
  const borrowedBooks = Array.isArray(booksData)
    ? booksData.filter((b) => b.is_borrowed).length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header totalBooks={totalBooks} borrowedBooks={borrowedBooks} />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left column - Search and filters */}
          <div className="flex flex-col gap-4">
            <SearchBar value={search} onChange={setSearch} />
            <div className="flex items-center justify-between">
              <FilterTabs active={filter} onChange={setFilter} />
              {filter !== "borrowers" && (
                <p className="text-xs text-muted-foreground">
                  {filteredBooks.length}{" "}
                  {filteredBooks.length === 1 ? "book" : "books"}
                </p>
              )}
            </div>
          </div>

          {/* Right column - Add book form */}
          <AddBookForm onBookAdded={handleRefresh} />
        </div>

        {/* Book grid */}
        {error ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-destructive/30 py-16">
            <p className="text-sm font-medium text-destructive">
              Failed to load books
            </p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-xs text-muted-foreground underline hover:text-foreground"
            >
              Try again
            </button>
          </div>
        ) : filter === "borrowers" ? (
          <BorrowersList books={filteredBooks} />
        ) : (
          <BookList
            books={filteredBooks}
            loading={isLoading}
            onUpdate={handleRefresh}
          />
        )}
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        LibraTrack - Library Management System
      </footer>
    </div>
  );
}
