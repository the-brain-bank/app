import { errAsync, Result, ResultAsync } from "neverthrow";
import { CategoryRepository } from "../application/ports/category";
import { SessionPort } from "../application/ports/session";
import { Category } from "../domain/entities/category";

export class EditCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly sessionAdapter: SessionPort,
  ) {}

  async execute(category: {
    name: string;
    id: string;
  }): Promise<Result<Category, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);

    const trimmedName = category.name.trim();
    if (!trimmedName) {
      return errAsync("Category name cannot be empty");
    }

    return ResultAsync.fromThrowable(async () => {
      return this.categoryRepository.updateById(category.id, category.name);
    })().mapErr((error) => {
      if (error instanceof Error) return error.message;
      return "Unknown error when creating a category!";
    });
  }
}
