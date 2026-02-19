"use client";

import useSWR from "swr";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function BorrowersList() {
  const { data: borrowers, error, isLoading } = useSWR(
    "/api/borrowers",
    fetcher
  );

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load borrowers list.</AlertDescription>
      </Alert>
    );
  }

  if (!borrowers || !Array.isArray(borrowers)) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Book Title</TableHead>
          <TableHead>Borrowed By</TableHead>
          <TableHead>Borrowed Until</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrowers.map((borrower, index) => (
          <TableRow key={index}>
            <TableCell>{borrower.title}</TableCell>
            <TableCell>{borrower.borrowed_by}</TableCell>
            <TableCell>
              {new Date(borrower.borrowed_until).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
