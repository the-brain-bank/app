"use server";

import { searchAuthorsByNameUseCase, authorRepository } from "@/composition";

export async function getAllAuthors(query: {
  limit: number;
  offset: number;
  search?: string;
}) {
  const result = await authorRepository.findAll({
    limit: query.limit,
    offset: query.offset,
    search: query.search,
  });
  if (result.isErr()) {
    return {
      success: false,
      error: result.error,
    };
  }
  return { success: true, data: result.value };
}

export async function searchAuthors(query: string) {
  const result = await searchAuthorsByNameUseCase.execute(query);
  if (result.isErr()) {
    return {
      success: false as const,
      error: result.error,
    };
  }

  return {
    success: true as const,
    data: result.value,
  };
}
