import { getTopAuthorsUseCase } from "@/composition";

export const query = async () => {
    return getTopAuthorsUseCase.execute();
};