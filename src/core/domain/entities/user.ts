import { Book } from "./book";

export const USER_ROLES = ["ADMIN", "EDITOR", "AUTHOR", "USER"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: string;
  name: string;
  bio: string | null;
  industry: string;
  role: UserRole;
  image: string;
  createdAt: Date;
  updatedAt: Date;

  authoredBooks: Book[]
}
