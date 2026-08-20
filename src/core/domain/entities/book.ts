import z from "zod";
import { Category } from "./category";
import type { User } from "./user";
import type { Recommendation } from "./recommendation";

export interface Book {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;

  // relations
  author: User;
  categories: Category[];
  recommendations: Recommendation[]
}

export const bookSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  coverImage: z.url(),
  description: z.string().min(20),
  authorId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
