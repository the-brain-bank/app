"use server";

import { recommendationRepository } from "@/composition";
import type { GetAllRecommendationsParams } from "@/core/application/ports/recommendation";

export async function getAllRecommendations(
  params: GetAllRecommendationsParams,
) {
  const result = await recommendationRepository.getAll(params);
  if (result.isErr()) {
    return {
      success: false,
      error: result.error,
    };
  }

  return {
    success: true,
    data: result.value,
  };
}
