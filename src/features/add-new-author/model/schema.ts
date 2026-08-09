import z from "zod";
import { USER_ROLES } from "@/core/domain/entities/user";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address").nullable(),
  bio: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  role: z.enum(USER_ROLES).array().default(["AUTHOR"]),
  image: z.string().nullable().optional(),
});

export type FormFields = z.infer<typeof formSchema>;
