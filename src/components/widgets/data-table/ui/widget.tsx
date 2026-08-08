"use client";

import { useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTablePagination } from "./pagination";
import { AlertCircle } from "lucide-react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  error?: string | null;
} & PaginationOpts;

type PaginationData = {
  pageIndex: number;
  pageSize: number;
};

type PaginationOpts =
  | {
      withPagination: true;
      page: number;
      perPage: number;
      onPaginationChange: (data: PaginationData) => void;
      totalData: number;
    }
  | {
      withPagination: false;
    };

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  // Use a ref to always have the latest pagination props available
  // inside the onPaginationChange callback, avoiding stale closures.
  const paginationRef = useRef<PaginationState>({
    pageIndex: props.withPagination ? props.page : 0,
    pageSize: props.withPagination ? props.perPage : 10,
  });
  if (props.withPagination) {
    paginationRef.current = {
      pageIndex: props.page,
      pageSize: props.perPage,
    };
  }

  const pagination: PaginationState | undefined = props.withPagination
    ? { pageIndex: props.page, pageSize: props.perPage }
    : undefined;

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      if (props.withPagination === false) return;
      const nextPagination =
        typeof updater === "function"
          ? updater(paginationRef.current)
          : updater;
      props.onPaginationChange(nextPagination);
    },
    state: {
      pagination,
    },
    manualPagination: props.withPagination,
    autoResetPageIndex: false,
    pageCount: props.withPagination
      ? Math.ceil(props.totalData / props.perPage)
      : undefined,
  });

  const skeletonRowCount = props.withPagination ? props.perPage : 5;

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {props.loading ? (
              Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {props.columns.map((_, colIndex) => (
                    <TableCell key={`skeleton-${rowIndex}-${colIndex}`}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : props.error ? (
              <TableRow>
                <TableCell
                  colSpan={props.columns.length}
                  className="h-24"
                >
                  <div className="flex items-center justify-center gap-2 text-destructive">
                    <AlertCircle className="size-4" />
                    <span>{props.error}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={props.columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        pageIndex={props.withPagination ? props.page : 0}
        pageSize={props.withPagination ? props.perPage : props.data.length}
        pageCount={props.withPagination ? Math.ceil(props.totalData / props.perPage) : 1}
      />
    </div>
  );
}


