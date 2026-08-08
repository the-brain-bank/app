"use server";

import { createCategoryUseCase } from "@/composition";
import { FormFields } from "../model/schema";

export async function mutate(data: FormFields) {
  const result = await createCategoryUseCase.execute(data);
  if (result.isErr()) {
    return { success: false, error: result.error };
  }
  return { success: true, category: result.value };
}
