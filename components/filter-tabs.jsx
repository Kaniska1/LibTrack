"use client";

const filters = [
  { label: "All Books", value: "all" },
  { label: "Available", value: "available" },
  { label: "Borrowed", value: "borrowed" },
  { label: "Borrowers", value: "borrowers" },
];

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="flex gap-1 rounded-lg bg-secondary p-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            active === filter.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
