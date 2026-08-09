import type { Book } from "@/core/domain/entities/book";
import { formatHttpDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link
          href="/admin/books/[bookId]"
          as={`/admin/books/${row.original.id}`}
          className="text-blue-500 hover:underline"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "author.name",
    header: "Author",
    cell: ({ row }) => {
      return (
        <Link
          href="/admin/authors/[authorId]"
          as={`/admin/authors/${row.original.author.id}`}
          className="text-blue-500 hover:underline"
        >
          {row.original.author.name}
        </Link>
      );
    },
  },
  {
    accessorFn: (row) => row.recommendations.length,
    header: "Recommendations",
    cell: ({ row }) => (
      <span className="text-center w-full inline-block">{row.original.recommendations.length}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return formatHttpDate(row.original.createdAt);
    },
  },
];
