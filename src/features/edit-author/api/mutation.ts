"use server";

import { editAuthorUseCase } from "@/composition";
import type { EditAuthorCommand } from "@/core/use-cases/EditAuthor";

export const mutation = async (command: EditAuthorCommand) => {
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
