"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllRecommendations } from "../_actions/query";
import { AsyncSearchDropdown } from "@/components/widgets/async-search-dropdown/ui/widget";
import type { User } from "@/core/domain/entities/user";
import { searchAuthors } from "../../authors/_actions/query";
import { Button, buttonVariants } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTable } from "@/components/widgets/data-table";
import { columns } from "./columns";
import Link from "next/link";

export function Table() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const query = useQuery({
    queryKey: [
      "recommendations",
      {
        page,
        pageSize,
        authorId,
      },
    ],
    queryFn: async () => {
      const result = await getAllRecommendations({
        limit: pageSize,
        offset: page * pageSize,
        authorId: authorId ?? undefined,
      });
      if (result.success === false) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });

  function resetFilters() {
    setAuthorId(null);
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
          <Button variant="ghost" onClick={resetFilters}>
            <X /> Reset filter
          </Button>
        </div>
        <Link
          href="/admin/new/recommendation"
          className={buttonVariants({ variant: "default" })}
        >
          Add Recommendation
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
