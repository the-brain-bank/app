"use server";

import { addNewAuthorUseCase } from "@/composition";
import type { FormFields } from "../model/schema";

export async function mutate(data: FormFields) {
  const result = await addNewAuthorUseCase.execute(data);
  if (result.isErr()) {
    return { success: false as const, error: result.error };
  }
  return { success: true as const, author: result.value };
}
