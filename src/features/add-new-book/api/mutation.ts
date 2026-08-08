"use server";

import { addNewBookUseCase } from "@/composition";
import { CreateBookCommand } from "@/core/use-cases/AddNewBook";

export const mutation = async (
  book: CreateBookCommand,
) => {
  const result = await addNewBookUseCase.execute(book);
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
