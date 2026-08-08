"use server";

import { uploadBookCoverUseCase } from "@/composition";
import { Book } from "@/core/domain/entities/book";

export async function mutate({
  file,
  bookId,
}: {
  bookId: Book["id"];
  file: File;
}) {
  const result = await uploadBookCoverUseCase.execute(bookId, file);
  if (result.isErr()) {
    return { success: false, error: result.error };
  }
  return { success: true, category: result.value };
}
