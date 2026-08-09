import type { AuthorUser, User } from "@/core/domain/entities/user";
import { formatHttpDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<User & AuthorUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href="/admin/authors/[authorId]"
        as={`/admin/authors/${row.original.id}`}
        className="text-blue-500 hover:underline font-medium"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="capitalize text-sm">{row.original.role}</span>
    ),
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => {
      const industry = row.original.industry;
      if (!industry) return <span className="text-muted-foreground">—</span>;
      return (
        <div className="flex flex-wrap gap-1">
          {industry.split(",").slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-sm"
            >
              {tag.trim().toLowerCase()}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "bio",
    header: "Bio",
    cell: ({ row }) => {
      const bio = row.original.bio;
      if (!bio) return <span className="text-muted-foreground">—</span>;
      return (
        <span className="text-sm text-muted-foreground line-clamp-1 max-w-60">
          {bio}
        </span>
      );
    },
  },
  {
    id: "books",
    header: "Books",
    cell: ({ row }) => {
      const count = row.original.authoredBooks?.length ?? 0;
      return (
        <span className="text-sm tabular-nums">
          {count}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatHttpDate(row.original.createdAt),
  },
];
