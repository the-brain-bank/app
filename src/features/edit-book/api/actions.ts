"use server";

import { categoryRepository, userRepository } from "@/composition";
import type { AuthorUser } from "@/core/domain/entities/user";

export async function searchCategoriesAction(search: string) {
  const result = await categoryRepository.findAll(10, 0, search);
  return result.data;
}

export async function searchUsersAction(search: string) {
  return await userRepository.findByRole<AuthorUser>({
    role: ["AUTHOR"],
    search,
    limit: 20,
  });
}
