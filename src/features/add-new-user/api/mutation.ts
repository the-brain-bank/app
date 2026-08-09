"use server";

import { addNewUserUseCase } from "@/composition";
import { FormFields } from "../model/schema";

import type { User } from "@/core/domain/entities/user";

export async function mutate(data: FormFields) {
  const result = await addNewUserUseCase.execute(data as unknown as Omit<User, "id" | "createdAt" | "updatedAt">);
  if (result.isErr()) {
    return { success: false as const, error: result.error };
  }
  return { success: true as const, user: result.value };
}
