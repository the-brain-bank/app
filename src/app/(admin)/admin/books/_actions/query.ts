"use server";

import {
  categoryRepository,
  getAllBooksUseCase,
  searchAuthorsByNameUseCase,
} from "@/composition";
import type { GetAllBooksQuery } from "@/core/application/ports/book";
import type { Category } from "@/core/domain/entities/category";

export async function getAllBooks(query: GetAllBooksQuery) {
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

export async function searchAuthors(query: string) {
  const result = await searchAuthorsByNameUseCase.execute(query);
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

export async function searchCategoriesAction(
  search: string,
): Promise<Category[]> {
  const result = await categoryRepository.findAll(10, 0, search);
  return result.data;
}
