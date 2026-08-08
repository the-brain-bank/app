import { bookSchema } from "@/core/domain/entities/book";
import z from "zod";

export const formSchema = bookSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    coverImage: z.instanceof(File),
    categoryIds: z
      .array(z.string())
      .min(1, "Please select at least one category"),
  });

export type FormFields = z.infer<typeof formSchema>;
