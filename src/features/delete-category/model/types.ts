import { Category } from "@/core/domain/entities/category";

export type Payload = {
  category: Pick<Category, "id" | "name">;
};
