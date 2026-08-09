import type { Recommendation } from "@/core/domain/entities/recommendation";
import { formatHttpDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Recommendation>[] = [ 
    {
        accessorKey: "bookId",
        header: "Book",
        cell: ({ row }) => {
            const book = row.original.book;
            return book.title;
        }
    },
    {
        accessorKey: "authorId",
        header: "Author",
        cell: ({ row }) => {
            const author = row.original.author;
            return author ? author.name : "N/A";
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => formatHttpDate(row.original.createdAt),
    }
]