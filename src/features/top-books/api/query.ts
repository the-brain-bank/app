import { getTopBooksUseCase } from "@/composition";

export const query = async () => {
  const result = await getTopBooksUseCase.execute();
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
};
