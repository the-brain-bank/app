"use server";

import { deleteCategoryUseCase } from "@/composition";
import { FormFields } from "../model/schema";

export async function mutate(data: FormFields) {
  const result = await deleteCategoryUseCase.execute(data);
  if (result.isErr()) {
    return { success: false, error: result.error };
  }
  return { success: true, category: result.value };
}
