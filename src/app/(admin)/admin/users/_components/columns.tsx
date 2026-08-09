import { RoleBadge } from "@/components/widgets/user";
import type { User } from "@/core/domain/entities/user";
import { formatHttpDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  EDITOR:
    "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  AUTHOR: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  USER: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
  INFLUENCER:
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = (row.original as unknown as { email?: string }).email;
      if (!email) return <span className="text-muted-foreground">—</span>;
      return <span className="text-sm">{email}</span>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <ul className="flex flex-wrap gap-1">
        {row.original.role.map((role) => (
          <RoleBadge key={role} role={role} />
        ))}
      </ul>
    ),
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => {
      const industry = (row.original as unknown as { industry?: string })
        .industry;
      if (!industry) return <span className="text-muted-foreground">—</span>;
      return (
        <div className="flex flex-wrap gap-1">
          {industry
            .split(",")
            .slice(0, 3)
            .map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs px-2 py-0.5 rounded-sm"
              >
                {tag.trim().toLowerCase()}
              </span>
            ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatHttpDate(row.original.createdAt),
  },
];
