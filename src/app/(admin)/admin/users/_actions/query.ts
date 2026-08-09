"use server";

import { userRepository, searchUsersByNameUseCase } from "@/composition";
import type { User } from "@/core/domain/entities/user";

export async function getAllUsers(query: {
  limit: number;
  offset: number;
  search?: string;
  role?: User["role"];
}) {
  try {
    const data = await userRepository.findByRole({
      role: query.role ?? [],
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

export async function searchUsers(query: string, role?: User["role"]) {
  const result = await searchUsersByNameUseCase.execute(query, role);
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
