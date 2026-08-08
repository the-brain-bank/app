import z from "zod";
import { Book } from "./book";

export interface Category {
  id: string;
  name: string;

  // relations
  books: Book[];
}

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
});
