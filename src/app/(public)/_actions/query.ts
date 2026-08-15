"use-server";

import { getAllInfluencersUseCase } from "@/composition";

export async function getAllInfluencersAction() {
  const result = await getAllInfluencersUseCase.execute({
    limit: 1000,
    offset: 0,
  });
  if (result.isErr())
    return {
      success: false as const,
      error: result.error,
    };

  return {
    success: true,
    data: result.value,
  };
}
