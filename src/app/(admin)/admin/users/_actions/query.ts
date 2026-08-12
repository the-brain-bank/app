"use server";

import { userRepository } from "@/composition";
import type { User } from "@/core/domain/entities/user";

export async function getAllUsers(query: {
  limit: number;
  offset: number;
  search?: string;
  role?: User["role"];
}) {
  const result = await userRepository.findByRole({
    role: query.role ?? [],
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
