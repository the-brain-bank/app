import { categorySchema } from "@/core/domain/entities/category";
import z from "zod";

export const formSchema = categorySchema;

export type FormFields = z.infer<typeof formSchema>;
