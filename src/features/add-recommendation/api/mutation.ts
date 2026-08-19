"use server";

import { addRecommendationUseCase } from "@/composition";
import type { FormFields } from "../model/schema";
import { revalidatePath } from "next/cache";

export async function mutate(data: FormFields) {
  const result = await addRecommendationUseCase.execute({
    authorId: data.authorId,
    bookId: data.bookId,
    quote: data.quote,
    sourceUrl: data.sourceUrl,
  });
  if (result.isErr()) {
    return { success: false, error: result.error };
  }
  revalidatePath("/");
  return { success: true, category: result.value };
}
