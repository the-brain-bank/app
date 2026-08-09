import { z } from "zod";

export interface Recommendation {
  id: string;
  bookId: string;
  authorId: string;
  quote: string;
  sourceUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export const recommendationSchema = z.object({
  id: z.uuid(),
  bookId: z.uuid(),
  authorId: z.uuid(),
  quote: z.string().min(1, "Quote is required"),
  sourceUrl: z.url("Source URL must be a valid URL"),
  createdAt: z.date(),
  updatedAt: z.date(),
});
