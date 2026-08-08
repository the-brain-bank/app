"use client";

import { DataTable } from "@/components/widgets/data-table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllBooks,
  searchAuthors,
  searchCategoriesAction,
} from "../_actions/query";
import { columns } from "./columns";
import { AsyncSearchDropdown } from "@/components/widgets/async-search-dropdown/ui/widget";
import type { User } from "@/core/domain/entities/user";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Category } from "@/core/domain/entities/category";
import { DebouncedInput } from "@/components/ui/debounced-input";

export function Table() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const query = useQuery({
    queryKey: [
      "books",
      {
        page,
        pageSize,
        authorId,
        categoryId,
        search
      },
    ],
    queryFn: async () => {
      const result = await getAllBooks({
        limit: pageSize,
        offset: page * pageSize,
        authorId: authorId ?? undefined,
        categoryId: categoryId ?? undefined,
        search: search || undefined,
      });
      if (result.success === false) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });

  function resetFilters() {
    setAuthorId(null);
    setCategoryId(null);
    setPage(0);
    setPageSize(10);
  }

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-6 mb-6">
        <div className="flex gap-2 items-center flex-wrap *:max-w-max">
          <AsyncSearchDropdown<User>
            value={authorId}
            getOptionValue={(author) => author.id}
            getOptionLabel={(author) => author.name}
            placeholder="Search for an author"
            onChange={(authorId) => {
              setAuthorId(authorId);
            }}
            fetchPage={async ({ search }) => {
              const result = await searchAuthors(search);
              if (result.success === false) {
                return [];
              }
              return result.data ?? [];
            }}
            className="max-w-max"
          />
          <AsyncSearchDropdown<Category>
            value={categoryId}
            getOptionValue={(category) => category.id}
            getOptionLabel={(category) => category.name}
            placeholder="Search for a category"
            onChange={(categoryId) => {
              setCategoryId(categoryId);
            }}
            fetchPage={async ({ search }) => {
              const result = await searchCategoriesAction(search);
              return result;
            }}
            className="max-w-max"
          />
          <DebouncedInput
            debounceTime={500}
            placeholder="Search for a book"
            value={search}
            onValueChange={(value) => {
              setSearch(value);
            }}
          />
          <Button variant="ghost" onClick={resetFilters}>
            <X /> Reset filter
          </Button>
        </div>

        <Link href="/admin/new/book" className={buttonVariants()}>
          + New book
        </Link>
      </div>
      <DataTable
        loading={query.isFetching}
        columns={columns}
        error={query.isError ? query.error.message : null}
        data={query.data?.data ?? []}
        page={page}
        perPage={pageSize}
        totalData={query.data?.total ?? 0}
        onPaginationChange={(state) => {
          setPage(state.pageIndex);
          setPageSize(state.pageSize);
        }}
        withPagination
      />
    </>
  );
}
