"use server";

import { categoryRepository } from "@/composition";

export async function searchCategoriesAction(search: string) {
  const result = await categoryRepository.findAll(10, 0, search);
  return result.data;
}
