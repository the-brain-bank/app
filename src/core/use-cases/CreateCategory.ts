import { CategoryRepository } from "../application/ports/category";
import { Category } from "../domain/entities/category";
import { SessionPort } from "../application/ports/session";
import { errAsync, Result, ResultAsync } from "neverthrow";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly sessionAdapter: SessionPort,
  ) {}

  async execute(
    category: { name: string },
  ): Promise<Result<Category, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);

    const trimmedName = category.name.trim();
    if (!trimmedName) {
      return errAsync("Category name cannot be empty");
    }

    return ResultAsync.fromThrowable(async () => {
      const existing = await this.categoryRepository.findByName(trimmedName);
      if (existing) {
        throw new Error(`Category "${trimmedName}" already exists!`);
      }
      return this.categoryRepository.create({ name: trimmedName, books: [] });
    })().mapErr((error) => {
      if (error instanceof Error) return error.message;
      return "Unknown error when creating a category!";
    });
  }
}
