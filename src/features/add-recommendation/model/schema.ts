import { recommendationSchema } from "@/core/domain/entities/recommendation";
import type z from "zod";

export const formSchema = recommendationSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type FormFields = z.infer<typeof formSchema>;
