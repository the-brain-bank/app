import { Category } from "@/core/domain/entities/category";

export interface CategoryRepository {
  findAll(
    limit: number,
    offset: number,
    search?: string,
  ): Promise<{
    data: Category[];
    page: number;
    pageSize: number;
    totalCount: number;
  }>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  create(
    Category: Omit<Category, "id" | "createdAt" | "updatedAt">,
  ): Promise<Category>;
  updateById(id: string, name: string): Promise<Category>;
  deleteById(id: string): Promise<boolean>;
}
