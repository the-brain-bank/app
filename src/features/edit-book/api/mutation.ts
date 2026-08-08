"use server";

import { editBookUseCase } from "@/composition";
import { EditBookCommand } from "@/core/use-cases/EditBook";

export const mutation = async (
  command: EditBookCommand,
) => {
  const result = await editBookUseCase.execute(command);
  if (result.isErr())
    return {
      success: false,
      error: result.error,
    };

  return {
    success: true,
    data: result.value,
  };
};
