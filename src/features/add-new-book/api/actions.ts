"use server";

import { categoryRepository, userRepository } from "@/composition";
import type { Category } from "@/core/domain/entities/category";

export async function searchCategoriesAction(
  search: string,
): Promise<Category[]> {
  const result = await categoryRepository.findAll(10, 0, search);
  return result.data;
}

export async function searchUsersAction(search: string) {
  const result = await userRepository.findByRole({
    role: ["AUTHOR"],
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
