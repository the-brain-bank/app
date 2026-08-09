"use server";

import { getAllBooksUseCase } from "@/composition";
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
