"use server";

import { categoryRepository, userRepository } from "@/composition";
import type { Category } from "@/core/domain/entities/category";
import type { User } from "@/core/domain/entities/user";

export async function searchCategoriesAction(
  search: string,
): Promise<Category[]> {
  const result = await categoryRepository.findAll(10, 0, search);
  return result.data;
}

export async function searchUsersAction(search: string): Promise<User[]> {
  return await userRepository.findByRole({
    role: ["AUTHOR"],
    limit: 20,
    offset: 0,
    search,
  });
}
