"use server";

import { editAuthorUseCase } from "@/composition";
import type { UpdateByIdPayload } from "@/core/application/ports/user";

export const mutation = async (command: UpdateByIdPayload) => {
  const result = await editAuthorUseCase.execute(command);
  if (result.isErr())
    return {
      success: false as const,
      error: result.error,
    };

  return {
    success: true as const,
    data: result.value,
  };
};
