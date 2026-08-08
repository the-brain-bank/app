import { getTopBooksUseCase } from "@/composition";

export const query = async () => {
    return getTopBooksUseCase.execute();
};