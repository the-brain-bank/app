"use server";

import { addNewUserUseCase, uploadUserImageUseCase } from "@/composition";
import type { FormFields } from "../model/schema";

import type { User } from "@/core/domain/entities/user";

export async function mutate(data: FormFields) {
  const createUserResult = await addNewUserUseCase.execute(
    data as unknown as Omit<User, "id" | "createdAt" | "updatedAt">,
  );
  if (createUserResult.isErr()) {
    return { success: false as const, error: createUserResult.error };
  }
  if (data.image) {
    const uploadResult = await uploadUserImageUseCase.execute(
      createUserResult.value.id,
      data.image,
    );
    if (uploadResult.isErr())
      return {
        success: false as const,
        error: uploadResult.error,
      };
  }
  return { success: true as const, user: createUserResult.value };
}
