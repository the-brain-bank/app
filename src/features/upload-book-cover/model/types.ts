import { Book } from "@/core/domain/entities/book";

export type Payload = {
  book: Pick<Book, "id" | "title">;
};
