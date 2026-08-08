import z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().nullable().optional(),
  industry: z.string().min(1, "Industry is required"),
});

export type FormFields = z.infer<typeof formSchema>;
