"use server";

import { addNewAuthorUseCase } from "@/composition";
import type { FormFields } from "../model/schema";
import { revalidatePath } from "next/cache";

export async function mutate(data: FormFields) {
  const result = await addNewAuthorUseCase.execute(data);
  if (result.isErr()) {
    return { success: false as const, error: result.error };
  }
  revalidatePath("/authors");
  revalidatePath("/");
  return { success: true as const, author: result.value };
}
