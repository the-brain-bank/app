"use server";

import { getAllBooksUseCase, userRepository } from "@/composition";
import type { GetAllBooksQuery } from "@/core/application/ports/book";

export async function searchBooks(query: GetAllBooksQuery) {
  const result = await getAllBooksUseCase.execute(query);
  if (result.isErr()) {
    return {
      success: false,
      error: result.error,
    };
  }

  return {
    success: true,
    data: result.value,
  };
}

export async function searchUsersAction(search: string) {
  const result = await userRepository.findByRole({
    role: ["INFLUENCER"],
    limit: 20,
    offset: 0,
    search,
  });

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