import { errAsync, Result, ResultAsync } from "neverthrow";
import { CategoryRepository } from "../application/ports/category";
import { SessionPort } from "../application/ports/session";

export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly sessionAdapter: SessionPort,
  ) {}

  async execute(category: { id: string }): Promise<Result<boolean, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);

    return ResultAsync.fromThrowable(async () => {
      return this.categoryRepository.deleteById(category.id);
    })().mapErr((error) => {
      if (error instanceof Error) return error.message;
      return "Unknown error when deleting a category!";
    });
  }
}
