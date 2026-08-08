"use server";

import { uploadAuthorImageUseCase } from "@/composition";
import { User } from "@/core/domain/entities/user";

export async function mutate({
  file,
  authorId,
}: {
  authorId: User["id"];
  file: File;
}) {
  const result = await uploadAuthorImageUseCase.execute(authorId, file);
  if (result.isErr()) {
    return { success: false, error: result.error };
  }
  return { success: true, category: result.value };
}
