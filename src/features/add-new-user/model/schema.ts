import z from "zod";
import { USER_ROLES } from "@/core/domain/entities/user";

export const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").nullable().optional(),
    role: z.enum(USER_ROLES).array().min(1, "At least one role is required"),
    bio: z.string().optional(),
    industry: z.string().optional(),
    image: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const roles = data.role;
    if (roles.includes("AUTHOR") || roles.includes("INFLUENCER")) {
      if (!data.industry || data.industry.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Industry is required for Authors and Influencers",
          path: ["industry"],
        });
      }
    }
  });

export type FormFields = z.infer<typeof formSchema>;



/** Map a selected role label to the actual role array the domain expects */
export function getRoleArrayForSelected(
  selected: string,
): FormFields["role"] {
  switch (selected) {
    case "ADMIN":
      return ["ADMIN", "EDITOR"];
    case "EDITOR":
      return ["EDITOR"];
    case "AUTHOR":
      return ["AUTHOR"];
    case "INFLUENCER":
      return ["INFLUENCER"];
    case "USER":
    default:
      return ["USER"];
  }
}

/** Determine the primary selected role from a role array */
export function getPrimaryRole(roles: FormFields["role"]): string {
  if (roles.includes("ADMIN")) return "ADMIN";
  if (roles.includes("AUTHOR")) return "AUTHOR";
  if (roles.includes("INFLUENCER")) return "INFLUENCER";
  if (roles.includes("EDITOR")) return "EDITOR";
  return "USER";
}
