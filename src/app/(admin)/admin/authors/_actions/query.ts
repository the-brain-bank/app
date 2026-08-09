"use server";

import { userRepository, searchAuthorsByNameUseCase } from "@/composition";
import type { AuthorUser } from "@/core/domain/entities/user";

export async function getAllAuthors(query: {
  limit: number;
  offset: number;
  search?: string;
}) {
  try {
    const data = await userRepository.findByRole<AuthorUser>({
      role: ["AUTHOR"],
      limit: query.limit,
      offset: query.offset,
      search: query.search,
    });
    return { success: true as const, data };
  } catch (e) {
    return {
      success: false as const,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
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
